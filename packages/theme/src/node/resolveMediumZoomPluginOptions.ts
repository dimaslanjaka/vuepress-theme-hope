import type { MediumZoomPluginOptions } from "@vuepress/plugin-medium-zoom";
import type { ThemeHopeOptions } from "../types";

/**
 * Resolve options for @vuepress/plugin-medium-zoom
 */
export const resolveMediumZoomPluginOptions = (
  options: ThemeHopeOptions
): MediumZoomPluginOptions | boolean => {
  if (options.themePlugins?.mediumZoom === false) {
    return false;
  }

  return {
    selector: ".theme-default-content :not(a) > img",
    options: {},
    delay: 300,
  };
};
