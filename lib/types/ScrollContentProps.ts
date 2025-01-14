import type { ComponentChildren, Dispatch } from "../dependencies/types";

export type ScrollContentProps = {
  top: number;
  left: number;
  offsetTop: number;
  offsetLeft: number;
  contentHeight?: number;
  contentWidth?: number;
  onChangeContentSize: Dispatch<{ height: number; width: number }>;
  children: ComponentChildren;
  class?: string;
};
