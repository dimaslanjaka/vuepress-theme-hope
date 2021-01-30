import { ThemeData } from "@vuepress/client";
import { CommentOptions } from "./options";
export interface CommentPluginThemeData extends ThemeData {
  plugins?: {
    comment?: CommentOptions | false;
  };
}
