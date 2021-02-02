import { usePageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import { getDate } from "../utils/date";
import { getAuthor, getCategory, getTag } from "../utils/info";
import { useThemeAuthor } from "./themeConfig";

import type { PageFrontmatter } from "@vuepress/client";
import type { ComputedRef } from "vue";
import type { DateInfo, DateOptions } from "../utils/date";

export interface BasePageFrontMatter extends PageFrontmatter {
  // Basic Info
  /** Page icon */
  icon?: string;
  /** Page Author(s) */
  author?: string[] | string | false;
  /** Whether the content is original */
  original?: boolean;
  /**
   * Page Category(ies)
   */
  category?: string | string[];
  /**
   * @deprecated use `date` instead
   */
  time?: Date | string;
  /**
   * @deprecated use `category` instead
   */
  categories?: string[];
  /**
   * Page Tag(s)
   */
  tag?: string[] | string;
  /**
   * @deprecated use `tag` instead
   */
  tags?: string[];
  /**
   * Whether the page is an article
   */
  article?: boolean;
  /**
   * Page Cover
   */
  cover?: string;
  /**
   * Page Banner
   */
  banner?: string;
}

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
