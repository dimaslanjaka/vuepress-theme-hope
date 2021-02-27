import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const componentsTheme: Theme<DefaultThemeOptions> = {
  name: "components",

  extends: "@vuepress/theme-default",

  plugins: [["@mr-hope/components"]],
};

export default componentsTheme;
