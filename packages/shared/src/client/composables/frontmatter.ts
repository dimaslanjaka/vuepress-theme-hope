import { getAuthor } from '../../shared';
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client';

import type { BaseThemeConfig, BasePageFrontMatter } from '../../shared';

export const resolveAuthor = (frontmatter: BasePageFrontMatter, fallback?: string | string[]): string[] =>
    getAuthor(frontmatter, useThemeData<BaseThemeConfig>().value, fallback);
