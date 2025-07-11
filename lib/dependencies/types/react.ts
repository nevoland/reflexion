import type { Dispatch, ReactNode } from "react";

type StateUpdater<S> = S | ((prevState: S) => S);

export type ComponentChildren = Iterable<ReactNode>;

export type {
  ReactNode as ComponentChild,
  ReactNode as VNode,
  JSX,
  Ref,
  Component,
} from "react";

export type { Dispatch, StateUpdater };

export type StateMutator<T> = Dispatch<StateUpdater<T>>;
