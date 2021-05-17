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
      "@Valine",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupVue("client/components/Valine.ts", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "vue",
      "vue-router",
      "valine",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];
