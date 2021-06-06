import type { ThemeConfig } from '@vuepress/core';

export * from './defaultTheme';

export interface HopeThemeOptions extends ThemeConfig {
    iconPrefix: string;
}
