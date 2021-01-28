// import dts from "rollup-plugin-dts";
import scss from "rollup-plugin-scss";
// import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
// import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";
// import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "./src/components/BackToTop.vue",
    output: [
      {
        file: "./lib/components/BackToTop.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // nodeResolve(),
      vue(),
      typescript2(),
      // scss({
      // output: false,
      // sass: require("sass"),
      // }),
      postcss(),
    ],
    external: ["@vuepress/client", "lodash.debounce", "vue"],
  },
  // {
  //   input: "./src/clientAppEnhance.ts",
  //   output: [
  //     { file: "./lib/clientAppEnhance.js", format: "esm", sourcemap: true },
  //   ],
  //   plugins: [
  //     vue(),
  //     typescript2({
  //       tsconfigOverride: {
  //         declaration: false,
  //       },
  //     }),
  //     postcss(),
  //   ],
  // },
  // {
  //   input: "./src/index.ts",
  //   output: [
  //     { file: pkg.main, format: "cjs", sourcemap: true, exports: "named" },
  //   ],
  //   plugins: [typescript()],
  // },
  // {
  //   input: "./src/index.ts",
  //   output: [{ file: pkg.types, format: "esm", sourcemap: true }],
  //   plugins: [dts()],
  // },
];
