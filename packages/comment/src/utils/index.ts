import type { ValineOptions } from "../types";

export const commentOptions = COMMENT_OPTIONS;
export const pageInfoI18n = PAGE_INFO_I18N;
export const valineI18n = VALINE_I18N;

export const valineOption = commentOptions as ValineOptions;

export const enableValine = Boolean(
  valineOption &&
    valineOption.type === "valine" &&
    valineOption.appId &&
    valineOption.appKey
);
