import { lang2Path } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@vuepress/core";
import type { CopyCodeI18nConfig, CopyCodeOptions } from "../shared";

export * from "../shared";

const copyCodePlugin: Plugin<CopyCodeOptions> = (options, app) => {
  const { themeConfig } = app.options;
  const baseLang =
    options.baseLang || (themeConfig.baseLang as string) || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const copyCodeI18nConfig = i18n as PluginI18nConvert<CopyCodeI18nConfig>;

  copyCodeI18nConfig["/"] = copyCodeI18nConfig[baseLangPath];

  return {
    name: "copy-code",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS:
        Object.keys(options).length > 0 ? options : themeConfig.copyCode || {},
      CODE_COPY_I18N: copyCodeI18nConfig,
    }),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    plugins: [["@mr-hope/palette"]],
  };
};

export default copyCodePlugin;
