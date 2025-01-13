import { clsx, useCallback } from "../dependencies.js";
import type { ScrollerProps } from "../types/ScrollerProps";

import { Flex } from "./Flex.js";

const ARROWS = {
  top: "↑",
  bottom: "↓",
  left: "←",
  right: "→",
};

export function Scroller({
  name,
  onAutoScrollStart,
  onAutoScrollStop,
}: ScrollerProps) {
  const onMouseEnter = useCallback(() => {
    onAutoScrollStart(name);
  }, [onAutoScrollStart, name]);

  return (
    <Flex
      align="center"
      class={clsx("Scroller", `Scroller-${name}`)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onAutoScrollStop}
    >
      {ARROWS[name as keyof typeof ARROWS] ?? "?"}
    </Flex>
  );
}
