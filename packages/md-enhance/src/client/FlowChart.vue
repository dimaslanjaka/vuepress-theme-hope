<template>
  <div :class="{ loading }" class="md-flowchart">
    <Loading v-if="loading" class="md-flowchart-loading-icon" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import type { PropType } from "vue";
import Loading from "./icons/LoadingIcon.vue";
import debounce from "lodash.debounce";
import presets from "./presets";
import * as Flowchart from "flowchart.js";

let svg: Flowchart.Instance;

export default defineComponent({
  name: "FlowChart",

  components: { Loading },

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
    preset: { type: String as PropType<"ant" | "vue">, default: "vue" },
  },

  setup(props) {
    const loading = ref(true);
    const scale = ref(1);
    const flowchart = ref<HTMLElement | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $preset = computed<Record<string, any>>(() => {
      const preset = presets[props.preset as "ant" | "vue"];

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${props.preset}`);
        return presets.vue;
      }

      return preset;
    });

    const getScale = (width: number): number =>
      width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;

    const resizeHandler = computed(() => {
      return debounce(() => {
        const newScale = getScale(window.innerWidth);

        if (scale.value !== newScale) {
          scale.value = newScale;
          svg.drawSVG(props.id, { ...$preset.value, scale: newScale });
        }
      }, 100);
    });

    onMounted(() => {
      const delay = (): Promise<void> =>
        new Promise((resolve) => setTimeout(resolve, 500));

      (flowchart.value as HTMLElement).setAttribute("id", props.id);

      void Promise.all([
        import(/* webpackChunkName: "flowchart" */ "flowchart.js"),
        delay(),
      ]).then(([flowchart]) => {
        const { parse } = flowchart;

        svg = parse(props.code);
        scale.value = getScale(window.innerWidth);

        svg.drawSVG(props.id, { ...$preset.value, scale: scale.value });
        loading.value = false;

        window.addEventListener("resize", resizeHandler.value);
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler.value);
    });

    return {
      loading,
    };
  },
});
</script>
