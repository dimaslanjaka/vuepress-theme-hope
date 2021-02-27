<template>
  <span
    v-if="words"
    class="words-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <WordIcon />
    <span v-text="words" />
  </span>
</template>

<script lang="ts">
import { usePageData, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent, inject } from "vue";
import { WordIcon } from "./icons";
import { pageInfoI18n } from "../define";

import type {
  ReadingTime,
  ReadingTimeI18nConfig,
} from "@mr-hope/vuepress-plugin-reading-time";

export default defineComponent({
  name: "ReadTimeInfo",

  components: { WordIcon },

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>();
    const routeLocale = useRouteLocale();
    const word = inject<Record<string, ReadingTimeI18nConfig>>(
      "reading-time-i18n"
    )![routeLocale.value].word;

    const words = computed(() =>
      word.replace("$word", page.value.readingTime.words.toString())
    );

    const hint = computed(() => pageInfoI18n[routeLocale.value].words);

    return {
      hint,
      words,
    };
  },
});
</script>
