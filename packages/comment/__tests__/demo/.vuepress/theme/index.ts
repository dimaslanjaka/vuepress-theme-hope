import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const commentTheme: Theme<DefaultThemeOptions> = {
  name: "comment",

  extends: "@vuepress/theme-default",

  plugins: [
    [
      "@mr-hope/comment",
      {
        type: "valine",
        author: "Mr.Hope",
        appId: "GG2VSnGiz09Rx18y2OUzdaHS-gzGzoHsz",
        appKey: "fBf2dptTBHxNqALKrzUlBXeB",
      },
    ],
  ],
};

export default commentTheme;
