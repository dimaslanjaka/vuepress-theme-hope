import { lang2Path } from "@mr-hope/vuepress-shared";
import { codeDemoRender } from "./markdown-it/code-demo";
import { i18n } from "./i18n";

import type { PluginConfig, ThemeConfig } from "@vuepress/core";
import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { MarkdownEnhanceOptions } from "../shared";

export const resolvePlugin = (
  markdownOption: MarkdownEnhanceOptions,
  themeConfig: ThemeConfig
): PluginConfig[] => {
  const baseLang =
    markdownOption.baseLang || (themeConfig.baseLang as string) || "en-US";
  const baseLangPath = lang2Path(baseLang);

  const resolveConfig = (
    titleConfig: PluginI18nConvert<string>
  ): PluginI18nConvert<string> => {
    titleConfig["/"] = titleConfig[baseLangPath];

    return titleConfig;
  };

  const config: PluginConfig[] = [
    [
      "@vuepress/container",
      { type: "info", defaultTitle: resolveConfig(i18n.info) },
    ],
    [
      "@vuepress/container",
      { type: "tip", defaultTitle: resolveConfig(i18n.tip) },
    ],
    [
      "@vuepress/container",
      { type: "warning", defaultTitle: resolveConfig(i18n.warning) },
    ],
    [
      "@vuepress/container",
      { type: "danger", defaultTitle: resolveConfig(i18n.danger) },
    ],
    [
      "@vuepress/container",
      {
        type: "details",
        before: (info: string): string =>
          `<details class="custom-block details"><summary>${
            info || "Details"
          }</summary>\n`,
        after: (): string => "</details>\n",
      },
    ],
  ];

  if (markdownOption.align || markdownOption.enableAll)
    config.push(
      ["@vuepress/container", { type: "left", defaultTitle: "" }],
      ["@vuepress/container", { type: "center", defaultTitle: "" }],
      ["@vuepress/container", { type: "right", defaultTitle: "" }],
      ["@vuepress/container", { type: "justify", defaultTitle: "" }]
    );

  if (markdownOption.demo || markdownOption.enableAll)
    config.push([
      "@vuepress/container",
      { type: "demo", render: codeDemoRender },
    ]);

  return config;
};
