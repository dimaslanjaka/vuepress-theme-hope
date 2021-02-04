import { useRouteLocale } from "@vuepress/client";
import { ComputedRef, computed } from "vue";
import { ReadingTimeI18nConfig } from "../common";

export const useReadingTimeI18n = (
  key: keyof ReadingTimeI18nConfig
): ComputedRef<string> =>
  computed(() => READING_TIME_I18N[useRouteLocale().value][key]);
