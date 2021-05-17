import { computed } from "vue";
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";

import type { ComputedRef } from "vue";
import type {
  ThemeHopeOptions,
  ThemeHopePageData,
  NavLink as NavLinkType,
} from "../types";
import { resolveEditLink } from "../utils";

export const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData<ThemeHopeOptions>();
  const page = usePageData<ThemeHopePageData>();
  const frontmatter = usePageFrontmatter();

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true;

    if (!showEditLink) return null;

    const {
      repo,
      docsRepo = repo,
      docsBranch = "master",
      docsDir = "",
      editLinkText,
    } = themeLocale.value;

    if (!docsRepo) return null;

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    });

    if (!editLink) return null;

    return {
      text: editLinkText ?? "Edit this page",
      link: editLink,
    };
  });
};

export const useLastUpdated = (): ComputedRef<null | string> => {
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData<ThemeHopeOptions>();
  const page = usePageData<ThemeHopePageData>();
  const frontmatter = usePageFrontmatter();

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true;

    if (!showLastUpdated) return null;

    if (!page.value.git?.updatedTime) return null;

    const updatedDate = new Date(page.value.git?.updatedTime);

    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};

export const useContributors = (): ComputedRef<
  null | Required<ThemeHopePageData["git"]>["contributors"]
> => {
  const themeLocale = useThemeLocaleData<ThemeHopeOptions>();
  const page = usePageData<ThemeHopePageData>();
  const frontmatter = usePageFrontmatter();

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true;

    if (!showContributors) return null;

    return page.value.git?.contributors ?? null;
  });
};
