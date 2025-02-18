import { getGlobal } from "@nevoland/get-global";
import { clsx } from "clsx";
import {
  type JSX,
  type Ref,
  type VNode,
  createElement as h,
  toChildArray,
} from "preact";
import { forwardRef } from "preact/compat";

import { flex } from "../tools/flex.js";
import { merge } from "../tools/merge.js";
import type { ElementFromTag, FlexProps, FlexableComponent } from "../types";

const IS_FIREFOX = /Gecko\/\d/i.test(getGlobal().navigator?.userAgent);

function Flex<C extends FlexableComponent>(
  props: FlexProps<C> & { Component: C } & Omit<
      JSX.AllHTMLAttributes<ElementFromTag<C>>,
      keyof FlexProps<C>
    >,
  ref?: Ref<ElementFromTag<C>>,
): JSX.Element;
function Flex(
  props: FlexProps<"div"> &
    Omit<JSX.AllHTMLAttributes<HTMLDivElement>, keyof FlexProps<"div">>,
  ref?: Ref<HTMLDivElement>,
): JSX.Element;
function Flex<C extends FlexableComponent>(
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
    overflow = (scroll
      ? "auto"
      : IS_FIREFOX &&
        (direction !== undefined || align !== undefined) &&
        toChildArray(children).some(
          (child) =>
            (child as VNode)?.type === Flex &&
            (child as { props?: { scroll?: boolean } }).props?.scroll === true,
        )
      ? "hidden"
      : undefined) as FlexProps<any>["overflow"],
    gap,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    noShrink,
    ...props
  }:
    | (FlexProps<C> &
        Omit<JSX.AllHTMLAttributes<ElementFromTag<C>>, keyof FlexProps<C>>)
    | (FlexProps<"div"> &
        Omit<
          JSX.AllHTMLAttributes<ElementFromTag<"div">>,
          keyof FlexProps<"div">
        >),
  ref?: Ref<ElementFromTag<C>>,
) {
  const currentDirection =
    direction ?? (align === undefined ? undefined : "horizontal");
  const currentAlign =
    align ?? (direction !== undefined ? "top-left" : undefined);
  return h(
    Component,
    {
      class: clsx(
        "Flex",
        width === "fill" && "Flex-width-fill",
        height === "fill" && "Flex-height-fill",
        currentDirection && `Flex-${currentDirection}`,
        scroll && "Flex-scroll",
        className,
      ),
      ref,
      style: merge(
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
      ),
      ...props,
    } as any,
    children,
  );
}

/**
 * Creates a an intrinsic element with abstracted CSS Flexbox properties.
 */
const FlexExported = forwardRef(Flex) as typeof Flex;

export { FlexExported as Flex };
