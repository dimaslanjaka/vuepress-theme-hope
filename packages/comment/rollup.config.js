import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils"],
  }),
  ...rollupVue("client/appEnhance.ts", {
    external: [
      "@mr-hope/vuepress-plugin-reading-time/client/i18n",
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "balloon-css",
      "vue",
      "vue-router",
      "@Waline",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupVue("client/components/Waline.ts", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@waline/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];
