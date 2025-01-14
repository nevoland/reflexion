import { useRefList, useResizeEffect } from "realue";

import type { Ref } from "../dependencies/types";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "../dependencies.js";
import type { ScrollContentProps } from "../types/ScrollContentProps.js";

import { Flex } from "./Flex.js";

export function ScrollContent({
  top,
  left,
  onChangeContentSize,
  children,
}: ScrollContentProps) {
  const { 0: node, 1: setNode } = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (node == null) {
      return;
    }
    node.scrollTo({ left, top, behavior: "instant" });
  }, [top, left, node]);

  const onContentResize = useCallback(() => {
    const childNode = node?.firstElementChild;
    if (childNode == null) {
      return;
    }
    onChangeContentSize({
      height: childNode.clientHeight,
      width: childNode.clientWidth,
    });
  }, [node?.firstElementChild]);

  useResizeEffect(node?.firstElementChild, onContentResize);

  return (
    <Flex
      class="Scroll-content"
      height="fill"
      maxHeight="fill"
      overflow="hidden"
      ref={setNode}
      width="fill"
    >
      {children}
    </Flex>
  );
}
