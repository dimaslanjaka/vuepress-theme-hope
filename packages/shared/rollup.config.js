import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: "./src/node/index.ts",
    output: [{ file: "./node/index.js", format: "cjs", sourcemap: true }],
    plugins: [typescript(), terser()],
    external: [
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
    ],
  },
  {
    input: "./src/node/index.ts",
    output: [{ file: "./node/index.d.ts", format: "cjs" }],
    plugins: [dts()],
  },
  {
    input: "./src/client/index.ts",
    output: [{ file: "./client/index.js", format: "esm", sourcemap: true }],
    plugins: [typescript(), terser()],
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/composables",
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
      "vue",
    ],
  },
  {
    input: "./src/client/index.ts",
    output: [{ file: "./client/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
