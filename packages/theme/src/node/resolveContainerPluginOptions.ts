import type { ContainerPluginOptions } from "@vuepress/plugin-container";
import type { DefaultThemePluginsOptions, DefaultThemeData } from "../types";

import type { LocaleConfig } from "@vuepress/core";

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom containers default title
 */
export const resolveContainerPluginOptions = (
  themePlugins: DefaultThemePluginsOptions,
  localeOptions: DefaultThemeData,
  type: "tip" | "warning" | "danger"
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.[type] === false) {
    return false;
  }

  const locales = Object.entries(localeOptions.locales || {}).reduce(
    (result: LocaleConfig<{ defaultInfo: string }>, [key, value]) => {
      const defaultInfo = value?.[type];
      if (defaultInfo) {
        result[key] = {
          defaultInfo,
        };
      }
      return result;
    },
    {}
  );

  return {
    type,
    locales,
  };
};

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For details container
 */
export const resolveContainerPluginOptionsForDetails = (
  themePlugins: DefaultThemePluginsOptions
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.details === false) {
    return false;
  }

  return {
    type: "details",
    before: (info): string =>
      `<details class="custom-container details">${
        info ? `<summary>${info}</summary>` : ""
      }\n`,
    after: (): string => "</details>\n",
  };
};

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For code-group container
 */
export const resolveContainerPluginOptionsForCodeGroup = (
  themePlugins: DefaultThemePluginsOptions
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.codeGroup === false) {
    return false;
  }

  return {
    type: "code-group",
    before: (): string => `<CodeGroup>\n`,
    after: (): string => "</CodeGroup>\n",
  };
};

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For code-group-item block
 */
export const resolveContainerPluginOptionsForCodeGroupItem = (
  themePlugins: DefaultThemePluginsOptions
): ContainerPluginOptions | boolean => {
  if (themePlugins?.container?.codeGroupItem === false) {
    return false;
  }

  return {
    type: "code-group-item",
    before: (info): string => `<CodeGroupItem title="${info}">\n`,
    after: (): string => "</CodeGroupItem>\n",
  };
};
