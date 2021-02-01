import pkg from "./package.json";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: "./src/node.ts",
    output: [{ file: pkg.main, format: "cjs", sourcemap: true }],
    plugins: [json(), typescript(), terser()],
    external: [
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
    ],
  },
  {
    input: "./src/client.ts",
    output: [{ file: pkg.module, format: "esm", sourcemap: true }],
    plugins: [json(), typescript(), terser()],
    external: [
      "@vuepress/client",
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
      "vue",
    ],
  },
  {
    input: "./src/client.ts",
    output: [{ file: pkg.types, format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
];
