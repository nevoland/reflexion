import { useRefList, useResizeEffect } from "realue";

import type { ComponentChildren, Dispatch, Ref } from "../dependencies/types";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "../dependencies.js";

import { Flex } from "./Flex.js";

export type ScrollContentProps = {
  top: number;
  left: number;
  offsetTop: number;
  offsetLeft: number;
  onChangeContentSize: Dispatch<{ height: number; width: number }>;
  children: ComponentChildren;
};

export const ScrollContent = forwardRef(function ScrollContent(
  { top, left, onChangeContentSize, children }: ScrollContentProps,
  parentRef: Ref<HTMLDivElement>,
) {
  const { 0: node, 1: setNode } = useState<HTMLDivElement | null>(null);
  const ref = useRefList(parentRef, setNode);

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
      ref={ref}
      width="fill"
    >
      {children}
    </Flex>
  );
});
