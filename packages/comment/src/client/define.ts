import type {
  CommentOptions,
  PageInfoI18nConfig,
  ValineOptions,
} from "../shared";
import type { ReadingTimeI18nConfig } from "@mr-hope/vuepress-plugin-reading-time";

declare const READING_TIME_I18N: Record<string, ReadingTimeI18nConfig>;

declare const COMMENT_OPTIONS: CommentOptions;
declare const PAGE_INFO_I18N: Record<string, PageInfoI18nConfig>;
declare const VALINE_I18N: Record<string, string>;

export const commentOptions = COMMENT_OPTIONS;
export const pageInfoI18n = PAGE_INFO_I18N;
export const valineI18n = VALINE_I18N;

export const readingTimeI18n = READING_TIME_I18N;

export const valineOption = commentOptions as ValineOptions;

export const enableValine = Boolean(
  valineOption &&
    valineOption.type === "valine" &&
    valineOption.appId &&
    valineOption.appKey
);
