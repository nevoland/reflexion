import type { JSX } from "../dependencies/types";

export type IntrinsicHTMLElement = Pick<
  JSX.IntrinsicElements,
  keyof HTMLElementTagNameMap
>;
