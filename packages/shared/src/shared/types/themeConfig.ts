import type { ThemeConfig } from "@vuepress/core";

export interface BaseThemeConfig extends ThemeConfig {
  /**
   * 作者
   */
  author?: string[] | string;
  /**
   * Font class 图标前缀
   *
   * Font class Icon prefix
   *
   * @default 'icon-'
   */
  iconPrefix?: string;
  /**
   * Blog Config
   */
  blog: unknown | false;
}
