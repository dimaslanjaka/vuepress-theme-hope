import { rollupTypescript } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", [
    "dayjs",
    "dayjs/plugin/localizedFormat",
    "dayjs/plugin/objectSupport",
    "dayjs/plugin/timezone",
    "dayjs/plugin/utc",
  ]),
  ...rollupTypescript("client/index", [
    "@vuepress/client",
    "@vuepress/plugin-theme-data/lib/composables",
    "dayjs",
    "dayjs/plugin/localizedFormat",
    "dayjs/plugin/objectSupport",
    "dayjs/plugin/timezone",
    "dayjs/plugin/utc",
    "vue",
  ]),
];
