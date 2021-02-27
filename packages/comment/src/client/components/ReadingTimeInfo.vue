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
import { useReadingTimeI18n } from "@mr-hope/vuepress-plugin-reading-time/client";
import { usePageData } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import { TimeIcon } from "./icons";
import { usePageInfoI18n } from "../composables";

import type { ReadingTime } from "@mr-hope/vuepress-plugin-reading-time";

export default defineComponent({
  name: "ReadtimeInfo",

  components: { TimeIcon },

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>();
    const minute = useReadingTimeI18n("minute");
    const time = useReadingTimeI18n("time");

    const readingTime = computed(() =>
      page.value.readingTime.minutes < 1
        ? minute.value
        : time.value.replace(
            "$time",
            Math.round(page.value.readingTime.minutes).toString()
          )
    );

    return {
      hint: usePageInfoI18n("readingTime"),
      readingTime,
    };
  },
});
</script>
