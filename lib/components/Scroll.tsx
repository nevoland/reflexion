import { clamp } from "@nevoland/clamp";
import { clsx } from "clsx";
import { interval } from "futurise";
import {
  type Name,
  type ValueMutator,
  useObject,
  useReferencedState,
  useResizeEffect,
  useSyncedState,
} from "realue";
import { EMPTY_ARRAY, setProperty } from "unchangeable";

import type {
  Component,
  ComponentChild,
  ComponentChildren,
  Dispatch,
  JSX,
  Ref,
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
  FlexProps,
  Location,
  ScrollState,
  ScrollerProps,
  Size,
} from "../types";

import { Flex } from "./Flex.js";
import {
  ScrollBar as ScrollBarDefault,
  type ScrollBarProps,
} from "./ScrollBar.jsx";
import {
  ScrollContent as ScrollContentDefault,
  type ScrollContentProps,
} from "./ScrollContent.jsx";

export type ScrollProps = {
  value?: ScrollState;
  name?: Name;
  onChange?: NoInfer<ValueMutator<ScrollState>>;
  onSizeChange?: Dispatch<Size>;
  onContentSizeChange?: Dispatch<Size>;
  /**
   * Offset left to add to the `ScrollContent` component (provided directly to it).
   */
  offsetLeft?: number;
  /**
   * Offset top to add to the `ScrollContent` component (provided directly to it).
   */
  offsetTop?: number;
  class?: string;
  onScroll?: (event: JSX.TargetedUIEvent<HTMLDivElement>) => void;
  onScrollEnd?: () => void;
  children: ComponentChildren;
  corner?: ComponentChild;
  /**
   * Component to render when the cursor reaches the edge of the rendered element to trigger automatic scrolling. Not setting it disables automatic scrolling.
   */
  Scroller?: Component<ScrollerProps>;
  /**
   * Component to use to render the content. Receives the `top` and `left` scroll position.
   */
  ScrollContent?: Component<ScrollContentProps>;
  /**
   * Component to use to render scroll bars. Can be set to `false` to disable scroll bars.
   */
  ScrollBar?: Component<ScrollBarProps> | false;
  contentHeight?: number;
  contentWidth?: number;
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

const INITIAL_VALUE = { left: 0, top: 0 };

const INITIAL_SIZE = { height: 0, width: 0 };

export const Scroll = forwardRef(function Scroll(
  {
    value = INITIAL_VALUE,
    name = "",
    onChange,
    class: className,
    overflow,
    onScrollEnd,
    width = "fill",
    height = "fill",
    onSizeChange: parentOnSizeChange,
    onContentSizeChange: parentOnContentSizeChange,
    contentHeight,
    contentWidth,
    offsetLeft = 0,
    offsetTop = 0,
    corner,
    Scroller,
    ScrollContent = ScrollContentDefault,
    ScrollBar = ScrollBarDefault,
    children,
    ...props
  }: ScrollProps,
  parentRef?: Ref<HTMLDivElement>,
) {
  const { 0: size, 1: setSize } = useSyncedState(
    INITIAL_SIZE,
    parentOnSizeChange,
  );
  const sizeRef = useRef(size);
  sizeRef.current = size;

  const { 0: contentSize, 1: setContentSize } = useSyncedState(
    INITIAL_SIZE,
    parentOnContentSizeChange,
  );
  const contentSizeRef = useRef(contentSize);
  contentSizeRef.current = contentSize;

  const { 0: nodeRef, 1: setNode } = useReferencedState<HTMLElement | null>(
    null,
  );

  const clampedValue = useMemo(() => {
    const size = sizeRef.current;
    const contentSize = contentSizeRef.current;
    const maxLeft = clamp(contentSize.width - size.width, 0);
    const maxTop = clamp(contentSize.height - size.height, 0);
    const left = clamp(value.left, 0, maxLeft);
    const top = clamp(value.top, 0, maxTop);
    if (left !== value.left || top !== value.top) {
      return {
        left,
        top,
      };
    }
    return value;
  }, [value, sizeRef.current, contentSizeRef.current]);

  const { 0: scroll, 1: setScroll } = useSyncedState<ScrollState>(
    clampedValue,
    onChange,
  );

  const valueRef = useRef<typeof value>(scroll);
  valueRef.current = scroll;
  const property = useObject({ value: scroll, name, onChange: setScroll });

  const scrollBy = useCallback(
    (left: number, top: number) => {
      const contentSize = contentSizeRef.current;
      const size = sizeRef.current;
      setScroll((state) => ({
        left: clamp(
          state.left + left,
          0,
          clamp(contentSize.width - size.width, 0, Infinity),
        ),
        top: clamp(
          state.top + top,
          0,
          clamp(contentSize.height - size.height, 0, Infinity),
        ),
      }));
    },
    [setScroll],
  );

  const { 0: scrollDirectionRef, 1: onChangeScrollDirection } =
    useReferencedState<ScrollDirection>(DEFAULT_SCROLL_DIRECTION);

  useMemo(() => {
    if (Scroller == null) {
      return;
    }
    const { top, left } = valueRef.current;
    const { height, width } = sizeRef.current;
    const { height: contentHeight, width: contentWidth } =
      contentSizeRef.current;

    const nextScrollDirection: ScrollDirection = {
      top: top > 0,
      bottom: top < contentHeight - height,
      left: left > 0,
      right: left < contentWidth - width,
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
  }, [valueRef.current, sizeRef.current, contentSizeRef.current, Scroller]);

  useMemo(() => {
    if (contentHeight == null && contentWidth == null) {
      return;
    }
    let contentSize = contentSizeRef.current;
    if (contentHeight != null && contentSize.height !== contentHeight) {
      contentSize = setProperty(contentSize, "height", contentHeight);
    }
    if (contentWidth != null && contentSize.width !== contentWidth) {
      contentSize = setProperty(contentSize, "width", contentWidth);
    }
    if (contentSize !== contentSizeRef.current) {
      setContentSize(contentSize);
    }
  }, [contentHeight, contentWidth, Scroller]);

  const onWheel = useCallback<
    (event: JSX.TargetedWheelEvent<HTMLDivElement>) => void
  >(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      scrollBy(event.deltaX, event.deltaY);
    },
    [Scroller],
  );

  const onResize = useCallback(() => {
    const node = nodeRef.current?.firstElementChild;
    if (node == null) {
      return;
    }
    const height = node.clientHeight;
    const width = node.clientWidth;
    const size = sizeRef.current;
    if (size.height === height && size.width === width) {
      return;
    }
    setSize({ height, width });
  }, [Scroller]);

  useResizeEffect(nodeRef.current?.firstElementChild, onResize);

  const [autoScroll, onChangeAutoScroll] = useState<ScrollState>();
  const onAutoScrollStart = useCallback(
    (
      location: Location,
      verticalSpeed = SCROLL_SPEED,
      horizontalSpeed = verticalSpeed,
    ) => {
      switch (location) {
        case "top":
          return onChangeAutoScroll({ left: 0, top: -verticalSpeed });
        case "bottom":
          return onChangeAutoScroll({ left: 0, top: verticalSpeed });
        case "left":
          return onChangeAutoScroll({ left: -horizontalSpeed, top: 0 });
        case "right":
          return onChangeAutoScroll({ left: horizontalSpeed, top: 0 });
        default:
        // Ignore
      }
    },
    EMPTY_ARRAY,
  );
  const onAutoScrollStop = useCallback(() => onChangeAutoScroll(undefined), []);
  useEffect(() => {
    const node = nodeRef.current;
    if (!autoScroll || !node) {
      return;
    }
    return interval(0, () => {
      scrollBy(autoScroll.left, autoScroll.top);
    });
  }, [autoScroll, nodeRef.current]);

  const hasVerticalScroll = contentSize.height > size.height;
  const hasHorizontalScroll = contentSize.width > size.width;

  return (
    <Flex
      class={clsx("Scroll", className)}
      direction="vertical"
      height={height}
      onWheel={onWheel}
      ref={parentRef}
      width={width}
      {...props}
    >
      <Flex
        direction="horizontal"
        height="fill"
        overflow="hidden"
        ref={setNode}
        width="fill"
      >
        <ScrollContent
          left={valueRef.current.left}
          offsetLeft={offsetLeft}
          offsetTop={offsetTop}
          onChangeContentSize={setContentSize}
          top={valueRef.current.top}
        >
          {children}
        </ScrollContent>
        {ScrollBar && hasVerticalScroll && (
          <ScrollBar
            {...property("top")}
            contentSize={contentSize.height}
            size={size.height}
          />
        )}
      </Flex>
      {ScrollBar && hasHorizontalScroll && (
        <Flex direction="horizontal" height="hug" width="fill">
          <ScrollBar
            {...property("left")}
            contentSize={contentSize.width}
            size={size.width}
          />
          {hasVerticalScroll && (
            <Flex class="Scroll-corner" height="fill">
              {corner}
            </Flex>
          )}
        </Flex>
      )}
      {Scroller && scrollDirectionRef.current.top && (
        <Scroller
          name="top"
          onAutoScrollStart={onAutoScrollStart}
          onAutoScrollStop={onAutoScrollStop}
        />
      )}
      {Scroller && scrollDirectionRef.current.left && (
        <Scroller
          name="left"
          onAutoScrollStart={onAutoScrollStart}
          onAutoScrollStop={onAutoScrollStop}
        />
      )}
      {Scroller && scrollDirectionRef.current.bottom && (
        <Scroller
          name="bottom"
          onAutoScrollStart={onAutoScrollStart}
          onAutoScrollStop={onAutoScrollStop}
        />
      )}
      {Scroller && scrollDirectionRef.current.right && (
        <Scroller
          name="right"
          onAutoScrollStart={onAutoScrollStart}
          onAutoScrollStop={onAutoScrollStop}
        />
      )}
    </Flex>
  );
});
