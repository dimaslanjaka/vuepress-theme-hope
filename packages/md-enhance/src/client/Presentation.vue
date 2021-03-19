<template>
  <div
    ref="presentation"
    class="md-presentation reveal reveal-viewport"
    :class="{ loading }"
  >
    <Loading v-if="loading" class="md-presentation-loading-icon" />
    <div v-show="!loading" class="slides">
      <section
        data-markdown
        data-separator="^\r?\n---\r?\n$"
        data-separator-vertical="^\r?\n--\r?\n$"
      >
        <script type="text/template">
          {{code}}
        </script>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import type { PropType } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import Loading from "./icons/LoadingIcon.vue";

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

  components: { Loading },

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
    theme: { type: String as PropType<ThemeType>, default: "auto" },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter();
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

    return {
      loading,
      presentation,
    };
  },
});
</script>
