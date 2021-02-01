import { capitalize } from "@mr-hope/vuepress-shared";
import { usePageFrontmatter, PageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import { getDate } from "./date";

import type { ComputedRef } from "vue";
import type { DateInfo, DateOptions } from "./date";

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
   * Page Banner
   */
  banner?: string;
}

export type AuthorRef = ComputedRef<string[]>;

export const useAuthor = (fallback?: string): AuthorRef =>
  computed<string[]>(() => {
    const { author } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (author) {
      if (Array.isArray(author)) return author;
      if (typeof author === "string") return [author];

      console.error(
        `Expect 'author' to be \`string[] | string | false | undefined\`, but got`,
        author
      );

      return [];
    }

    if (author === false || !fallback) return [];

    if (Array.isArray(fallback)) return fallback;
    if (typeof fallback === "string") return [fallback];

    console.error(
      "Expect author fallback to be `string[] | string | undefined`, but got",
      fallback
    );

    return [];
  });

export type CategoryRef = ComputedRef<string[]>;

export const getCategory = (
  category: string[] | string | undefined
): string[] => {
  if (category) {
    if (Array.isArray(category)) return category.map(capitalize);
    if (typeof category === "string") return [capitalize(category)];

    console.error(
      `Expect 'category' to be \`string[] | string | undefined\`, but got`,
      category
    );
  }

  return [];
};

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

export const getTag = (tag: string[] | string | undefined): string[] => {
  if (tag) {
    if (Array.isArray(tag)) return tag;
    if (typeof tag === "string") return [tag];

    console.error(
      `Expect 'tag' to be \`string[] | string | undefined\`, but got`,
      tag
    );
  }

  return [];
};

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
