import type { Alignment } from "../types";

export function alignFlex(align?: Alignment) {
  return !align
    ? undefined
    : align === "start" || align === "end"
    ? `flex-${align}`
    : align;
}
