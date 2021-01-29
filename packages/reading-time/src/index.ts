import type { Plugin } from "@vuepress/core";
import type { ReadingTime, ReadingTimeOptions } from "./types";
import { readingTime } from "./reading-time";

export * from "./types";

const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, app) => ({
  name: "reading-time",

  extendsPageData: (page): { readingTime: ReadingTime } => ({
    readingTime: readingTime(
      page.content,
      options.wordPerminute || app.options.themeConfig.wordPerminute || 300
    ),
  }),
});

export default readingTimePlugin;
