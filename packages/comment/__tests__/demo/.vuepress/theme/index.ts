import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const commentTheme: Theme<DefaultThemeOptions> = {
  name: "comment",

  plugins: [
    [
      "@mr-hope/comment",
      {
        type: "valine",
        author: "Mr.Hope",
        appId: "2vSLKb0SqFKKWEgrOPGy3sp1-gzGzoHsz",
        appKey: "vma8Ewk61WeNkI81O3CGpT2i",
      },
    ],
  ],
};

export default commentTheme;
