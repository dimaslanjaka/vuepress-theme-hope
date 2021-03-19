import FlowChart from "./FlowChart";
// import Presentation from "./Presentation.vue";

import "./styles/index.scss";

import type { ClientAppEnhance } from "@vuepress/client";
import type { MarkdownEnhanceOptions } from "../shared";

declare const MARKDOWN_ENHANCE_OPTIONS: MarkdownEnhanceOptions;

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  if (MARKDOWN_ENHANCE_OPTIONS.align || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    void import("./styles/align.scss");
  if (MARKDOWN_ENHANCE_OPTIONS.footnote || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    void import("./styles/footnote.scss");
  if (MARKDOWN_ENHANCE_OPTIONS.tex || MARKDOWN_ENHANCE_OPTIONS.enableAll) {
    void import("./styles/tex.scss");
    void import("katex/dist/katex.min.css");
  }
  if (
    MARKDOWN_ENHANCE_OPTIONS.flowchart ||
    MARKDOWN_ENHANCE_OPTIONS.enableAll
  ) {
    void import("./styles/flowchart.scss");

    app.component("FlowChart", FlowChart);
  }
  // if (
  //   MARKDOWN_ENHANCE_OPTIONS.presentation ||
  //   MARKDOWN_ENHANCE_OPTIONS.enableAll
  // )
  //   app.component("Presentation", Presentation);
};

export default clientAppEnhance;
