import { useThemePluginConfig } from "@mr-hope/vuepress-shared/client";
import {
  usePageFrontmatter,
  usePageLang,
  useRouteLocale,
} from "@vuepress/client";
import { computed, defineComponent, h, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { resolveEnablePageViews } from "../composables";
import { enableValine, valineOption } from "../define";

import type { VNode } from "vue";
import type { RouteLocation } from "vue-router";
import type { CommentPluginFrontmatter, ValineOptions } from "../../shared";

declare const VALINE_I18N: Record<string, string>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  AV: unknown;
}

import "../styles/valine.scss";

export default defineComponent({
  name: "Valine",

  setup() {
    const lang = usePageLang();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const route = useRoute();
    const routeLocale = useRouteLocale();
    const themePluginConfig = useThemePluginConfig<ValineOptions>("comment");

    const enableComment = computed(() => {
      if (!enableValine) return false;
      const themeConfig = themePluginConfig.value.comment;
      const pluginConfig = valineOption.comment !== false;
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

    const initValine = (path: string): void => {
      void import(/* webpackChunkName: "valine" */ "valine").then(
        (valineConstructor) => {
          const valine = new valineConstructor.default();

          valine.init({
            el: "#valine",
            appId: valineOption.appId,
            appKey: valineOption.appKey,
            placeholder:
              valineOption.placeholder || VALINE_I18N[routeLocale.value],
            meta: valineOption.meta || ["nick", "mail"],
            requiredFields: valineOption.requiredFields || ["nick"],
            avatar: valineOption.avatar || "retro",
            visitor: enablePageViews.value,
            recordIP: valineOption.recordIP || false,
            path:
              path ||
              (typeof window === "undefined" ? "" : window.location.pathname),
            pageSize: valineOption.pageSize || 10,
            enableQQ: valineOption.enableQQ || true,
            emojiCDN: valineOption.emojiCDN || "",
            emojiMaps: valineOption.emojiMaps,
            lang: lang.value === "zh-CN" ? "zh-CN" : "en",
          });
        }
      );
    };

    onMounted(() => {
      if (enableValine) setTimeout(() => initValine(route.path), 500);
    });

    watch(
      () => route,
      (newValue: RouteLocation, oldValue: RouteLocation) => {
        if (newValue.path !== oldValue.path)
          // Refresh comment when navigating to a new page
          void nextTick(() => initValine(newValue.path));
      }
    );

    return (): VNode =>
      h("div", {
        class: "valine-wrapper",
        style: { display: enableComment.value ? "block" : "none" },
        innerHTML: '<div id="valine" />',
      });
  },
});
