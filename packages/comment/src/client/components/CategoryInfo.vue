<template>
  <span v-if="items.length" :aria-label="hint" data-balloon-pos="down">
    <CategoryIcon />
    <ul class="categories-wrapper">
      <li
        v-for="category in items"
        :key="category"
        class="category"
        :class="{ clickable }"
        @click="navigate(category)"
      >
        <span :role="clickable ? 'navigation' : ''" v-text="category" />
      </li>
    </ul>
  </span>
</template>

<script lang="ts">
import {
  resolveCategory,
  useBlogConfig,
} from "@mr-hope/vuepress-shared/client";
import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CategoryIcon } from "./icons";
import { pageInfoI18n } from "../define";

import type { PropType } from "vue";
import { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "CategoryInfo",

  components: { CategoryIcon },

  props: {
    categories: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
    },
  },

  setup(props) {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const route = useRoute();
    const router = useRouter();
    const routeLocale = useRouteLocale();

    const items = props.categories.length
      ? props.categories
      : computed(() => resolveCategory(frontmatter.value));
    const hint = computed(() => pageInfoI18n[routeLocale.value].category);
    const clickable = computed(() => useBlogConfig().value !== false);

    const navigate = (categoryName: string): void => {
      const path = `/category/${categoryName}/`;

      if (clickable.value && route.path !== path) void router.push(path);
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
