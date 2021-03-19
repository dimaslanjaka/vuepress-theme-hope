import { rollupTypescript } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", ["@vuepress/utils"]),
  ...rollupTypescript("client/root-components/AddThis", ["vue"]),
];
