import type { JSX } from "preact/jsx-runtime";

import type { Alignment, Dimension, Direction, Gap } from "../types";

import { adjustGap } from "./adjustGap.js";
import { alignFlex } from "./alignFlex.js";
import { flexDirection } from "./flexDirection.js";

export function flex(
  direction: Direction | undefined,
  wrap: boolean,
  align: Alignment | undefined,
  overflow: "hidden" | "auto" | undefined,
  gap: Gap | undefined,
  width?: Dimension,
  minWidth?: Dimension,
  maxWidth?: Dimension,
  height?: Dimension,
  minHeight?: Dimension,
  maxHeight?: Dimension,
): JSX.CSSProperties {
  return {
    ...adjustGap(
      align === undefined || direction === undefined
        ? null
        : alignFlex(align, direction),
      gap,
    ),
    display: direction === undefined ? undefined : "flex",
    flexDirection:
      direction === undefined ? undefined : flexDirection(direction),
    flexWrap: wrap ? "wrap" : "nowrap",
    overflow,
    width:
      width === "fill" ? undefined : width === "hug" ? "fit-content" : width,
    minWidth: sizeFromDimension(minWidth),
    maxWidth: sizeFromDimension(maxWidth),
    height:
      height === "fill" ? undefined : height === "hug" ? "fit-content" : height,
    minHeight: sizeFromDimension(minHeight),
    maxHeight: sizeFromDimension(maxHeight),
  };
}

function sizeFromDimension(value: Dimension | undefined) {
  return value === "fill" ? "100%" : value === "hug" ? "fit-content" : value;
}
