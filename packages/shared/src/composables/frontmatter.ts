import { usePageFrontmatter, PageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import type { ComputedRef } from "vue";

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

export const useAuthor = (fallback?: string): AuthorRef => {
  const { author } = usePageFrontmatter<BasePageFrontMatter>().value;

  return computed<string[]>(() => {
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
};

export type CategoryRef = ComputedRef<string[]>;

export const useCategory = (fallback?: string): CategoryRef => {
  const { category } = usePageFrontmatter<BasePageFrontMatter>().value;

  return computed<string[]>(() => {
    if (category) {
      if (Array.isArray(category)) return category;
      if (typeof category === "string") return [category];

      console.error(
        `Expect 'category' to be \`string[] | string | undefined\`, but got`,
        category
      );

      return [];
    }

    if (!fallback) return [];
    if (Array.isArray(fallback)) return fallback;
    if (typeof fallback === "string") return [fallback];

    console.error(
      "Expect category fallback to be `string[] | string | undefined`, but got",
      fallback
    );

    return [];
  });
};
