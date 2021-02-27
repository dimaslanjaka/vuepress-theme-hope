<template>
  <span
    v-if="readingTime"
    class="read-time-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <TimeIcon />
    <span v-text="readingTime" />
  </span>
</template>

<script lang="ts">
import { usePageData, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, inject } from "vue";
import { TimeIcon } from "./icons";
import { pageInfoI18n } from "../define";

import type {
  ReadingTime,
  ReadingTimeI18nConfig,
} from "@mr-hope/vuepress-plugin-reading-time";

export default defineComponent({
  name: "ReadtimeInfo",

  components: { TimeIcon },

  setup() {
    const routeLocale = useRouteLocale();
    const page = usePageData<{ readingTime: ReadingTime }>();
    const { minute, time } = inject<Record<string, ReadingTimeI18nConfig>>(
      "reading-time-i18n"
    )![routeLocale.value];

    const hint = computed(() => pageInfoI18n[routeLocale.value].readingTime);

    const readingTime = computed(() =>
      page.value.readingTime.minutes < 1
        ? minute
        : time.replace(
            "$time",
            Math.round(page.value.readingTime.minutes).toString()
          )
    );

    return {
      hint,
      readingTime,
    };
  },
});
</script>
