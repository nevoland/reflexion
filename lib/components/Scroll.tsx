import { clamp } from "@nevoland/clamp";
import { clsx } from "clsx";
import { interval } from "futurise";
import {
  type Name,
  type ValueMutator,
  useRefList,
  useReferencedState,
  useResizeEffect,
} from "realue";
import { EMPTY_ARRAY, setProperty } from "unchangeable";

import type {
  Component,
  ComponentChild,
  ComponentChildren,
  JSX,
  Ref,
  StateMutator,
} from "../dependencies/types";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "../dependencies.js";
import type {
  AutoScrollerProps,
  Direction,
  FlexProps,
  Location,
  ScrollState,
  Size,
} from "../types";

import { Flex } from "./Flex.js";

export type ScrollProps = {
  value?: ScrollState;
  name?: Name;
  onChange?: NoInfer<ValueMutator<ScrollState>>;
  /**
   * Indicates which axis should be synchronized when the `value` changes.
   */
  sync?: Direction | "both";
  /**
   * Width and height of the content. Omitted dimensions are measured automatically from the content.
   */
  size?: Size;
  class?: string;
  onScroll?: (event: JSX.TargetedUIEvent<HTMLDivElement>) => void;
  onScrollEnd?: () => void;
  children: ComponentChildren;
  /**
   * Whether scrolling is automatically triggered when the cursor reaches the edge of the child element.
   */
  auto?: boolean;
  /**
   * Whether scrollbars should be hidden or not.
   */
  hiddenScrollbar?: boolean;
  corner?: ComponentChild;
  AutoScroller?: Component<AutoScrollerProps>;
} & FlexProps;

type ScrollDirection = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

const DEFAULT_SCROLL_DIRECTION: ScrollDirection = {
  top: false,
  bottom: false,
  left: false,
  right: false,
};

const SCROLL_SPEED = 5;

const INITIAL_SIZE = { height: 0, width: 0 };

export const Scroll = forwardRef(function Scroll(
  {
    value,
    name = "",
    onChange,
    size: providedContentSize,
    sync,
    class: className,
    overflow,
    onScroll: parentOnScroll,
    onScrollEnd,
    width = "fill",
    height = "fill",
    auto = false,
    hiddenScrollbar = false,
    corner,
    AutoScroller,
    ...props
  }: ScrollProps,
  parentRef?: Ref<HTMLDivElement>,
) {
  const valueRef = useRef<typeof value>();

  const [size, setSize] = useReferencedState(INITIAL_SIZE);
  const [contentSize, setContentSize] = useReferencedState(INITIAL_SIZE);
  useMemo(() => {
    if (providedContentSize == null) {
      return;
    }
    const size = contentSize.current;
    const { height = size.height, width = size.width } = providedContentSize;
    contentSize.current = setProperty(
      setProperty(size, "height", height),
      "width",
      width,
    );
  }, [providedContentSize?.height, providedContentSize?.width]);

  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const nodeRef = useRef(node);
  nodeRef.current = node;

  const ref = useRefList(parentRef, setNode);

  const [scroll, setScroll] = useState({ scrollTop: 0, scrollLeft: 0 });

  const [scrollDirection, onChangeScrollDirection] = useState<ScrollDirection>(
    DEFAULT_SCROLL_DIRECTION,
  );
  const scrollDirectionRef = useRef(scrollDirection);

  const onScroll = useCallback(
    (event: JSX.TargetedUIEvent<HTMLDivElement>) => {
      const element = event.currentTarget;
      const value = {
        top: element.scrollTop,
        left: element.scrollLeft,
      };
      setScroll({
        scrollTop: element.scrollTop,
        scrollLeft: element.scrollLeft,
      });
      parentOnScroll?.(event);
      const currentValue = valueRef.current;
      if (
        currentValue?.left === value.left &&
        currentValue?.top === value.top
      ) {
        return;
      }
      valueRef.current = value;
      onChange?.(value, name);
      if (AutoScroller) {
        onCheckScrollDirection();
      }
    },
    [onChange, name, parentOnScroll, AutoScroller],
  );

  // useLayoutEffect(() => {
  //   const currentValue = valueRef.current;
  //   if (
  //     currentValue === value ||
  //     (sync === "both" &&
  //       currentValue?.left === value?.left &&
  //       currentValue?.top === value?.top) ||
  //     (sync === "horizontal" && currentValue?.left === value?.left) ||
  //     (sync === "vertical" && currentValue?.top === value?.top)
  //   ) {
  //     return;
  //   }
  //   valueRef.current = value;
  //   nodeRef.current?.scrollTo(
  //     sync === "both"
  //       ? value
  //       : sync === "horizontal"
  //         ? { left: value?.left }
  //         : { top: value?.top },
  //   );
  // }, [value]);

  const onCheckScrollDirection = useCallback(() => {
    if (node == null) {
      return;
    }
    const {
      scrollTop,
      scrollHeight,
      scrollLeft,
      scrollWidth,
      clientHeight,
      clientWidth,
    } = node;
    const nextScrollDirection: ScrollDirection = {
      top: scrollTop > 0,
      bottom: scrollTop < scrollHeight - clientHeight,
      left: scrollLeft > 0,
      right: scrollLeft < scrollWidth - clientWidth,
    };
    const scrollDirection = scrollDirectionRef.current;
    if (
      nextScrollDirection.top === scrollDirection.top &&
      nextScrollDirection.bottom === scrollDirection.bottom &&
      nextScrollDirection.left === scrollDirection.left &&
      nextScrollDirection.right === scrollDirection.right
    ) {
      return;
    }
    scrollDirectionRef.current = nextScrollDirection;
    onChangeScrollDirection(nextScrollDirection);
  }, [node]);

  const onWheel = useCallback<JSX.WheelEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      nodeRef.current?.scrollBy({
        left: event.deltaX,
        top: event.deltaY,
        behavior: "instant",
      });
      if (auto) {
        onCheckScrollDirection();
      }
    },
    [auto, onCheckScrollDirection],
  );

  const onResize = useCallback(() => {
    const node = nodeRef.current;
    if (node == null) {
      return;
    }
    const height = node.clientHeight;
    const width = node.clientWidth;
    const currentSize = size.current;
    if (currentSize.height === height && currentSize.width === width) {
      return;
    }
    setSize({ height, width });
    // onCheckScrollDirection();
  }, EMPTY_ARRAY);

  const onResizeContent = useCallback(() => {
    const node = nodeRef.current?.firstElementChild;
    if (node == null) {
      return;
    }
    const height = node.clientHeight;
    const width = node.clientWidth;
    const currentContentSize = contentSize.current;
    if (
      currentContentSize.height === height &&
      currentContentSize.width === width
    ) {
      return;
    }
    setContentSize({ height, width });
    // onCheckScrollDirection();
  }, EMPTY_ARRAY);

  useResizeEffect(node, onResize);
  useResizeEffect(node?.firstElementChild, onResizeContent);

  const [autoScroll, onChangeAutoScroll] = useState<ScrollState | undefined>();
  const onAutoScrollStart = useCallback(
    (
      location: Location,
      verticalSpeed = SCROLL_SPEED,
      horizontalSpeed = verticalSpeed,
    ) => {
      switch (location) {
        case "top":
          return onChangeAutoScroll({ top: -verticalSpeed });
        case "bottom":
          return onChangeAutoScroll({ top: verticalSpeed });
        case "left":
          return onChangeAutoScroll({ left: -horizontalSpeed });
        case "right":
          return onChangeAutoScroll({ left: horizontalSpeed });
        default:
        // Ignore
      }
    },
    EMPTY_ARRAY,
  );
  const onAutoScrollStop = useCallback(() => onChangeAutoScroll(undefined), []);
  useEffect(() => {
    if (!autoScroll || !node) {
      return;
    }
    return interval(0, () => {
      node.scrollBy(autoScroll);
      onCheckScrollDirection();
    });
  }, [autoScroll, node, onCheckScrollDirection]);

  const currentContentSize = contentSize.current;
  const currentSize = size.current;
  const hasVerticalScroll = currentContentSize.height > currentSize.height;
  const hasHorizontalScroll = currentContentSize.width > currentSize.width;

  return (
    <Flex
      class={clsx("Scroll", className)}
      direction="vertical"
      height={height}
      onWheel={onWheel}
      width={width}
    >
      <Flex direction="horizontal" height="fill" overflow="hidden" width="fill">
        <Flex
          class="Scroll-content"
          height="fill"
          maxHeight="fill"
          onScroll={onScroll}
          onScrollEnd={onScrollEnd}
          overflow="hidden"
          ref={ref}
          width="fill"
          {...props}
        />
        {hasVerticalScroll && (
          <ScrollBar
            contentSize={currentContentSize.height}
            direction="vertical"
            onChange={setScroll}
            size={currentSize.height}
            value={scroll.scrollTop}
          />
        )}
      </Flex>
      {hasHorizontalScroll && (
        <Flex direction="horizontal" height="hug" width="fill">
          <ScrollBar
            contentSize={currentContentSize.width}
            direction="horizontal"
            onChange={setScroll}
            size={currentSize.width}
            value={scroll.scrollLeft}
          />
          {hasVerticalScroll && (
            <Flex class="Scroll-corner" height="fill">
              {corner}
            </Flex>
          )}
        </Flex>
      )}
      {AutoScroller && scrollDirection.top && (
        <AutoScroller
          location="top"
          onAutoScrollStart={onAutoScrollStart}
          onAutoScrollStop={onAutoScrollStop}
        />
      )}
      {AutoScroller && scrollDirection.bottom && (
        <AutoScroller
          location="bottom"
          onAutoScrollStart={onAutoScrollStart}
          onAutoScrollStop={onAutoScrollStop}
        />
      )}
    </Flex>
  );
});

type ScrollBarProps = {
  value: number | undefined;
  onChange: StateMutator<{ scrollTop: number; scrollLeft: number }>;
  size: number | undefined;
  contentSize: number | undefined;
  direction: FlexProps["direction"];
  minLength?: number;
};

function ScrollBar({
  value = 0,
  size,
  contentSize,
  minLength = 20,
  direction,
}: ScrollBarProps) {
  if (contentSize === undefined || size === undefined || contentSize <= size) {
    return null;
  }
  const knobSize = clamp((size / contentSize) * size, minLength, size);
  const gutterSize = size - knobSize;
  const offset = clamp(
    value * (gutterSize / (contentSize - size)),
    0,
    gutterSize,
  );
  return direction === "vertical" ? (
    <Flex
      align="top"
      class="ScrollBar"
      direction="vertical"
      height="fill"
      width="hug"
    >
      <Flex height={knobSize} style={{ marginTop: offset }} />
    </Flex>
  ) : (
    <Flex
      align="left"
      class="ScrollBar"
      direction="horizontal"
      height="hug"
      width="fill"
    >
      <Flex style={{ marginLeft: offset }} width={knobSize} />
    </Flex>
  );
}
