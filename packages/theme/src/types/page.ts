import type { GitPluginPageData } from "@vuepress/plugin-git";

export interface ThemeHopePageData extends GitPluginPageData {
  filePathRelative: string;
}
