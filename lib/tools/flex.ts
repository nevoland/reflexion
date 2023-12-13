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
  height?: Dimension,
) {
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
    wrap: wrap ? "wrap" : "nowrap",
    overflow,
    width:
      width === "fill" ? undefined : width === "hug" ? "fit-content" : width,
    height:
      height === "fill" ? undefined : height === "hug" ? "fit-content" : height,
  };
}
