import type { Gap } from "../types";

export function adjustGap(style: object | null, gap: Gap | undefined) {
  if (gap === undefined) {
    return style;
  }
  if (gap === "auto") {
    return {
      ...style,
      justifyContent: "space-between",
    };
  }
  return {
    ...style,
    gap,
  };
}
