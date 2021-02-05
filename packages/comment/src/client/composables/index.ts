import { useThemePluginConfig } from "@mr-hope/vuepress-shared/client";
import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import { ComputedRef, computed } from "vue";
import {
  enableValine,
  pageInfoI18n,
  valineI18n,
  valineOption,
} from "../define";

import type {
  CommentPluginFrontmatter,
  PageInfoI18nConfig,
  ValineOptions,
} from "../../shared";

export const usePageInfoI18n = (
  key: keyof PageInfoI18nConfig
): ComputedRef<string> =>
  computed(() => {
    const routeLocale = useRouteLocale();

    return pageInfoI18n[routeLocale.value][key];
  });

export const useValineI18n = (): ComputedRef<string> =>
  computed(() => {
    const routeLocale = useRouteLocale();

    return valineI18n[routeLocale.value];
  });

export const useEnablePageViews = (): ComputedRef<boolean> =>
  computed(() => {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const themePluginConfig = useThemePluginConfig<ValineOptions>("comment");

    if (!enableValine) return false;
    const themeConfig = themePluginConfig.value.pageviews;
    const pluginConfig = valineOption.pageviews !== false;
    const pageConfig = frontmatter.value.pageviews;

    return (
      // Enable in page
      Boolean(pageConfig) ||
      // Enable in plugin and not disable in theme
      (Boolean(pluginConfig) && pageConfig !== false) ||
      // not disabled in anywhere
      (themeConfig !== false && pluginConfig !== false && pageConfig !== false)
    );
  });
