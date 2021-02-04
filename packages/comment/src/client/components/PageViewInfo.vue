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
import { useSiteData } from "@vuepress/client";
import { computed, defineComponent, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import EyeIcon from "./icons/EyeIcon.vue";
import FireIcon from "./icons/FireIcon.vue";
import { usePageInfoI18n, useEnablePageViews } from "../composables";

import type { RouteLocation } from "vue-router";

export default defineComponent({
  name: "PageViewInfo",

  components: { EyeIcon, FireIcon },

  setup() {
    const route = useRoute();
    const site = useSiteData();

    const title = usePageTitle();
    const hint = usePageInfoI18n("views");

    const pageViews = ref(0);
    const enablePageViews = useEnablePageViews();

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

    watch(route, (newValue: RouteLocation, oldValue: RouteLocation) => {
      if (newValue.path !== oldValue.path) setTimeout(() => getCount(), 500);
    });

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
