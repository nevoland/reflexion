import { interval } from "futurise";
import { type NevoProps, useResizeEffect } from "realue";

import type {
  ComponentChild,
  ComponentChildren,
  JSX,
  Ref,
  StateMutator,
} from "../dependencies/types";
import {
  EMPTY_ARRAY,
  clsx,
  forwardRef,
  useCallback,
  useEffect,
  useMergeRefs,
  useRef,
  useState,
} from "../dependencies.js";
import { IconArrowBottom, IconArrowUp } from "../icons.js";
import { clamp } from "../tools/clamp.js";
import type { FlexProps } from "../types";

import { Flex } from "./Flex.js";

export type ScrollProps = {
  /**
   * Indicates which axis should be synchronized when the `value` changes.
   */
  sync?: Orientation;
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
} & NevoProps<ScrollToOptions | undefined> &
  FlexProps;

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

export const Scroll = forwardRef(function Scroll(
  {
    value,
    name,
    onChange,
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
    ...props
  }: ScrollProps,
  parentRef?: Ref<HTMLDivElement>,
) {
  const valueRef = useRef<typeof value>();
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ height: 0, width: 0 });
  const [contentSize, setContentSize] = useState({ height: 0, width: 0 });
  const nodeRef = useRef(node);
  nodeRef.current = node;
  const ref = useMergeRefs([parentRef, setNode]);
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
      if (auto) {
        onCheckScrollDirection();
      }
    },
    [onChange, name, parentOnScroll, auto],
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
    [hiddenScrollbar, auto, onCheckScrollDirection],
  );

  const onResize = useCallback(() => {
    const node = nodeRef.current;
    if (node == null) {
      return;
    }
    setSize({
      height: node.clientHeight,
      width: node.clientWidth,
    });
    // onCheckScrollDirection();
  }, EMPTY_ARRAY);

  const onResizeContent = useCallback(() => {
    const node = nodeRef.current?.firstElementChild;
    if (node == null) {
      return;
    }
    setContentSize({
      height: node.clientHeight,
      width: node.clientWidth,
    });
    // onCheckScrollDirection();
  }, EMPTY_ARRAY);

  useResizeEffect(node, onResize);
  useResizeEffect(node?.firstElementChild, onResizeContent);

  const [autoScroll, onChangeAutoScroll] = useState<
    ScrollToOptions | undefined
  >();

  const onAutoScrollStart = useCallback<JSX.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      const { classList } = event.currentTarget;
      switch (true) {
        case classList.contains("Scroller-top"):
          return onChangeAutoScroll({ top: -SCROLL_SPEED });
        case classList.contains("Scroller-bottom"):
          return onChangeAutoScroll({ top: SCROLL_SPEED });
        case classList.contains("Scroller-left"):
          return onChangeAutoScroll({ left: -SCROLL_SPEED });
        case classList.contains("Scroller-right"):
          return onChangeAutoScroll({ left: SCROLL_SPEED });
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

  const hasVerticalScroll = contentSize.height > size.height;

  const hasHorizontalScroll = contentSize.width > size.width;

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
            contentSize={contentSize.height}
            direction="vertical"
            onChange={setScroll}
            size={size.height}
            value={scroll.scrollTop}
          />
        )}
      </Flex>
      {hasHorizontalScroll && (
        <Flex direction="horizontal" height="hug" width="fill">
          <ScrollBar
            contentSize={contentSize.width}
            direction="horizontal"
            onChange={setScroll}
            size={size.width}
            value={scroll.scrollLeft}
          />
          {hasVerticalScroll && (
            <Flex class="Scroll-corner" height="fill">
              {corner}
            </Flex>
          )}
        </Flex>
      )}
      {auto && scrollDirection.top && (
        <Flex
          align="center"
          class="Scroller Scroller-top z-component-5 absolute inset-x-0 top-0 cursor-default select-none"
          onMouseEnter={onAutoScrollStart}
          onMouseLeave={onAutoScrollStop}
        >
          <IconArrowUp />
        </Flex>
      )}
      {auto && scrollDirection.bottom && (
        <Flex
          align="center"
          class="Scroller Scroller-bottom z-component-5 absolute inset-x-0 bottom-0 cursor-default select-none"
          onMouseEnter={onAutoScrollStart}
          onMouseLeave={onAutoScrollStop}
        >
          <IconArrowBottom />
        </Flex>
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
};

const SCROLLBAR_MIN_LENGTH = 20;

function ScrollBar({
  value = 0,
  size,
  contentSize,
  direction,
}: ScrollBarProps) {
  if (contentSize === undefined || size === undefined || contentSize <= size) {
    return null;
  }
  const knobSize = clamp(
    (size / contentSize) * size,
    SCROLLBAR_MIN_LENGTH,
    size,
  );
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
