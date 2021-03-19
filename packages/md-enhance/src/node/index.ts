import { path } from "@vuepress/utils";
import { codeDemoDefaultSetting } from "./markdown-it/code-demo";
// import flowchart from "./markdown-it/flowchart";
import footnote from "./markdown-it/footnote";
import katex from "./markdown-it/katex";
import mark from "./markdown-it/mark";
// import presentation from "./markdown-it/presentation";
import sub from "./markdown-it/sub";
import sup from "./markdown-it/sup";
import { resolvePlugin } from "./resolvePlugin";

import type { Plugin, PluginObject } from "@vuepress/core";
import type { MarkdownEnhanceOptions } from "../shared";

export {
  CodeDemoGlobalOptions,
  CodeDemoOptions,
  MarkdownEnhanceOptions,
  PresentationOptions,
  RevealPlugin,
} from "../shared";

const markdownEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (option, app) => {
  const { themeConfig } = app.options;
  const markdownOption =
    Object.keys(option).length === 0
      ? (themeConfig.mdEnhance as MarkdownEnhanceOptions) || {}
      : option;

  return {
    name: "md-enhance",

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_OPTIONS: markdownOption,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof markdownOption.demo === "boolean"
          ? {}
          : markdownOption.demo),
      },
      REVEAL_PLUGINS:
        typeof markdownOption.presentation === "object" &&
        Array.isArray(markdownOption.presentation.plugins)
          ? markdownOption.presentation.plugins
          : [],
      REVEAL_CONFIG:
        typeof markdownOption.presentation === "object" &&
        typeof markdownOption.presentation.revealConfig === "object"
          ? markdownOption.presentation.revealConfig
          : {},
    }),

    clientAppSetupFiles: path.resolve(__dirname, "./clientAppSetup.js"),
    clientAppEnhanceFiles: path.resolve(__dirname, "./clientAppEnhance.js"),

    extendsMarkdown: (markdownIt): void => {
      if (markdownOption.sup || markdownOption.enableAll) markdownIt.use(sup);
      if (markdownOption.sub || markdownOption.enableAll) markdownIt.use(sub);
      if (markdownOption.footnote || markdownOption.enableAll)
        markdownIt.use(footnote);
      if (markdownOption.mark || markdownOption.enableAll) markdownIt.use(mark);
      // if (markdownOption.flowchart || markdownOption.enableAll)
      //   // @ts-ignore
      //   markdownIt.use(flowchart);
      if (markdownOption.tex || markdownOption.enableAll)
        markdownIt.use(katex, [
          {
            macros: {
              // support more symbols
              "\\liiiint": "\\int\\!\\!\\!\\iiint",
              "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
              "\\idotsint": "\\int\\!\\cdots\\!\\int",
            },
          },
        ]);
      // if (markdownOption.presentation || markdownOption.enableAll)
      //   // @ts-ignore
      //   markdownIt.use(presentation);
    },

    plugins: resolvePlugin(markdownOption, themeConfig),
  } as PluginObject;
};

export default markdownEnhancePlugin;
