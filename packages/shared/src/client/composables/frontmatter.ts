import { usePageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import { getAuthor, getCategory, getDate, getTag } from "../../common";
import { useThemeAuthor } from "./themeConfig";

import type { ComputedRef } from "vue";
import type { BasePageFrontMatter, DateInfo, DateOptions } from "../../common";

export type AuthorRef = ComputedRef<string[]>;

export const useAuthor = (): AuthorRef =>
  computed<string[]>(() => {
    const { author } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    return useThemeAuthor().value;
  });

export type CategoryRef = ComputedRef<string[]>;

export const useCategory = (): CategoryRef =>
  computed<string[]>(() => {
    const {
      categories,
      category = categories,
    } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (category) return getCategory(category);

    return [];
  });

export type TagRef = ComputedRef<string[]>;

export const useTag = (): TagRef =>
  computed<string[]>(() => {
    const {
      tags,
      tag = tags,
    } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (tag) return getTag(tag);

    return [];
  });

export type DateRef = ComputedRef<DateInfo | null>;

export const useDate = (options: DateOptions): DateRef =>
  computed<DateInfo | null>(() => {
    const {
      time,
      date = time,
    } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (date) return getDate(date, options);

    return null;
  });
