import { type JSX, type Ref, toChildArray } from "preact";
import { forwardRef } from "preact/compat";

import { flex } from "../tools/flex.js";
import type { Alignment, Direction } from "../types";

export type FlexProps = JSX.DOMAttributes<HTMLDivElement> & {
  class?: string;
  className?: string;
  style?: JSX.AllCSSProperties;
  container?: boolean;
  direction?: Direction;
  wrap?: boolean;
  grow?: boolean;
  shrink?: boolean;
  basis?: string;
  item?: boolean;
  align?: Alignment;
  justify?: Alignment;
  scroll?: boolean;
  overflow?: "hidden" | "auto";
};

function FlexForwarded(
  {
    class: realClassName,
    className = realClassName,
    style,
    children,
    container = false,
    direction = "row",
    wrap = false,
    align = container ? "stretch" : undefined,
    justify = "start",
    scroll = false,
    item = false,
    overflow = scroll
      ? item
        ? "auto"
        : "hidden"
      : container &&
        toChildArray(children).some(
          (child) =>
            (child as { props?: { scroll?: boolean } }).props?.scroll === true,
        )
      ? "hidden"
      : undefined,
    grow = false,
    shrink = overflow === "hidden" ? true : !grow,
    basis = shrink && overflow !== "hidden" ? "auto" : "0",
    ...props
  }: FlexProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      class={className}
      ref={ref}
      style={merge(
        flex(
          container,
          direction,
          wrap,
          grow,
          shrink,
          basis,
          item,
          align,
          justify,
          overflow,
        ),
        style,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function merge<A extends object, B extends object>(a: A, b?: B): A | (A & B) {
  return b === undefined ? a : { ...a, ...b };
}

/**
 * Creates a `div` element with abstracted `flex` properties.
 */
export const Flex = forwardRef(FlexForwarded);
