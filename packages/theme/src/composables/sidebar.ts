import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";

import {
  isArray,
  isPlainObject,
  isString,
  resolveLocalePath,
} from "@vuepress/shared";
import { useNavLink } from "./navbar";

import type { ComputedRef, InjectionKey } from "vue";
import type { PageHeader } from "@vuepress/client";
import type {
  DefaultThemeData,
  DefaultThemePageFrontmatter,
  SidebarConfigArray,
  SidebarConfigObject,
  ResolvedSidebarItem,
} from "../types";

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>;

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> = Symbol.for(
  "sidebarItems"
);

/**
 * Inject sidebar items global computed
 */
export const useSidebarItems = (): SidebarItemsRef => {
  const sidebarItems = inject(sidebarItemsSymbol);

  if (!sidebarItems)
    throw new Error("useSidebarItems() is called without provider.");

  return sidebarItems;
};

/**
 * Util to transform page header to sidebar item
 */
export const headerToSidebarItem = (
  header: PageHeader
): ResolvedSidebarItem => ({
  text: header.title,
  link: `#${header.slug}`,
  children: header.children.map(headerToSidebarItem),
});

/**
 * Resolve sidebar items if the config is `auto`
 */
export const resolveAutoSidebarItems = (): ResolvedSidebarItem[] => {
  const page = usePageData();

  return [
    {
      isGroup: true,
      text: page.value.title,
      children: page.value.headers.map(headerToSidebarItem),
    },
  ];
};

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarConfigArray
): ResolvedSidebarItem[] => {
  const route = useRoute();
  const page = usePageData();

  return sidebarConfig.map(
    (item): ResolvedSidebarItem => {
      if (isString(item)) return useNavLink(item);

      if (!item.isGroup) return item as ResolvedSidebarItem;

      return {
        ...item,
        children: item.children.map(
          (subItem): ResolvedSidebarItem => {
            const childItem: ResolvedSidebarItem = isString(subItem)
              ? useNavLink(subItem)
              : (subItem as ResolvedSidebarItem);

            // if the sidebar item is current page and children is not set
            // use headers of current page as children
            if (
              childItem.link === route.path &&
              childItem.children === undefined
            )
              return {
                ...childItem,
                children: page.value.headers.map(headerToSidebarItem),
              };

            return childItem;
          }
        ),
      };
    }
  );
};

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (
  sidebarConfig: SidebarConfigObject
): ResolvedSidebarItem[] => {
  const route = useRoute();
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path);
  const matchedSidebarConfig = sidebarConfig[sidebarPath] ?? [];

  return resolveArraySidebarItems(matchedSidebarConfig);
};

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = (
  frontmatter: DefaultThemePageFrontmatter,
  themeLocale: DefaultThemeData
): ResolvedSidebarItem[] => {
  // get sidebar config from frontmatter > themeConfig
  const sidebarConfig = frontmatter.sidebar ?? themeLocale.sidebar ?? "auto";

  // resolve sidebar items according to the config
  return frontmatter.home === true || sidebarConfig === false
    ? []
    : sidebarConfig === "auto"
    ? resolveAutoSidebarItems()
    : isArray(sidebarConfig)
    ? resolveArraySidebarItems(sidebarConfig)
    : isPlainObject(sidebarConfig)
    ? resolveMultiSidebarItems(sidebarConfig)
    : [];
};
