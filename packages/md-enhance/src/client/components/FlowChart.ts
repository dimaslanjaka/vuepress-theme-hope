import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import debounce from "lodash.debounce";
import { loadingIcon } from "./loading";
import presets from "../presets";
import * as Flowchart from "flowchart.js";

import type { PropType, VNode } from "vue";

let svg: Flowchart.Instance;

export default defineComponent({
  name: "FlowChart",

  props: {
    id: { type: String, required: true },
    preset: { type: String as PropType<"ant" | "vue">, default: "vue" },
  },

  setup(props) {
    const loading = ref(true);
    const scale = ref(1);
    const flowchartElement = ref<HTMLElement | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $preset = computed<Record<string, any>>(() => {
      const preset = presets[props.preset];

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

      flowchartElement.value?.setAttribute("id", props.id);

      void Promise.all([
        import(/* webpackChunkName: "flowchart" */ "flowchart.js"),
        delay(),
      ]).then(([flowchart]) => {
        const { parse } = flowchart;

        svg = parse(
          decodeURIComponent(flowchartElement.value?.dataset.code || "")
        );
        scale.value = getScale(window.innerWidth);

        svg.drawSVG(props.id, { ...$preset.value, scale: scale.value });
        loading.value = false;

        window.addEventListener("resize", resizeHandler.value);
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeHandler.value);
    });

    return (): VNode =>
      h("div", {
        class: { loading: loading.value, "md-flowchart": true },
        ref: flowchartElement,
        // innerHTML: loading.value ? loadingIcon : "",
      });
  },
});
