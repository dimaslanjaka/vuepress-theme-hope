import type { MediumZoomPluginOptions } from "@vuepress/plugin-medium-zoom";
import type { ThemeHopeOptions } from "../types";

/**
 * Resolve options for @vuepress/plugin-medium-zoom
 */
export const resolveMediumZoomPluginOptions = (
  themePlugins: ThemeHopeOptions
): MediumZoomPluginOptions | boolean => {
  if (themePlugins?.mediumZoom === false) {
    return false;
  }

  return {
    selector: ".theme-default-content :not(a) > img",
    zoomOptions: {},
    delay: 300,
  };
};
