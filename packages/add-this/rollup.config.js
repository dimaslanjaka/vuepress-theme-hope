import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/node/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true, exports: "named" },
    ],
    plugins: [typescript(), terser()],
    external: ["@vuepress/utils"],
  },
  {
    input: "./src/node/index.ts",
    output: [{ file: pkg.types, format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
  {
    input: "./src/client/root-components/AddThis.ts",
    output: [
      {
        file: "./client/root-components/AddThis.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [typescript(), terser()],
    external: ["vue"],
  },
  {
    input: "./src/client/root-components/AddThis.ts",
    output: [
      {
        file: "./client/root-components/AddThis.d.ts",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [dts()],
  },
];
