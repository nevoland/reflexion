import type { Direction } from "../types";

export function flexDirection(direction: Direction) {
  switch (direction) {
    case "horizontal":
      return "row";
    case "vertical":
      return "column";
    default:
      return "row";
  }
}
