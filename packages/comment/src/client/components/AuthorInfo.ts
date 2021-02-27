import { useAuthor } from "@mr-hope/vuepress-shared/client";
import { computed, defineComponent, h } from "vue";
import { AuthorIcon } from "./icons";
import { usePageInfoI18n } from "../composables";
import { commentOptions } from "../define";

import type { VNode } from "vue";

export default defineComponent({
  name: "AuthorInfo",

  components: { AuthorIcon },

  setup() {
    const author = useAuthor(commentOptions.author);
    const text = computed(() => author.value.join(", "));
    const hint = usePageInfoI18n("author");

    return (): VNode | null =>
      author.value
        ? h(
            "span",
            {
              class: "author-info",
              ariaLabel: hint.value,
              "data-balloon-pos": "down",
            },
            [h(AuthorIcon), h("span", text.value)]
          )
        : null;
  },
});
