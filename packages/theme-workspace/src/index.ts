import type { Theme } from '@vuepress/core';
import { path } from '@vuepress/utils';
import {
    assignDefaultOptions,
    resolveActiveHeaderLinksPluginOptions,
    resolveContainerPluginOptions,
    resolveContainerPluginOptionsForDetails,
    resolveDebugPluginOptions,
    resolveDocsearchPluginOptions,
    resolveGitPluginOptions,
    resolveMediumZoomPluginOptions,
    resolvePaletteStylusPluginOptions,
} from './node';
import type { ThemeHopeOptions } from './types';

export * from './node';
export * from './types';

export const defaultTheme: Theme<ThemeHopeOptions> = (options, app) => {
    assignDefaultOptions(options);

    const docsearchOptions = resolveDocsearchPluginOptions(options);

    return {
        name: '@vuepress/theme-default',

        layouts: path.resolve(__dirname, './layouts'),

        clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.ts'),

        clientAppSetupFiles: path.resolve(__dirname, './clientAppSetup.ts'),

        define: {
            // to determine if we have to register a mock `<Docsearch>` component
            DOCSEARCH_ENABLE: docsearchOptions !== false,
        },

        // use the relative file path to generate edit link
        extendsPageData: ({ filePathRelative }) => ({ filePathRelative }),

        plugins: [
            ['@vuepress/active-header-links', resolveActiveHeaderLinksPluginOptions(options)],
            ['@vuepress/back-to-top', options.themePlugins?.backToTop !== false],
            ['@vuepress/container', resolveContainerPluginOptions(options, 'tip')],
            ['@vuepress/container', resolveContainerPluginOptions(options, 'warning')],
            ['@vuepress/container', resolveContainerPluginOptions(options, 'danger')],
            ['@vuepress/container', resolveContainerPluginOptionsForDetails(options)],
            ['@vuepress/debug', resolveDebugPluginOptions(options, app)],
            ['@vuepress/docsearch', docsearchOptions],
            ['@vuepress/git', resolveGitPluginOptions(options)],
            ['@vuepress/medium-zoom', resolveMediumZoomPluginOptions(options)],
            ['@vuepress/nprogress', options.themePlugins?.nprogress !== false],
            ['@vuepress/palette-stylus', resolvePaletteStylusPluginOptions()],
        ],
    };
};

export default defaultTheme;
