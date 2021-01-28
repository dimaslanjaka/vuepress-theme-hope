import { lang2Path } from "@mr-hope/vuepress-shared";
import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@vuepress/core";
import { path } from "@vuepress/utils";
import { i18n } from "./i18n";
import { ComponentOptions, ComponentI18NConfig } from "./types";

export * from "./types";

const componentPlugin: Plugin<ComponentOptions> = (options, app) => {
  const { themeConfig } = app.options;
  const baseLang =
    options.baseLang || (themeConfig.baseLang as string | undefined) || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const componentConfig = i18n as PluginI18nConvert<ComponentI18NConfig>;

  componentConfig["/"] = componentConfig[baseLangPath];

  return {
    name: "components",

    define: (): Record<string, unknown> => ({
      COMPONENT_I18N: componentConfig,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.js"),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "./components/BackToTop.js"
    ),
  };
};

export default componentPlugin;
