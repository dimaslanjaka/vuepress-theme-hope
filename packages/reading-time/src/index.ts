import { lang2Path } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";
import { readingTime } from "./reading-time";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@vuepress/core";
import type { ReadingTime, ReadingTimeOptions } from "./types";

export * from "./composables";
export * from "./types";

const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, app) => {
  const baseLang =
    options.baseLang || (app.options.themeConfig.baseLang as string) || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const readingTimeConfig = i18n as PluginI18nConvert<ReadingTimeOptions>;

  readingTimeConfig["/"] = readingTimeConfig[baseLangPath];

  return {
    name: "reading-time",

    define: (): Record<string, unknown> => ({
      READING_TIME_I18N: readingTimeConfig,
    }),

    extendsPageData: (page): { readingTime: ReadingTime } => ({
      readingTime: readingTime(
        page.content,
        options.wordPerminute || app.options.themeConfig.wordPerminute || 300
      ),
    }),
  };
};

export default readingTimePlugin;
