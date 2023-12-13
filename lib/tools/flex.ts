import type { Alignment, Direction } from "../types";

import { alignFlex } from "./alignFlex.js";

export function flex(
  container: boolean,
  direction: Direction,
  wrap: boolean,
  grow: boolean,
  shrink: boolean,
  basis: string,
  item: boolean,
  align: Alignment | undefined,
  justify: Alignment | undefined,
  overflow: "hidden" | "auto" | undefined,
) {
  return {
    alignItems: container ? alignFlex(align) : undefined,
    alignSelf: !container ? alignFlex(align) : undefined,
    // Container
    display: container ? "flex" : undefined,
    // Item
    flex: item
      ? `${grow ? "1" : "0"} ${shrink ? "1" : "0"} ${basis}`
      : undefined,
    flexFlow: container
      ? `${direction} ${wrap ? "wrap" : "nowrap"}`
      : undefined,
    justifyContent: container ? alignFlex(justify) : undefined,
    // Container and item
    overflow,
  };
}
