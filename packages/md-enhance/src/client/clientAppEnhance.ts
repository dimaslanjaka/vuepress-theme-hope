// import FlowChart from "./FlowChart.vue";
// import Presentation from "./Presentation.vue";

// import "./styles/container.styl";

import type { ClientAppEnhance } from "@vuepress/client";

const clientAppEnhance: ClientAppEnhance = () => {
  // if (MARKDOWN_ENHANCE_OPTIONS.align || MARKDOWN_ENHANCE_OPTIONS.enableAll)
  //   void import("vuepress-plugin-md-enhance/client/styles/align.styl");
  // if (MARKDOWN_ENHANCE_OPTIONS.footnote || MARKDOWN_ENHANCE_OPTIONS.enableAll)
  //   void import("vuepress-plugin-md-enhance/client/styles/footnote.styl");
  if (MARKDOWN_ENHANCE_OPTIONS.tex || MARKDOWN_ENHANCE_OPTIONS.enableAll) {
    void import("./styles/tex.scss");
    void import("katex/dist/katex.min.css");
  }
  // if (MARKDOWN_ENHANCE_OPTIONS.flowchart || MARKDOWN_ENHANCE_OPTIONS.enableAll)
  //   app.component("FlowChart", FlowChart);
  // if (
  //   MARKDOWN_ENHANCE_OPTIONS.presentation ||
  //   MARKDOWN_ENHANCE_OPTIONS.enableAll
  // )
  //   app.component("Presentation", Presentation);
};

export default clientAppEnhance;
