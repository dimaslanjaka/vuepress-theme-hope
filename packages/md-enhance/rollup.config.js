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
      "@vuepress/client",
      "flowchart.js",
      "katex/dist/katex.min.css",
      "lodash.debounce",
      "reveal.js",
      "reveal.js/plugin/markdown/markdown.esm.js",
      "reveal.js/plugin/highlight/highlight.esm.js",
      "reveal.js/plugin/math/math.esm.js",
      "reveal.js/plugin/search/search.esm.js",
      "reveal.js/plugin/notes/notes.esm.js",
      "reveal.js/plugin/zoom/zoom.esm.js",
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
