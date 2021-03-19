import { lang2Path } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { pageInfoI18n, valineI18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { CommentOptions, PageInfoI18nConfig } from "../shared";
import type { Plugin, PluginObject } from "@vuepress/core";

export * from "../shared/types";

const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const { themeConfig } = app.options;
  const baseLang =
    options.baseLang || (themeConfig.baseLang as string) || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const pageInfoI18nConfig = pageInfoI18n as PluginI18nConvert<PageInfoI18nConfig>;
  const valineI18nConfig = valineI18n as PluginI18nConvert<string>;

  pageInfoI18nConfig["/"] = pageInfoI18nConfig[baseLangPath];
  valineI18nConfig["/"] = valineI18nConfig[baseLangPath];

  const config: PluginObject = {
    name: "comment",

    define: () => ({
      COMMENT_OPTIONS: {
        hint: !themeConfig.pure,
        ...(Object.keys(options).length > 0
          ? options
          : (themeConfig.comment as CommentOptions) || {}),
      },
      PAGE_INFO_I18N: pageInfoI18nConfig,
      VALINE_I18N: valineI18nConfig,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    plugins: [
      ["@mr-hope/palette"],
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }],
    ],
  };

  // if (options.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", options]);

  return config;
};

export default commentPlugin;
