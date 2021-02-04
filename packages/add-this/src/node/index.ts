import { path } from "@vuepress/utils";

import type { Plugin } from "@vuepress/core";
import type { AddThisOptions } from "../shared";

export * from "../shared/types";

const addThisPlugin: Plugin<AddThisOptions> = (options, app) => ({
  name: "add-this",

  define: {
    PUB_ID: options.pubid || (app.options.themeConfig.addThis as string) || "",
  },

  globalUIComponents: "AddThis",

  clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
});

export default addThisPlugin;
