import type { ActiveHeaderLinksPluginOptions } from '@vuepress/plugin-active-header-links';
import type { ThemeHopeOptions } from '../types';

/**
 * Resolve options for @vuepress/plugin-active-header-links
 */
export const resolveActiveHeaderLinksPluginOptions = (
    options: ThemeHopeOptions
): ActiveHeaderLinksPluginOptions | boolean => {
    if (options.themePlugins?.activeHeaderLinks === false) return false;

    return {
        headerLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
    };
};
