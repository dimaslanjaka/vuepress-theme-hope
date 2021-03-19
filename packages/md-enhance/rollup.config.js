import dts from "rollup-plugin-dts";
import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "hash-sum",
      "katex",
    ],
  }),
  ...rollupVue("client/appEnhance.ts", {
    external: [
      "flowchart.js",
      "katex/dist/katex.min.css",
      "lodash.debounce",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupVue("client/appSetup.ts", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
];
