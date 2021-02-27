<template>
  <Valine v-if="type === 'valine'" v-show="enable" />
  <span v-else class="vssue" />
  <!-- <Vssue v-else-if="options.type === 'vssue'" v-show="enable" :title="title" /> -->
</template>

<script lang="ts">
import { usePageTitle } from "@mr-hope/vuepress-shared/client";
import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import Valine from "./Valine.vue";
import { commentOptions } from "../define";

import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "Comment",

  components: { Valine },

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const enable = computed(() => {
      return (
        commentOptions.type !== "disable" &&
        (frontmatter.value.comment ||
          (commentOptions.comment !== false &&
            (commentOptions.type === "valine" ||
              frontmatter.value.comment !== false)))
      );
    });

    return {
      enable,
      type: commentOptions.type,
      title: usePageTitle(),
    };
  },
});
</script>
