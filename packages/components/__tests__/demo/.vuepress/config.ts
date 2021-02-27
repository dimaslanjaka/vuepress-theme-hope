import { resolve } from "path";
import type { UserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const config: UserConfig<DefaultThemeOptions> = {
  base: process.env.VuePress_BASE || "/",

  title: "Comment Plugin",

  description: "Comment Plugin for VuePress",

  dest: "./dist",

  themeConfig: {
    logo: "/logo.svg",

    navbar: [
      { text: "Home", link: "/" },
      {
        text: "Test",
        children: [{ text: "Test", link: "/test/" }],
      },
    ],
  },

  plugins: [["@mr-hope/components"]],
};

export default config;
