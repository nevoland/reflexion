import type { NevoProps } from "realue";

import type { ScrollState } from "./ScrollState";

export type ScrollBarProps = NevoProps<number> & {
  name: keyof ScrollState;
  /**
   * Size of the scrollbar track.
   */
  size: number | undefined;
  /**
   * Size of the content.
   */
  contentSize: number | undefined;
  /**
   * Minimum length of the scrollbar knob.
   */
  minLength?: number;
};
