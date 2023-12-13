import { getGlobal } from "@nevoland/get-global";
import { clsx } from "clsx";
import { type Ref, toChildArray } from "preact";
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
    wrap = false,
    align = "top-left",
    scroll = false,
    overflow = scroll
      ? "auto"
      : IS_FIREFOX &&
        direction !== undefined &&
        toChildArray(children).some(
          (child) =>
            (child as { props?: { scroll?: boolean } }).props?.scroll === true,
        )
      ? "hidden"
      : undefined,
    gap = 0,
    width,
    height,
    ...props
  }: FlexProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      class={clsx(
        "Flex",
        width === "fill" && "width-fill",
        height === "fill" && "height-fill",
        direction,
        scroll && "scroll",
        className,
      )}
      ref={ref}
      style={merge(
        flex(direction, wrap, align, overflow, gap, width, height),
        style,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Creates a `div` element with abstracted `flex` properties.
 */
export const Flex = forwardRef(FlexForwarded);
