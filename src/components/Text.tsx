import type { ComponentChildren } from "../../lib/dependencies/types";

export type TextProps = {
  children: ComponentChildren;
};

export function Text({ children }: TextProps) {
  return <p>{children}</p>;
}
