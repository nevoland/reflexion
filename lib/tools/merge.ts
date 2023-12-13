export function merge<A extends object, B extends object>(
  a: A,
  b?: B,
): A | (A & B) {
  return b === undefined ? a : { ...a, ...b };
}
