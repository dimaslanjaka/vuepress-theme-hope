import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true, exports: "named" },
    ],
    plugins: [typescript(), terser()],
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils", "vue"],
  },
  {
    input: "./src/index.ts",
    output: [{ file: pkg.types, format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
  {
    input: "./src/clientAppSetup.ts",
    output: [
      {
        file: "./lib/clientAppSetup.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [typescript(), styles(), terser()],
    external: ["@vuepress/client", "balloon-css", "vue"],
  },
  {
    input: "./src/clientAppSetup.ts",
    output: [
      { file: "./lib/clientAppSetup.d.ts", format: "esm", sourcemap: true },
    ],
    plugins: [dts(), styles()],
    external: ["balloon-css"],
  },
];
