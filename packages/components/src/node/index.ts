import { lang2Path } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { i18n } from "./i18n";
import { ComponentOptions, ComponentI18nConfig } from "../shared";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@vuepress/core";

export * from "../shared/types";

const componentPlugin: Plugin<ComponentOptions> = (options, app) => {
  const { themeConfig } = app.options;
  const baseLang =
    options.baseLang || (themeConfig.baseLang as string | undefined) || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const componentConfig = i18n as PluginI18nConvert<ComponentI18nConfig>;

  componentConfig["/"] = componentConfig[baseLangPath];

  return {
    name: "components",

    define: (): Record<string, unknown> => ({
      COMPONENT_I18N: componentConfig,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/BackToTop.js"
    ),
  };
};

export default componentPlugin;
