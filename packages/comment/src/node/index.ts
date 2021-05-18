import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { pageInfoI18n, valineI18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { CommentOptions, PageInfoI18nConfig } from "../shared";
import type { Plugin, PluginObject } from "@vuepress/core";

export * from "../shared/types";

const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const { themeConfig } = app.options;
  const rootLangPath = getRootLangPath(app);
  const pageInfoI18nConfig =
    pageInfoI18n as PluginI18nConvert<PageInfoI18nConfig>;
  const valineI18nConfig = valineI18n as PluginI18nConvert<string>;

  pageInfoI18nConfig["/"] = pageInfoI18nConfig[rootLangPath];
  valineI18nConfig["/"] = valineI18nConfig[rootLangPath];

  const commentOptions: CommentOptions =
    Object.keys(options).length > 0
      ? (options as CommentOptions)
      : (themeConfig.comment as CommentOptions) || { type: "disable" };

  const config: PluginObject = {
    name: "comment",

    alias: {
      "@Valine":
        commentOptions.type === "valine"
          ? path.resolve(__dirname, "../client/components/Valine")
          : "@mr-hope/vuepress-shared/lib/esm/noopModule",
    },

    define: () => ({
      COMMENT_OPTIONS: {
        hint: !themeConfig.pure,
        ...commentOptions,
      },
      PAGE_INFO_I18N: pageInfoI18nConfig,
      VALINE_I18N: valineI18nConfig,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    plugins: [
      ["@mr-hope/palette"],
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }],
      ["@vuepress/git"],
    ],
  };

  // if (commentOptions.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", commentOptions]);

  return config;
};

export default commentPlugin;
