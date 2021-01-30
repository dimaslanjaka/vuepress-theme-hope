<template>
  <span
    v-if="time"
    class="time-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <CalendarIcon />
    <span v-text="time" />
  </span>
</template>

<script lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import { usePageInfoI18n } from "../composables";

import type { CommentPluginFrontmatter } from "../types";

export default defineComponent({
  name: "TimeInfo",

  components: { CalendarIcon },

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const time = computed(() => {
      const { time } = frontmatter.value;

      if (typeof time === "string") {
        if (time.indexOf("T") !== -1) {
          const [date, temp] = time.split("T");
          const [moment] = temp.split(".");

          return `${date} ${moment === "00:00:00" ? "" : moment}`;
        }

        return time;
      }

      return "";
    });

    const hint = usePageInfoI18n("time");

    return {
      hint,
      time,
    };
  },
});
</script>
