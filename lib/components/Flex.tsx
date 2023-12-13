import { forwardRef } from "preact/compat";
import { type Ref, toChildArray, type JSX } from "preact";
import type { Alignment, Direction } from "../types";
import { flex } from "../tools/flex";

export type FlexProps = JSX.DOMAttributes<HTMLElement> & {
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
      class={className}
      ref={ref}
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
