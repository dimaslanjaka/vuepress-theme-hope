<template>
  <span v-if="items.length" :aria-label="hint" data-balloon-pos="down">
    <TagIcon />
    <ul class="tags-wrapper">
      <li
        v-for="(tag, index) in items"
        :key="tag"
        class="tag"
        :class="{ clickable, [`tag${index % 9}`]: true }"
        @click="navigate(tag)"
      >
        <span :role="clickable ? 'navigation' : ''" v-text="tag" />
      </li>
    </ul>
  </span>
</template>

<script lang="ts">
import { useBlogConfig, resolveTag } from "@mr-hope/vuepress-shared/client";
import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TagIcon } from "./icons";
import { pageInfoI18n } from "../define";

import type { PropType } from "vue";
import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "TagInfo",

  components: { TagIcon },

  props: {
    tags: { type: Array as PropType<string[]>, default: (): string[] => [] },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const route = useRoute();
    const router = useRouter();
    const routeLocale = useRouteLocale();

    const hint = computed(() => pageInfoI18n[routeLocale.value].tag);

    const items = props.tags.length
      ? props.tags
      : computed(() => resolveTag(frontmatter.value));

    const clickable = computed(() => useBlogConfig().value !== false);

    const navigate = (tagName: string): void => {
      const path = `/tag/${tagName}/`;
      if (route.path !== path) void router.push(path);
    };

    return {
      items,
      clickable,
      hint,
      navigate,
    };
  },
});
</script>
