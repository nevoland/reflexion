/* global document */

import { render } from "preact";

import { App } from "./App.tsx";
import { observeDarkMode } from "./tools.ts";

import "./main.css";

observeDarkMode((isDark) => {
  document.body.classList[isDark ? "add" : "remove"]("dark");
});

render(<App />, document.getElementById("app")!);
