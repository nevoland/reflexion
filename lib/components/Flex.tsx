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
import type {
  AttributesFromTag,
  ElementFromTag,
  FlexProps,
  FlexableComponent,
} from "../types";

const IS_FIREFOX = /Gecko\/\d/i.test(getGlobal().navigator?.userAgent);

function FlexForwarded<C extends FlexableComponent>(
  props: FlexProps<C> & Omit<AttributesFromTag<C>, keyof FlexProps<C>>,
  ref?: Ref<ElementFromTag<C>>,
): JSX.Element;
function FlexForwarded(
  props: Omit<FlexProps<"div">, "Component"> &
    Omit<AttributesFromTag<"div">, keyof FlexProps<"div">>,
  ref?: Ref<ElementFromTag<"div">>,
): JSX.Element;
function FlexForwarded<C extends FlexableComponent>(
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
    | (FlexProps<C> & Omit<AttributesFromTag<C>, keyof FlexProps<C>>)
    | (Omit<FlexProps<"div">, "Component"> & { Component?: "div" } & Omit<
          AttributesFromTag<"div">,
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
 * Creates a `div` element with abstracted CSS Flexbox properties.
 */
export const Flex = forwardRef(FlexForwarded) as typeof FlexForwarded;
