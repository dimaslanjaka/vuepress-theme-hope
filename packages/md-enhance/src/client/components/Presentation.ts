import { defineComponent, h, onMounted, ref } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import { loadingIcon } from "./loading";

import type { RevealOptions } from "reveal.js";
import type { PropType, VNode } from "vue";

declare const REVEAL_CONFIG: Partial<RevealOptions>;
declare const REVEAL_PLUGINS: string[];

export const revealConfig = REVEAL_CONFIG;
export const revealPlugins = REVEAL_PLUGINS;

type ThemeType =
  | "auto"
  | "black"
  | "white"
  | "league"
  | "beige"
  | "sky"
  | "night"
  | "serif"
  | "simple"
  | "solarized"
  | "blood"
  | "moon";

export default defineComponent({
  name: "Presentation",

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
    theme: { type: String as PropType<ThemeType>, default: "auto" },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<{ reveal: RevealOptions }>();
    const loading = ref(false);
    const presentation = ref<HTMLElement | null>(null);

    onMounted(() => {
      (presentation.value as HTMLElement).setAttribute("id", props.id);
      const revealElement = document.querySelector(`#${props.id}`);

      if (revealElement) {
        revealElement.setAttribute("theme", props.theme);

        const promises = [import(/* webpackChunkName: "reveal" */ "reveal.js")];

        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/markdown/markdown.esm.js"
          )
        );

        if (REVEAL_PLUGINS.includes("highlight"))
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/highlight/highlight.esm.js"
            )
          );

        if (REVEAL_PLUGINS.includes("math"))
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/math/math.esm.js"
            )
          );

        if (REVEAL_PLUGINS.includes("search"))
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/search/search.esm.js"
            )
          );

        if (REVEAL_PLUGINS.includes("notes"))
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/notes/notes.esm.js"
            )
          );

        if (REVEAL_PLUGINS.includes("zoom"))
          promises.push(
            import(
              /* webpackChunkName: "reveal" */ "reveal.js/plugin/zoom/zoom.esm.js"
            )
          );

        // if (REVEAL_PLUGINS.includes("anything"))
        //   promises.push(
        //     import(
        //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/anything/anything.js"
        //     )
        //   );

        // if (REVEAL_PLUGINS.includes("audio"))
        //   promises.push(
        //     import(
        //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/audio-slideshow/audio-slideshow.js"
        //     )
        //   );

        // if (REVEAL_PLUGINS.includes("chalkboard"))
        //   promises.push(
        //     import(
        //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/chalkboard/chalkboard.js"
        //     )
        //   );

        void Promise.all(promises).then(([revealJS, ...plugins]) => {
          const reveal = new revealJS.default(revealElement as HTMLElement, {
            plugins: plugins.map((plugin) => plugin.default),
          });

          void reveal
            .initialize({
              slideNumber: true,
              ...REVEAL_CONFIG,
              ...(frontmatter.value.reveal || {}),
              embedded: frontmatter.value.layout !== "Slide",
            })
            .then(() => {
              loading.value = false;
            });
        });
      }
    });

    return (): VNode =>
      h(
        "div",
        {
          class: {
            "md-presentation": true,
            reveal: true,
            "reveal-viewport": true,
            loading: loading.value,
          },
          ref: presentation,
        },
        [
          h("div", { innerHTML: loading.value ? loadingIcon : "" }),
          h("div", {
            style: { display: loading.value ? "none" : "block" },
            innerHTML: `<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${props.code}</script></section>`,
          }),
        ]
      );
  },
});
