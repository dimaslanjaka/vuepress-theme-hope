import { useRouteLocale } from "@vuepress/client";
import { ComputedRef, computed } from "vue";
import { i18n } from "./define";
import { ReadingTimeI18nConfig } from "../shared";

export const useReadingTimeI18n = (
  key: keyof ReadingTimeI18nConfig
): ComputedRef<string> => computed(() => i18n[useRouteLocale().value][key]);
