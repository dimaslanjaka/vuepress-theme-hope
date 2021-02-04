<template>
  <span v-if="$tags.length" :aria-label="hint" data-balloon-pos="down">
    <TagIcon />
    <ul class="tags-wrapper">
      <li
        v-for="(tag, index) in $tags"
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
import { useBlogConfig, useTag } from "@mr-hope/vuepress-shared/client";
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import TagIcon from "./icons/TagIcon.vue";
import { usePageInfoI18n } from "../composables";

import type { PropType } from "vue";

export default defineComponent({
  name: "TagInfo",

  components: { TagIcon },

  props: {
    tags: { type: Array as PropType<string[]>, default: (): string[] => [] },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const $tags = props.tags.length ? props.tags : useTag();

    const clickable = computed(() => useBlogConfig().value !== false);

    const navigate = (tagName: string): void => {
      const path = `/tag/${tagName}/`;
      if (route.path !== path) void router.push(path);
    };

    return {
      $tags,
      clickable,
      hint: usePageInfoI18n("tag"),
      navigate,
    };
  },
});
</script>

<style lang="scss">
.tags-wrapper {
  list-style: none;
  margin: 0;
  padding-left: 0;

  .tag {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    min-width: 1.5em;
    margin: 0 0.2em;
    padding: 0 0.2em;
    border-radius: 0.75em;
    background: #f8f8f8;
    font-size: 0.75em;
    text-align: center;
    overflow: hidden;
    transition: all 0.2s;

    .theme-dark & {
      background: #222;
    }

    &.clickable:hover {
      cursor: pointer;
      background: var(--bg-color, #fff);
      box-shadow: 0 1px 6px 0 var(--card-shadow-color, rgba(0, 0, 0, 0.2));
    }
  }
}
</style>
