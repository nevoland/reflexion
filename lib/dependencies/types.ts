import type { Dispatch, StateUpdater } from "preact/hooks";

export type {
  ComponentChild,
  ComponentChildren,
  JSX,
  Ref,
  AnyComponent as Component,
} from "preact";

export type { Dispatch, StateUpdater };

export type StateMutator<T> = Dispatch<StateUpdater<T>>;
