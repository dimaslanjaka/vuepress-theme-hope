import FlowChart from "./components/FlowChart";
import Presentation from "./components/Presentation";

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
    app.component("FlowChart", FlowChart);
    void import("./styles/flowchart.scss");
  }
  if (
    MARKDOWN_ENHANCE_OPTIONS.presentation ||
    MARKDOWN_ENHANCE_OPTIONS.enableAll
  ) {
    app.component("Presentation", Presentation);
    void import("./styles/slides.scss");
    void import("./styles/theme/fonts/league-gothic/league-gothic.css");
    void import("./styles/theme/fonts/source-sans-pro/source-sans-pro.css");
  }
};

export default clientAppEnhance;
