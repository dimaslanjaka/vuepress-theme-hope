import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { CalendarIcon } from "./icons";
import { usePageInfoI18n } from "../composables";

import type { VNode } from "vue";
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

    return (): VNode | null =>
      date.value
        ? h(
            "span",
            {
              class: "date-info",
              ariaLabel: hint.value,
              "data-balloon-pos": "down",
            },
            [h(CalendarIcon), h("span", date.value)]
          )
        : null;
  },
});
