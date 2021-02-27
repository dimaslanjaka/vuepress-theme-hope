import { useThemePluginConfig } from "@mr-hope/vuepress-shared/client";
import { enableValine, valineOption } from "../define";

import type { CommentPluginFrontmatter, ValineOptions } from "../../shared";

export const resolveEnablePageViews = (
  frontmatter: CommentPluginFrontmatter
): boolean => {
  const themePluginConfig = useThemePluginConfig<ValineOptions>("comment");

  if (!enableValine) return false;
  const themeConfig = themePluginConfig.value.pageviews;
  const pluginConfig = valineOption.pageviews !== false;
  const pageConfig = frontmatter.pageviews;

  return (
    // Enable in page
    Boolean(pageConfig) ||
    // Enable in plugin and not disable in theme
    (Boolean(pluginConfig) && pageConfig !== false) ||
    // not disabled in anywhere
    (themeConfig !== false && pluginConfig !== false && pageConfig !== false)
  );
};
