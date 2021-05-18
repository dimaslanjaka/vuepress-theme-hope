import { useThemePluginConfig } from "@mr-hope/vuepress-shared/client";
import {
  usePageFrontmatter,
  usePageLang,
  useRouteLocale,
} from "@vuepress/client";
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { resolveEnablePageViews } from "../composables";
import { enableWaline, walineOption } from "../define";
import { walineI18n } from "../define";

import type { VNode } from "vue";
import type { RouteLocation } from "vue-router";
import type { CommentPluginFrontmatter, WalineOptions } from "../../shared";
import "../styles/waline.scss";

export default defineComponent({
  name: "Waline",

  setup() {
    const lang = usePageLang();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const route = useRoute();
    const routeLocale = useRouteLocale();
    const themePluginConfig = useThemePluginConfig<WalineOptions>("comment");

    let timeout: NodeJS.Timeout | null = null;

    const enableComment = computed(() => {
      if (!enableWaline) return false;
      const themeConfig = themePluginConfig.value.comment;
      const pluginConfig = walineOption.comment !== false;
      const pageConfig = frontmatter.value.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // Enable in plugin and not disable in theme
        (Boolean(pluginConfig) && pageConfig !== false) ||
        // not disabled in anywhere
        (themeConfig !== false &&
          pluginConfig !== false &&
          pageConfig !== false)
      );
    });

    const enablePageViews = computed(() =>
      resolveEnablePageViews(frontmatter.value)
    );

    const initWaline = (path: string): void => {
      void import(/* webpackChunkName: "waline" */ "@waline/client").then(
        ({ default: Waline }) => {
          new Waline({
            el: "#waline-comment",
            lang: lang.value === "zh-CN" ? "zh-CN" : "en",
            placeholder:
              walineOption.placeholder || walineI18n[routeLocale.value],
            meta: walineOption.meta || ["nick", "mail"],
            requiredFields: walineOption.requiredFields || ["nick"],
            avatar: walineOption.avatar || "retro",
            ...walineOption,
            visitor: enablePageViews.value,
            path:
              path ||
              (typeof window === "undefined" ? "" : window.location.pathname),
          });
        }
      );
    };

    onMounted(() => {
      if (enableWaline)
        timeout = setTimeout(() => initWaline(route.path), 1000);
    });

    onBeforeUnmount(() => {
      if (timeout) clearTimeout(timeout);
    });

    watch(
      () => route,
      (newValue: RouteLocation, oldValue: RouteLocation) => {
        // Refresh comment when navigating to a new page
        if (newValue.path !== oldValue.path) {
          void nextTick(() => {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => initWaline(newValue.path), 1000);
          });
        }
      }
    );

    return (): VNode =>
      h("div", {
        class: "waline-wrapper",
        style: { display: enableComment.value ? "block" : "none" },
        innerHTML: '<div id="waline-comment" />',
      });
  },
});
