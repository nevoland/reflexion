import { getGlobal } from "@nevoland/get-global";
import { clsx } from "clsx";
import { type JSX, type Ref, toChildArray } from "preact";
import { forwardRef } from "preact/compat";

import { flex } from "../tools/flex.js";
import { merge } from "../tools/merge.js";
import type { FlexProps } from "../types";

const IS_FIREFOX = /Gecko\/\d/i.test(getGlobal().navigator?.userAgent);

function FlexForwarded(
  {
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
            (child as { props?: { scroll?: boolean } }).props?.scroll === true,
        )
      ? "hidden"
      : undefined,
    gap,
    width,
    height,
    ...props
  }: FlexProps & JSX.DOMAttributes<HTMLDivElement>,
  ref: Ref<HTMLDivElement | undefined>,
) {
  const currentDirection =
    direction ?? (align === undefined ? undefined : "horizontal");
  const currentAlign =
    align ?? (direction !== undefined ? "top-left" : undefined);
  return (
    <div
      class={clsx(
        "Flex",
        width === "fill" && "Flex-width-fill",
        height === "fill" && "Flex-height-fill",
        currentDirection && `Flex-${currentDirection}`,
        scroll && "Flex-scroll",
        className,
      )}
      ref={ref as Ref<HTMLDivElement>}
      style={merge(
        flex(
          currentDirection,
          wrap,
          currentAlign,
          overflow,
          gap,
          width,
          height,
        ),
        style,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Creates a `div` element with abstracted CSS Flexbox properties.
 */
export const Flex = forwardRef(FlexForwarded);
