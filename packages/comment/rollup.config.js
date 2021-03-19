import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils"],
  }),
  ...rollupVue("client/appEnhance.ts", {
    external: [
      "@mr-hope/vuepress-plugin-reading-time/client",
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "balloon-css",
      "valine",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
    copy: ["./src/client/styles", "client"],
  }),
];
