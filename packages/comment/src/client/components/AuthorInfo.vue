<template>
  <span v-if="author" :aria-label="hint" data-balloon-pos="down">
    <AuthorIcon />
    <span v-text="author" />
  </span>
</template>

<script lang="ts">
import { useAuthor } from "@mr-hope/vuepress-shared/client";
import { computed, defineComponent } from "vue";
import AuthorIcon from "./icons/AuthorIcon.vue";
import { usePageInfoI18n } from "../composables";
import { commentOptions } from "../define";

export default defineComponent({
  name: "AuthorInfo",

  components: { AuthorIcon },

  setup() {
    const author = useAuthor(commentOptions.author);
    const text = computed(() => author.value.join(", "));

    return {
      author: text,
      hint: usePageInfoI18n("author"),
    };
  },
});
</script>
