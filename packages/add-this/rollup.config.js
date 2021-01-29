import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true, exports: "named" },
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: "./src/index.ts",
    output: [{ file: pkg.types, format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
  {
    input: "./src/clientAppEnhance.ts",
    output: [
      { file: "./lib/clientAppEnhance.js", format: "esm", sourcemap: true },
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: "./src/clientAppEnhance.ts",
    output: [
      { file: "./lib/clientAppEnhance.d.ts", format: "esm", sourcemap: true },
    ],
    plugins: [dts()],
  },
];
