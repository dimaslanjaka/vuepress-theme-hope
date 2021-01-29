import { path } from "@vuepress/utils";

import type { Plugin } from "@vuepress/core";
import type { AddThisOptions } from "./types";

export * from "./types";

const addThisPlugin: Plugin<AddThisOptions> = (options, app) => ({
  name: "add-this",

  define: {
    PUB_ID: options.pubid || (app.options.themeConfig.addThis as string) || "",
  },

  globalUIComponents: "AddThis",

  clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.js"),
});

export default addThisPlugin;
