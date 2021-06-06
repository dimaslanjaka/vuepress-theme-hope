import type { ThemeHopeOptions, DefaultThemeLocaleData } from '../types';

const defaultOptions: ThemeHopeOptions = {
    // navbar
    navbar: [],
    selectLanguageText: 'Languages',
    selectLanguageAriaLabel: 'Select language',

    // sidebar
    sidebar: 'auto',

    // page meta
    editLink: true,
    editLinkText: 'Edit this page',
    lastUpdated: true,
    lastUpdatedText: 'Last Updated',
    contributors: true,
    contributorsText: 'Contributors',

    // 404 page messages
    notFound: [
        `There's nothing here.`,
        `How did we get here?`,
        `That's a Four-Oh-Four.`,
        `Looks like we've got some broken links.`,
    ],
    backToHome: 'Take me home',

    // `<OutboundLink>` sr-only
    openInNewWindow: 'open in new window',
};

const defaultLocaleData: DefaultThemeLocaleData = {
    // navbar
    selectLanguageName: 'English',

    // custom block
    danger: 'WARNING',
};

/**
 * Assign default options to `themeConfig`
 */
export const assignDefaultOptions = (options: ThemeHopeOptions): void => {
    if (!options.locales) {
        options.locales = {};
    }

    if (!options.locales['/']) options.locales['/'] = {};

    Object.assign(options, {
        ...defaultOptions,
        ...options,
    });

    Object.assign(options.locales['/'], {
        ...defaultLocaleData,
        ...options.locales['/'],
    });
};
