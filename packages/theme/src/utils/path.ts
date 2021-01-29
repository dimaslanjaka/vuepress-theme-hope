import type { RouteLocationNormalizedLoaded } from "vue-router";

export const normalizePath = (path: string): string =>
  decodeURI(path)
    .replace(/#.*$/, "")
    .replace(/(index)?\.(md|html)$/, "");

export const isActive = (
  route: RouteLocationNormalizedLoaded,
  target?: string
): boolean => {
  if (target === undefined) return false;

  if (route.hash === target) return true;

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(target);

  return currentPath === targetPath;
};
