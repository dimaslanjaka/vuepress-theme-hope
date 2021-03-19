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
import { usePageFrontmatter, useRouteLocale } from "@vuepress/client";
import { computed, defineComponent } from "vue";
import AuthorInfo from "./AuthorInfo";
import CategoryInfo from "./CategoryInfo";
import DateInfo from "./DateInfo";
import PageViewInfo from "./PageViewInfo";
import ReadingTimeInfo from "./ReadingTimeInfo";
import TagInfo from "./TagInfo";
import WordInfo from "./WordInfo";
import { commentOptions, pageInfoI18n } from "../define";

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
    const routeLocale = useRouteLocale();
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
        : ["Author", "PageView", "Date", "Category", "Tag", "ReadingTime"];
    });

    const isOriginal = computed(() => frontmatter.value.original);
    const originText = computed(() => pageInfoI18n[routeLocale.value].origin);

    return {
      config,
      iconPrefix: useIconPrefix(),
      isOriginal,
      originText,
    };
  },
});
</script>
