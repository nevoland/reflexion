import { clamp } from "@nevoland/clamp";
import { getGlobal } from "@nevoland/get-global";
import { on, once } from "futurise";

import type { JSX } from "../dependencies/types";
import { clsx, useCallback, useRef, useState } from "../dependencies.js";
import type { ScrollBarProps } from "../types";

import { Flex } from "./Flex.js";

export function ScrollBar({
  value = 0,
  name,
  onChange,
  size,
  contentSize,
  minLength = 20,
}: ScrollBarProps) {
  if (contentSize === undefined || size === undefined || contentSize <= size) {
    return null;
  }
  const knobSize = clamp((size / contentSize) * size, minLength, size);
  const trackSize = size - knobSize;
  const offset = clamp(
    value * (trackSize / (contentSize - size)),
    0,
    trackSize,
  );

  const { 0: active, 1: setActive } = useState(false);

  const valueRef = useRef(value);
  valueRef.current = value;

  const onMouseDownKnob = useCallback(
    (event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
      const locationOrigin = name === "top" ? event.clientY : event.clientX;
      const valueOrigin = valueRef.current;
      event.preventDefault();
      event.stopPropagation();
      const { document } = getGlobal();
      if (document == null) {
        return;
      }
      setActive(true);
      const offMouseMove = on(document, "mousemove", (event) => {
        event.preventDefault();
        const locationCurrent = name === "top" ? event.clientY : event.clientX;
        const locationDiff = locationCurrent - locationOrigin;
        const nextValue = clamp(
          valueOrigin + locationDiff / (trackSize / (contentSize - size)),
          0,
          contentSize - size,
        );
        onChange?.(nextValue, name);
      });

      once(
        document,
        "mouseup",
        (event) => {
          offMouseMove();
          event.stopPropagation();
          event.preventDefault();
          setActive(false);
        },
        true,
      );
    },
    [trackSize, onChange, name],
  );

  const onMouseDownTrack = useCallback(
    (event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
      const locationOrigin = name === "top" ? event.clientY : event.clientX;
      const trackOrigin =
        event.currentTarget.getBoundingClientRect()[name] + knobSize / 2;

      const location = clamp(locationOrigin - trackOrigin, 0, trackSize);
      const valueOrigin = clamp(
        location / (trackSize / (contentSize - size)),
        0,
        contentSize - size,
      );

      if (valueOrigin !== valueRef.current) {
        onChange?.(valueOrigin, name);
      }
      event.preventDefault();
      event.stopPropagation();
      const { document } = getGlobal();
      if (document == null) {
        return;
      }
      setActive(true);
      const offMouseMove = on(document, "mousemove", (event) => {
        event.preventDefault();
        const locationCurrent = name === "top" ? event.clientY : event.clientX;
        const locationDiff = locationCurrent - locationOrigin;
        const nextValue = clamp(
          valueOrigin + locationDiff / (trackSize / (contentSize - size)),
          0,
          contentSize - size,
        );
        onChange?.(nextValue, name);
      });

      once(document, "mouseup", () => {
        offMouseMove();
        setActive(false);
      });
    },
    [trackSize, knobSize, onChange, name],
  );

  return name === "top" ? (
    <Flex
      align="top"
      class="ScrollBar"
      direction="vertical"
      height="fill"
      onMouseDown={onMouseDownTrack}
      width="hug"
    >
      <Flex
        class={clsx(active && "ScrollBar-knob-active")}
        height={knobSize}
        onMouseDown={onMouseDownKnob}
        style={{ marginTop: offset }}
      />
    </Flex>
  ) : (
    <Flex
      align="left"
      class="ScrollBar ScrollBar-track"
      direction="horizontal"
      height="hug"
      onMouseDown={onMouseDownTrack}
      width="fill"
    >
      <Flex
        class={clsx(active && "ScrollBar-knob-active")}
        onMouseDown={onMouseDownKnob}
        style={{ marginLeft: offset }}
        width={knobSize}
      />
    </Flex>
  );
}
