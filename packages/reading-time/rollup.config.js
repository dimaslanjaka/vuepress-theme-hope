import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/node/index.ts",
    output: [
      {
        file: "./node/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [typescript(), terser()],
    external: ["@mr-hope/vuepress-shared", "@vuepress/client", "vue"],
  },
  {
    input: "./src/node/index.ts",
    output: [{ file: "./node/index.d.ts", format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
  {
    input: "./src/client/index.ts",
    output: [
      {
        file: "./client/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [typescript(), terser()],
    external: ["@mr-hope/vuepress-shared", "@vuepress/client", "vue"],
  },
  {
    input: "./src/client/index.ts",
    output: [{ file: "./client/index.d.ts", format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
];
