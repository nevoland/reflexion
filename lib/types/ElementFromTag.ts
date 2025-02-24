import type { FlexableComponent } from "./FlexableComponent";

export type ElementFromTag<C extends FlexableComponent> =
  HTMLElementTagNameMap[C];
