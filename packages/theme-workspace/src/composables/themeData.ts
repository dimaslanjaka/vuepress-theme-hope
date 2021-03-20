import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/lib/composables";
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/lib/composables";
import type { DefaultThemeLocaleData, ThemeHopeOptions } from "../types";

export const useThemeData = (): ThemeDataRef<ThemeHopeOptions> =>
  _useThemeData<ThemeHopeOptions>();
export const useThemeLocaleData = (): ThemeLocaleDataRef<DefaultThemeLocaleData> =>
  _useThemeLocaleData<DefaultThemeLocaleData>();
