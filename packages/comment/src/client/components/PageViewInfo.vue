<template>
  <span
    v-if="enablePageViews"
    class="visitor-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <EyeIcon v-if="pageViews < 1000" />
    <FireIcon v-else />
    <span :id="visitorID" :data-flag-title="title" class="leancloud_visitors">
      <span class="leancloud-visitors-count">...</span>
    </span>
  </span>
</template>

<script lang="ts">
import { usePageTitle } from "@mr-hope/vuepress-shared/client";
import {
  usePageFrontmatter,
  useRouteLocale,
  useSiteData,
} from "@vuepress/client";
import { computed, defineComponent, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { EyeIcon, FireIcon } from "./icons";
import { resolveEnablePageViews } from "../composables";
import { pageInfoI18n } from "../define";

import type { CommentPluginFrontmatter } from "../../shared";

export default defineComponent({
  name: "PageViewInfo",

  components: { EyeIcon, FireIcon },

  setup() {
    const route = useRoute();
    const site = useSiteData();
    const title = usePageTitle();
    const routeLocale = useRouteLocale();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();

    const hint = computed(() => pageInfoI18n[routeLocale.value].views);

    const pageViews = ref(0);
    const enablePageViews = computed(() =>
      resolveEnablePageViews(frontmatter.value)
    );

    /** visitorID, use current path */
    const visitorID = computed(() => {
      const { base } = site.value;

      return `${base.slice(0, base.length - 1)}${route.path}`;
    });

    // show fire icon depending on the views number
    const getCount = (): void => {
      const countElement = document.querySelector(
        ".leancloud_visitors .leancloud-visitors-count"
      );

      if (countElement) {
        const count = countElement.textContent;

        if (count && !isNaN(Number(count))) pageViews.value = Number(count);
        else
          setTimeout(() => {
            getCount();
          }, 500);
      }
    };

    onMounted(() => {
      setTimeout(() => getCount(), 1500);
    });

    watch(
      () => route.path,
      (newValue: string, oldValue: string) => {
        if (newValue !== oldValue) setTimeout(() => getCount(), 500);
      }
    );

    return {
      enablePageViews,
      hint,
      pageViews,
      title,
      visitorID,
    };
  },
});
</script>
