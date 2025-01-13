import { getGlobal } from "@nevoland/get-global";
import { clsx } from "clsx";

import type { JSX, Ref } from "../dependencies/types";
import { forwardRef, toChildArray } from "../dependencies.js";
import { flex } from "../tools/flex.js";
import { merge } from "../tools/merge.js";
import type { FlexProps } from "../types";

const IS_FIREFOX = /Gecko\/\d/i.test(getGlobal().navigator?.userAgent ?? "");

function FlexForwarded<E extends HTMLElement = HTMLDivElement>(
  {
    Component = "div",
    class: realClassName,
    className = realClassName,
    style,
    children,
    direction,
    align,
    wrap = false,
    scroll = false,
    overflow = scroll
      ? "auto"
      : IS_FIREFOX &&
          (direction !== undefined || align !== undefined) &&
          toChildArray(children).some(
            (child) =>
              (child as { props?: { scroll?: boolean } }).props?.scroll ===
              true,
          )
        ? "hidden"
        : undefined,
    gap,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    noShrink,
    ...props
  }: FlexProps<E> & Omit<JSX.HTMLAttributes<E>, keyof FlexProps>,
  ref?: Ref<E>,
) {
  const currentDirection =
    direction ?? (align === undefined ? undefined : "horizontal");
  const currentAlign =
    align ?? (direction !== undefined ? "top-left" : undefined);
  return (
    <Component
      class={clsx(
        "Flex",
        width === "fill" && "Flex-width-fill",
        height === "fill" && "Flex-height-fill",
        currentDirection && `Flex-${currentDirection}`,
        scroll && "Flex-scroll",
        className,
      )}
      ref={ref}
      style={merge(
        flex(
          currentDirection,
          wrap,
          currentAlign,
          overflow,
          gap,
          width,
          minWidth,
          maxWidth,
          height,
          minHeight,
          maxHeight,
          noShrink,
        ),
        style,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Creates a `div` element with abstracted CSS Flexbox properties.
 */
export const Flex = forwardRef(FlexForwarded) as typeof FlexForwarded;
