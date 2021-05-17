import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    output: { format: "cjs" },
    external: ["@vuepress/utils"],
  }),
  ...rollupVue("client/appEnhance.ts", {
    copy: [["styles", "./"]],
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/appSetup.ts", {
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
    ],
  }),
  ...rollupVue("layouts/Layout.vue", {
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("layouts/404.vue", {
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];
