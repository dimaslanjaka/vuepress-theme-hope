import { rollupTypescript } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils"],
  }),
  ...rollupTypescript("client/i18n"),
];
