<script lang="ts">
import { usePageData, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, h, inject } from "vue";
import { TimeIcon } from "./icons";
import { pageInfoI18n } from "../define";

import type {
  ReadingTime,
  ReadingTimeI18nConfig,
} from "@mr-hope/vuepress-plugin-reading-time";
import type { VNode } from "vue";

export default defineComponent({
  name: "ReadingTimeInfo",

  components: { TimeIcon },

  setup() {
    const routeLocale = useRouteLocale();
    const page = usePageData<{ readingTime: ReadingTime }>();
    const { minute = "", time = "" } =
      inject<Record<string, ReadingTimeI18nConfig>>("reading-time-i18n")?.[
        routeLocale.value
      ] || {};

    const hint = computed(() => pageInfoI18n[routeLocale.value].readingTime);

    const readingTime = computed(() =>
      page.value.readingTime.minutes < 1
        ? minute
        : time.replace(
            "$time",
            Math.round(page.value.readingTime.minutes).toString()
          )
    );

    return (): VNode | null =>
      readingTime.value
        ? h(
            "span",
            {
              class: "reading-time-info",
              ariaLabel: hint.value,
              "data-balloon-pos": "down",
            },
            [h(TimeIcon), h("span", readingTime.value)]
          )
        : null;
  },
});
</script>
