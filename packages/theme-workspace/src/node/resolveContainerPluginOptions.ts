import type { ContainerPluginOptions } from "@vuepress/plugin-container";
import type { ThemeHopeOptions } from "../types";

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom blocks default title
 */
export const resolveContainerPluginOptions = (
  options: ThemeHopeOptions,
  type: "tip" | "warning" | "danger"
): ContainerPluginOptions | boolean => {
  if (options.themePlugins?.container?.[type] === false) {
    return false;
  }

  const locales = Object.entries(options.locales || {}).reduce(
    (result, [key, value]) => {
      const defaultInfo = value?.[type];
      if (defaultInfo) {
        (result as any)[key] = {
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
 * For details block
 */
export const resolveContainerPluginOptionsForDetails = (
  options: ThemeHopeOptions
): ContainerPluginOptions | boolean => {
  if (options.themePlugins?.container?.details === false) {
    return false;
  }

  return {
    type: "details",
    before: (info) =>
      `<details class="custom-block details">${
        info ? `<summary>${info}</summary>` : ""
      }\n`,
    after: () => "</details>\n",
  };
};
