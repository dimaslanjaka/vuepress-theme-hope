import type { App } from '@vuepress/core';
import type { ThemeHopeOptions } from '../types';

/**
 * Resolve options for @vuepress/plugin-debug
 */
export const resolveDebugPluginOptions = (options: ThemeHopeOptions, app: App): boolean => {
    if (options.themePlugins?.debug !== undefined) {
        return options.themePlugins.debug;
    }

    return app.env.isDev;
};
