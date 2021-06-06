import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client';
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client';
import { isLinkHttp, isString } from '@vuepress/shared';
import { useResolveRouteWithRedirect } from './resolveRouteWithRedirect';
import { resolveRepoType } from '../utils';

import type { ComputedRef } from 'vue';
import type { DefaultThemeData, NavbarItem, NavLink, NavbarGroup, ResolvedNavbarItem } from '../types';

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const useNavLink = (item: string): NavLink => {
    const resolved = useResolveRouteWithRedirect(item);

    return {
        text: resolved.meta.title ?? item,
        link: resolved.name === '404' ? item : resolved.fullPath,
    };
};

/**
 * Get navbar config of select language dropdown
 */
export const useNavbarSelectLanguage = (): ComputedRef<ResolvedNavbarItem | null> => {
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData<DefaultThemeData>();

    return computed<ResolvedNavbarItem | null>(() => {
        const localePaths = Object.keys(siteLocale.value.locales);

        // do not display language selection dropdown if there is only one language
        if (localePaths.length < 2) return null;

        const { fullPath, path } = router.currentRoute.value;
        const languageDropdown: ResolvedNavbarItem = {
            text: themeLocale.value.selectLanguageText ?? 'Unkown language',
            ariaLabel: themeLocale.value.selectLanguageAriaLabel ?? 'Unkown language',
            children: localePaths.map((targetLocalePath) => {
                // target locale config of this langauge link
                const targetSiteLocale = siteLocale.value.locales?.[targetLocalePath] ?? {};
                const targetThemeLocale = themeLocale.value.locales?.[targetLocalePath] ?? {};

                const targetLang = targetSiteLocale.lang ?? '';
                const text = targetThemeLocale.selectLanguageName ?? targetLang;

                // if the target language is current language, stay at current link
                if (targetLang === siteLocale.value.lang)
                    return {
                        text,
                        link: fullPath,
                    };

                // if the target language is not current language
                // try to link to the corresponding page of current page
                // or fallback to homepage
                const targetLocalePage = path.replace(routeLocale.value, targetLocalePath);

                return {
                    text,
                    link: router.getRoutes().some((item) => item.path === targetLocalePage)
                        ? targetLocalePage
                        : targetThemeLocale.home ?? targetLocalePath,
                };
            }),
        };

        return languageDropdown;
    });
};

/**
 * Get navbar config of repository link
 */
export const useNavbarRepo = (): ComputedRef<ResolvedNavbarItem | null> => {
    const themeLocale = useThemeLocaleData<DefaultThemeData>();
    const repoType = computed(() => resolveRepoType(themeLocale.value.repo));
    const repoLink = computed(() =>
        themeLocale.value.repo
            ? isLinkHttp(themeLocale.value.repo)
                ? `https://github.com/${themeLocale.value.repo}`
                : themeLocale.value.repo
            : null
    );

    const repoLabel = computed(() =>
        repoLink.value ? themeLocale.value.repoLabel ?? repoType.value ?? 'Source' : null
    );

    return computed(() =>
        repoLink.value && repoLabel.value
            ? {
                  text: repoLabel.value,
                  link: repoLink.value,
              }
            : null
    );
};

const resolveNavbarItem = (item: NavbarItem | NavbarGroup | string): ResolvedNavbarItem => {
    if (isString(item)) return useNavLink(item);

    if ((item as NavbarGroup).children)
        return {
            ...item,
            children: (item as NavbarGroup).children.map(resolveNavbarItem),
        };

    return item as ResolvedNavbarItem;
};

export const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
    const themeLocale = useThemeLocaleData<DefaultThemeData>();

    return computed(() => (themeLocale.value.navbar || []).map(resolveNavbarItem));
};
