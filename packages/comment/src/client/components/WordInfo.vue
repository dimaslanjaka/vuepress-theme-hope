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
import { useReadingTimeI18n } from "@mr-hope/vuepress-plugin-reading-time/client";
import { usePageData } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import WordIcon from "./icons/WordIcon.vue";
import { usePageInfoI18n } from "../composables";

import type { ReadingTime } from "@mr-hope/vuepress-plugin-reading-time";

export default defineComponent({
  name: "ReadTimeInfo",

  components: { WordIcon },

  setup() {
    const page = usePageData<{ readingTime: ReadingTime }>();
    const word = useReadingTimeI18n("word");

    const words = computed(() =>
      word.value.replace("$word", page.value.readingTime.words.toString())
    );

    const hint = usePageInfoI18n("words");

    return {
      hint,
      words,
    };
  },
});
</script>
