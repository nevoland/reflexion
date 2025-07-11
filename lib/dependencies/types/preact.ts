import type { JSX } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

export type {
  ComponentChild,
  ComponentChildren,
  Ref,
  AnyComponent as Component,
  VNode as Element,
} from "preact";

export type WheelEvent<Target extends EventTarget> =
  JSX.TargetedWheelEvent<Target>;
export type MouseEvent<Target extends EventTarget> =
  JSX.TargetedMouseEvent<Target>;

export type TargetedUIEvent<Target extends EventTarget> = UIEvent & {
  currentTarget: Target;
};

export type CSSProperties = JSX.AllCSSProperties;
export type HTMLAttributes<Target extends EventTarget = EventTarget> =
  JSX.AllHTMLAttributes<Target>;

export type { Dispatch, StateUpdater };

export type StateMutator<T> = Dispatch<StateUpdater<T>>;

type HtmlTags = keyof HTMLElementTagNameMap;
type SvgTags = keyof SVGElementTagNameMap;

export type IntrinsicElements = {
  [K in HtmlTags]: HTMLAttributes<HTMLElementTagNameMap[K]>;
} & {
  [K in SvgTags]: HTMLAttributes<SVGElementTagNameMap[K]>;
};
