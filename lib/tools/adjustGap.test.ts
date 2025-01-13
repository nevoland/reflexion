import { expect, test } from "vitest";

import { adjustGap } from "./adjustGap.js";

test("adjusts gap", () => {
  expect(adjustGap(null, undefined)).toBeNull();
});
