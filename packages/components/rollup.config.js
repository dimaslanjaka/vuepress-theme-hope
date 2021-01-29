import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import typescript2 from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";

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
      vue(),
      typescript2({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          },
        },
      }),
      styles(),
      terser(),
    ],
    external: ["@vuepress/client", "lodash.debounce", "vue"],
  },
  {
    input: "./src/clientAppEnhance.ts",
    output: [
      { file: "./lib/clientAppEnhance.js", format: "esm", sourcemap: true },
    ],
    plugins: [
      vue(),
      typescript2({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          },
        },
      }),
      styles(),
      terser(),
    ],
    external: [
      "@mr-hope/vuepress-shared/styles/config/index.scss",
      "@vuepress/client",
      "vue",
      "vue-router",
      "screenfull",
    ],
  },
  {
    input: "./src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true, exports: "named" },
    ],
    plugins: [typescript(), terser()],
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "lodash.debounce",
      "vue",
    ],
  },
  {
    input: "./src/index.ts",
    output: [{ file: pkg.types, format: "esm", sourcemap: true }],
    plugins: [dts()],
  },
];
