import {
  usePageData,
  usePageFrontmatter,
  useRouteLocale,
} from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { CalendarIcon } from "./icons";
import { commentOptions, pageInfoI18n } from "../define";

import type { VNode } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "DateInfo",

  components: { CalendarIcon },

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const routeLocale = useRouteLocale();
    const page = usePageData<{
      git: { createTimeStamp: number | undefined };
    }>();

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

      const { createTimeStamp } = page.value.git;

      if (createTimeStamp) {
        const date = new Date(createTimeStamp);

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      return "";
    });

    const hint = computed(() => pageInfoI18n[routeLocale.value].time);

    return (): VNode | null =>
      date.value
        ? h(
            "span",
            {
              class: "date-info",
              ...(commentOptions.hint !== false
                ? {
                    ariaLabel: hint.value,
                    "data-balloon-pos": "down",
                  }
                : {}),
            },
            [h(CalendarIcon), h("span", date.value)]
          )
        : null;
  },
});
