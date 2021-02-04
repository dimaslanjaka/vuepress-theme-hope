<template>
  <span
    v-if="date"
    class="date-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <CalendarIcon />
    <span v-text="date" />
  </span>
</template>

<script lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import { usePageInfoI18n } from "../composables";

import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "DateInfo",

  components: { CalendarIcon },

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const date = computed(() => {
      let { date } = frontmatter.value;

      if (date instanceof Date) date = date.toISOString();

      if (typeof date === "string") {
        if (date.indexOf("T") !== -1) {
          const [day, temp] = date.split("T");
          const [moment] = temp.split(".");

          return `${day} ${moment === "00:00:00" ? "" : moment}`;
        }

        return date;
      }

      return "";
    });

    const hint = usePageInfoI18n("time");

    return {
      date,
      hint,
    };
  },
});
</script>
