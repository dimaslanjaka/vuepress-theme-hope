import type { UserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const config: UserConfig<DefaultThemeOptions> = {
  base: "/add-this/",
  dest: "./dist",

  locales: {
    "/": {
      title: "Share Plugin",
      description: "Share Plugin provided by AddThis",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "分享插件",
      description: "由 AddThis 提供的分享插件",
    },
  },

  theme: "hope",

  /** 主题配置 */
  themeConfig: {
    logo: "/logo.svg",
    // hostname: "https://vuepress-theme-hope.github.io",

    // author: "Mr.Hope",
    // iconPrefix: "vuepress-",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsDir: "docs/add-this/src",

    locales: {
      "/": {
        nav: [
          { text: "Home", icon: "home", link: "/" },
          {
            text: "Guide",
            icon: "creative",
            link: "/guide/",
          },
          {
            text: "Config",
            icon: "config",
            link: "/config/",
          },
        ],
      },

      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          {
            text: "指南",
            icon: "creative",
            link: "/zh/guide/",
          },
          {
            text: "配置",
            icon: "config",
            link: "/zh/config/",
          },
        ],
        lang: "zh-CN",
        selectLanguageText: "选择语言",
        selectLanguageAriaLabel: "选择语言",
        lastUpdatedText: "上次编辑于",
        selectLanguageName: "简体中文",
      },
    },
  },

  plugins: [["add-this", { pubid: "ra-601bf7e7c332daca" }]],
};

export default config;
