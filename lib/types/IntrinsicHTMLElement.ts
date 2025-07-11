import type { IntrinsicElements } from "../dependencies/types";

export type IntrinsicHTMLElement = Pick<
  IntrinsicElements,
  keyof HTMLElementTagNameMap
>;
