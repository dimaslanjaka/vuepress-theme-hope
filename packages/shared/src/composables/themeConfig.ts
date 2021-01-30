import { useThemeData } from "@vuepress/client";
import { computed } from "vue";

import type { ThemeConfig } from "@vuepress/core";
import type { ComputedRef } from "vue";

export interface BaseThemeConfig extends ThemeConfig {
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

export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => {
    const { iconPrefix } = useThemeData<BaseThemeConfig>().value;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  });

export const useBlogConfig = (): ComputedRef<unknown> =>
  computed(() => {
    const { blog } = useThemeData<BaseThemeConfig>().value;

    return blog === false ? false : blog || {};
  });
