import type { DocsearchPluginOptions } from '@vuepress/plugin-docsearch';
import { logger, requireResolve } from '@vuepress/utils';
import type { ThemeHopeOptions } from '../types';

/**
 * Resolve options for @vuepress/plugin-docsearch
 */
export const resolveDocsearchPluginOptions = (options: ThemeHopeOptions): DocsearchPluginOptions | boolean => {
    if (options.themePlugins?.docsearch === false) return false;

    if (!options.docsearch?.apiKey || !options.docsearch?.indexName) return false;

    // docsearch feature might not be commonly used
    // so we don't put it into dependencies of default theme
    if (requireResolve('@vuepress/plugin-docsearch') === null) {
        logger.warn(
            '[@vuepress/theme-default] if you want to enable docsearch feature, you should install @vuepress/plugin-docsearch manually'
        );

        return false;
    }

    const locales = Object.entries(options.locales || {}).reduce((result, [key, value]) => {
        const placeholder = value.docsearchPlaceholder;
        if (placeholder) {
            (result as any)[key] = {
                placeholder,
            };
        }
        return result;
    }, {});

    return {
        ...options.docsearch,
        locales,
    };
};
