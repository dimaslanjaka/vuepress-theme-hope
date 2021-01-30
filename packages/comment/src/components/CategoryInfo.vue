<template>
  <span v-if="$categories.length" :aria-label="hint" data-balloon-pos="down">
    <CategoryIcon />
    <ul class="categories-wrapper">
      <li
        v-for="category in $categories"
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
import { useBlogConfig, useCategory } from "@mr-hope/vuepress-shared";
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import CategoryIcon from "./icons/CategoryIcon.vue";
import { usePageInfoI18n } from "../composables";

import type { PropType } from "vue";

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
    const route = useRoute();
    const router = useRouter();

    const $categories = props.categories.length
      ? props.categories
      : useCategory();

    const clickable = computed(() => useBlogConfig().value !== false);

    const navigate = (categoryName: string): void => {
      const path = `/category/${categoryName}/`;

      if (clickable.value && route.path !== path) void router.push(path);
    };

    return {
      $categories,
      clickable,
      hint: usePageInfoI18n("category"),
      navigate,
    };
  },
});
</script>

<style lang="scss">
.categories-wrapper {
  list-style: none;
  margin: 0;
  padding-left: 0;

  .category {
    display: inline-block;

    > span {
      &:after {
        content: ", ";
      }

      &:last-child:after {
        content: ", ";
      }
    }

    &.clickable {
      > span:hover {
        cursor: pointer;
        color: var(--accent-color, #3eaf7c);
      }
    }
  }
}
</style>
