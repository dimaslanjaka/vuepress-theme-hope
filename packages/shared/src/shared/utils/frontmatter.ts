import { getDate } from "./date";
import { _getAuthor, getCategory, getTag } from "./info";

import type { ComputedRef } from "vue";
import type { DateInfo, DateOptions } from "./date";
import type { BasePageFrontMatter, BaseThemeConfig } from "../types";

export const getAuthor = (
  frontmatter: BasePageFrontMatter,
  themeConfig: BaseThemeConfig,
  fallback?: string | string[]
): string[] => {
  const { author } = frontmatter;

  if (author) return _getAuthor(author);
  if (author === false) return [];

  if (fallback) return _getAuthor(fallback, false);

  return _getAuthor(themeConfig.author, false);
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
