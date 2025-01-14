import type { Name, ValueMutator } from "realue";

import type {
  Component,
  ComponentChild,
  ComponentChildren,
  Dispatch,
  JSX,
} from "../dependencies/types";

import type { FlexProps } from "./FlexProps";
import type { ScrollBarProps } from "./ScrollBarProps";
import type { ScrollContentProps } from "./ScrollContentProps";
import type { ScrollState } from "./ScrollState";
import type { ScrollerProps } from "./ScrollerProps";
import type { Size } from "./Size";

type ScrollBaseProps = {
  value?: ScrollState;
  name?: Name;
  onChange?: NoInfer<ValueMutator<ScrollState>>;
  onSizeChange?: Dispatch<Size>;
  onContentSizeChange?: Dispatch<Size>;
  /**
   * Offset left to add to the `ScrollContent` component (provided directly to it).
   */
  offsetLeft?: number;
  /**
   * Offset top to add to the `ScrollContent` component (provided directly to it).
   */
  offsetTop?: number;
  class?: string;
  onScroll?: (event: JSX.TargetedUIEvent<HTMLDivElement>) => void;
  onScrollEnd?: () => void;
  children: ComponentChildren;
  corner?: ComponentChild;
  /**
   * Component to render when the cursor reaches the edge of the rendered element to trigger automatic scrolling. Not setting it disables automatic scrolling.
   */
  Scroller?: Component<ScrollerProps>;
  /**
   * Component to use to render the content. Receives the `top` and `left` scroll position.
   */
  ScrollContent?: Component<ScrollContentProps>;
  /**
   * Optional class name to provide to the `ScrollContent` component.
   */
  contentClass?: string;
  /**
   * Component to use to render scroll bars. Can be set to `false` to disable scroll bars.
   */
  ScrollBar?: Component<ScrollBarProps> | false;
  contentHeight?: number;
  contentWidth?: number;
} & FlexProps;

export type ScrollProps = ScrollBaseProps &
  Omit<FlexProps, keyof ScrollBaseProps>;
