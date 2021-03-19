declare module "*.vue" {
  import type { ComponentOptions } from "vue";

  const component: ComponentOptions;

  export default component;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@vuepress/markdown/lib/lineNumbers" {
  import MarkdownIt = require("markdown-it");
  const lineNumbers: (md: MarkdownIt) => void;

  export = lineNumbers;
}

declare module "reveal.js/plugin/highlight/highlight.esm.js" {
  const highlightPlugin: any;

  export default highlightPlugin;
}

declare module "reveal.js/plugin/markdown/markdown.esm.js" {
  const markdownPlugin: any;

  export default markdownPlugin;
}

declare module "reveal.js/plugin/math/math.esm.js" {
  const mathPlugin: any;

  export default mathPlugin;
}

declare module "reveal.js/plugin/search/search.esm.js" {
  const searchPlugin: any;

  export default searchPlugin;
}

declare module "reveal.js/plugin/notes/notes.esm.js" {
  const notesPlugin: any;

  export default notesPlugin;
}

declare module "reveal.js/plugin/zoom/zoom.esm.js" {
  const zoomPlugin: any;

  export default zoomPlugin;
}

declare module "reveal.js-plugins/anything/anything.js" {
  const anythingPlugin: any;

  export default anythingPlugin;
}

declare module "reveal.js-plugins/audio-slideshow/audio-slideshow.js" {
  const audioPlugin: any;

  export default audioPlugin;
}

declare module "reveal.js-plugins/chalkboard/chalkboard.js" {
  const chalkboardPlugin: any;

  export default chalkboardPlugin;
}

declare module "*.scss" {
  const content: undefined;

  export default content;
}

declare module "*.styl" {
  const content: undefined;

  export default content;
}

declare module "*.css" {
  const content: undefined;

  export default content;
}

interface Window {
  // eslint-disable-next-line
  Babel: {
    transform: (
      code: string,
      options: {
        presets?: string[];
      }
    ) => { code: string };
  };
  ReactDOM: {
    render: (reactElement: any, element: HTMLElement) => void;
  };
  Vue: any;
}
