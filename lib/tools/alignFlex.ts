import type { Alignment, Direction } from "../types";

export function alignFlex(align: Alignment, direction: Direction) {
  const vertical = direction === "vertical";
  switch (align) {
    case "top-left":
      return {
        alignItems: "flex-start",
        justifyContent: "flex-start",
      };
    case "top":
      return {
        alignItems: vertical ? "center" : "flex-start",
        justifyContent: vertical ? "flex-start" : "center",
      };
    case "top-right":
      return {
        alignItems: vertical ? "flex-end" : "flex-start",
        justifyContent: vertical ? "flex-start" : "flex-end",
      };
    case "left":
      return {
        alignItems: vertical ? "flex-start" : "center",
        justifyContent: vertical ? "center" : "flex-start",
      };
    case "center":
      return {
        alignItems: "center",
        justifyContent: "center",
      };
    case "right":
      return {
        alignItems: vertical ? "flex-end" : "center",
        justifyContent: vertical ? "center" : "flex-end",
      };
    case "bottom-left":
      return {
        alignItems: vertical ? "flex-start" : "flex-end",
        justifyContent: vertical ? "flex-end" : "flex-start",
      };
    case "bottom":
      return {
        alignItems: vertical ? "center" : "flex-end",
        justifyContent: vertical ? "flex-end" : "center",
      };
    case "bottom-right":
      return {
        alignItems: "flex-end",
        justifyContent: "flex-end",
      };
    default:
      return {
        alignItems: "flex-start",
        justifyContent: "flex-start",
      };
  }
}
