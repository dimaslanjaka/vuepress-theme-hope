import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "markdown-it/lib/token",
      "markdown-it/lib/helpers/parse_link_label",
      "mdurl",
      "hash-sum",
      "katex",
    ],
  }),
  ...rollupTypescript("client/appEnhance", {
    external: [
      "@Mermaid",
      "@Presentation",
      "@vuepress/client",
      "katex/dist/katex.min.css",
      "reveal.js",
      "reveal.js/plugin/markdown/markdown.esm.js",
      "reveal.js/plugin/highlight/highlight.esm.js",
      "reveal.js/plugin/math/math.esm.js",
      "reveal.js/plugin/search/search.esm.js",
      "reveal.js/plugin/notes/notes.esm.js",
      "reveal.js/plugin/zoom/zoom.esm.js",
      "vue",
      /\.scss$/,
      /\.css$/,
    ],
    dtsExternal: [/\.scss$/, /\.css$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/appSetup", {
    external: ["@vuepress/client", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
];
