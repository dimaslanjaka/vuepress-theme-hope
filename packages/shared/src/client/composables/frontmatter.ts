import { getAuthor, getCategory, getDate, getTag } from "../../shared";
import { useThemeAuthor } from "./themeConfig";

import type { ComputedRef } from "vue";
import type { BasePageFrontMatter, DateInfo, DateOptions } from "../../shared";

export const resolveAuthor = (
  frontmatter: BasePageFrontMatter,
  fallback?: string | string[]
): string[] => {
  const { author } = frontmatter;

  if (author) return getAuthor(author);
  if (author === false) return [];

  if (fallback) return getAuthor(fallback, false);

  return useThemeAuthor().value;
};

export type CategoryRef = ComputedRef<string[]>;

export const resolveCategory = (frontmatter: BasePageFrontMatter): string[] => {
  const { categories, category = categories } = frontmatter;

  if (category) return getCategory(category);

  return [];
};

export const resolveTag = (frontmatter: BasePageFrontMatter): string[] => {
  const { tags, tag = tags } = frontmatter;

  if (tag) return getTag(tag);

  return [];
};

export const resolveDate = (
  frontmatter: BasePageFrontMatter,
  options: DateOptions
): DateInfo | null => {
  const { time, date = time } = frontmatter;

  if (date) return getDate(date, options);

  return null;
};
