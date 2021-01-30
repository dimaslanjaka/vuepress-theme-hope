import type { PageInfoI18nConfig } from "./pageInfo";
import "./declare";
import { CommentOptions } from "./options";

export * from "./frontmatter";
export * from "./options";
export * from "./pageInfo";
export * from "./themeData";

declare global {
  const COMMENT_OPTIONS: CommentOptions;
  const PAGE_INFO_I18N: Record<string, PageInfoI18nConfig>;
  const VALINE_I18N: Record<string, string>;
}
