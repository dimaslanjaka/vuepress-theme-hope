<template>
  <div class="page-title">
    <h1>
      <i
        v-if="$frontmatter.icon"
        :class="`iconfont ${iconPrefix}${$frontmatter.icon}`"
      />
      {{ $page.title }}
    </h1>
    <div v-if="config" class="page-info">
      <span v-if="isOriginal" class="origin" v-text="originText" />
      <component
        :is="`${item}-info`"
        v-for="item in config"
        :key="$route.path + item"
      />
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import {
  useIconPrefix,
  useThemePluginConfig,
} from "@mr-hope/vuepress-shared/client";
import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import AuthorInfo from "./AuthorInfo.vue";
import CategoryInfo from "./CategoryInfo.vue";
import DateInfo from "./DateInfo.vue";
import PageViewInfo from "./PageViewInfo.vue";
import ReadingTimeInfo from "./ReadingTimeInfo.vue";
import TagInfo from "./TagInfo.vue";
import WordInfo from "./WordInfo.vue";
import { usePageInfoI18n } from "../composables";
import { commentOptions } from "../define";

import type {
  CommentOptions,
  CommentPluginFrontmatter,
  PageInfoType,
} from "../../shared";

import "balloon-css";

export default defineComponent({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo,
  },

  setup() {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const themePluginConfig = useThemePluginConfig<CommentOptions>("comment");

    const config = computed<PageInfoType[] | false>(() => {
      const themeConfig = themePluginConfig.value.pageInfo;
      const pluginConfig = commentOptions.pageInfo;
      const pageConfig = frontmatter.value.pageInfo;

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : pluginConfig === false
        ? false
        : Array.isArray(pluginConfig)
        ? pluginConfig
        : themeConfig === false
        ? false
        : Array.isArray(themeConfig)
        ? themeConfig
        : ["Author", "PageView", "Date", "Category", "Tag", "ReadTime"];
    });

    const isOriginal = computed(() => frontmatter.value.original);

    return {
      config,
      iconPrefix: useIconPrefix(),
      isOriginal,
      originText: usePageInfoI18n("origin"),
    };
  },
});
</script>

<style lang="scss">
@use '~@mr-hope/vuepress-shared/styles/wrapper';

.page {
  .page-title {
    @include wrapper.wrapper;
    padding-bottom: 0.2rem;
    position: relative;
    z-index: 1;

    h1 {
      margin-top: -3.1rem !important;
      padding-top: 4.6rem !important;
      margin-bottom: 0.5rem;

      .iconfont {
        color: var(--accent-color, #3eaf7c);
        font-size: 0.8em;
      }
    }
  }

  .page-title + .theme-default-content:not(.custom) {
    padding-top: 0;
  }

  .page-info {
    display: flex;
    justify-content: flex-start;
    align-content: stretch;
    align-items: center;
    flex-wrap: wrap;
    color: var(--dark-grey, #666);
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;

    & > span {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-right: 0.5em;
      line-height: 2;

      @media (min-width: var(--screen-xxl, 1440px)) {
        font-size: 1.1em;
      }

      @media (max-width: var(--screen-s, 419px)) {
        font-size: 0.875em;
      }

      &.origin {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        margin: 0 0.5em;
        padding: 0 0.5em;
        border: 0.5px solid var(--dark-grey, #666);
        border-radius: 0.75em;
        background: var(--bg-color, #fff);
        font-size: 0.75em;
        line-height: 1.5;
        overflow: hidden;
      }
    }

    .icon {
      width: 1em;
      height: 1em;
      margin-right: 0.25em;
    }
  }

  .theme-default-content:not(.custom) > h1:first-child {
    display: none;
  }
}
</style>
