/* global document */

import { render } from "preact";

import { App } from "./App.tsx";
import { observeDarkMode } from "./tools.ts";

import "./main.css";

observeDarkMode((isDark) => {
  document
    .getElementsByTagName("body")[0]
    .classList[isDark ? "add" : "remove"]("dark");
});

render(<App />, document.getElementById("app")!);
