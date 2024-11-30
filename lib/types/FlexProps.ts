import type { JSX, Ref } from "../dependencies/types";

import type { Dimension } from "./Dimension";
import type { Direction } from "./Direction";
import type { Gap } from "./Gap";
import type { Location } from "./Location";

export type FlexProps<E extends HTMLElement = HTMLDivElement> = {
  /**
   * Container component to use to render.
   *
   * @default "div"
   */
  Component?: JSX.ElementType;
  /**
   * Element classes.
   */
  class?: string;
  className?: string;
  /**
   * Element styles. These override any style abstracted by the other properties.
   */
  style?: JSX.AllCSSProperties;
  /**
   * Element width. If set to `"fill"`, the element horizontally fills the parent container.
   * If set to `"hug"`, it hugs the content of its children.
   */
  width?: Dimension;
  /**
   * Element minimum width. If set to `"fill"`, the element horizontally fills the parent container.
   * If set to `"hug"`, it hugs the content of its children.
   */
  minWidth?: Dimension;
  /**
   * Element maximum width. If set to `"fill"`, the element horizontally fills the parent container.
   * If set to `"hug"`, it hugs the content of its children.
   */
  maxWidth?: Dimension;
  /**
   * Element height. If set to `"fill"`, the element vertically fills the parent container.
   * If set to `"hug"`, it hugs the content of its children.
   */
  height?: Dimension;
  /**
   * Element minimum height. If set to `"fill"`, the element vertically fills the parent container.
   * If set to `"hug"`, it hugs the content of its children.
   */
  minHeight?: Dimension;
  /**
   * Element maximum height. If set to `"fill"`, the element vertically fills the parent container.
   * If set to `"hug"`, it hugs the content of its children.
   */
  maxHeight?: Dimension;
  /**
   * Element container setting that sets the flow direction of the children. If set, the element is considered to be a container.
   */
  direction?: Direction;
  /**
   * Element container setting that sets whether containing items should wrap or not.
   */
  wrap?: boolean;
  /**
   * Element container setting that sets the alignment of its children. If set, the element is considered to be a container.
   */
  align?: Location;
  /**
   * Element container setting that set the gap betwen its children. If set to `"auto"`, the gap is evenly distributed between the children.
   */
  gap?: Gap;
  /**
   * Element container setting that enables scrolling if its content goes out of bounds.
   */
  scroll?: boolean;
  /**
   * Element overflow setting. Controlled by the `scroll` property.
   */
  overflow?: "hidden" | "auto";
  /**
   * Explicitly prevent the element from shrinking if set to `true`.
   */
  noShrink?: true | undefined;
  ref?: Ref<E>;
};
