import type { Dispatch, HTMLAttributes, ReactNode } from "react";

export type { CSSProperties } from "react";

type StateUpdater<S> = S | ((prevState: S) => S);

export type ComponentChildren = Iterable<ReactNode>;

export type {
  ReactNode as ComponentChild,
  ReactElement as Element,
  Ref,
  FunctionComponent as Component,
  WheelEventHandler,
  WheelEvent,
  MouseEvent,
} from "react";

export type TargetedUIEvent<Target extends EventTarget> = UIEvent & {
  currentTarget: Target;
};

export type { Dispatch, StateUpdater, HTMLAttributes };

export type StateMutator<T> = Dispatch<StateUpdater<T>>;

type HtmlTags = keyof HTMLElementTagNameMap;
type SvgTags = keyof SVGElementTagNameMap;

export type IntrinsicElements = {
  [K in HtmlTags]: HTMLAttributes<HTMLElementTagNameMap[K]>;
} & {
  [K in SvgTags]: HTMLAttributes<SVGElementTagNameMap[K]>;
};
