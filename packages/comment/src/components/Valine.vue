<template>
  <div v-show="commentDisplay" class="valine-wrapper">
    <div id="valine" />
  </div>
</template>

<script lang="ts">
import { useThemePluginConfig } from "@mr-hope/vuepress-shared";
import { usePageFrontmatter, usePageLang } from "@vuepress/client";
import { computed, defineComponent, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useEnablePageViews, useValineI18n } from "../composables";
import { enableValine, valineOption } from "../utils";

import type { RouteLocation } from "vue-router";
import type { CommentPluginFrontmatter, ValineOptions } from "../types";

export default defineComponent({
  name: "Valine",

  setup() {
    const lang = usePageLang();
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const route = useRoute();
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
    const enablePageViews = useEnablePageViews();

    const initValine = (path: string): void => {
      void import(/* webpackChunkName: "valine" */ "valine").then(
        (valineConstructor) => {
          const valine = new valineConstructor.default();

          valine.init({
            el: "#valine",
            appId: valineOption.appId,
            appKey: valineOption.appKey,
            placeholder: valineOption.placeholder || useValineI18n().value,
            meta: valineOption.meta || ["nick", "mail", "link"],
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

    watch(route, (newValue: RouteLocation, oldValue: RouteLocation) => {
      if (newValue.path !== oldValue.path)
        // Refresh comment when navigating to a new page
        nextTick(() => initValine(newValue.path));
    });

    return {
      enableComment,
      enableValine,
    };
  },
});
</script>

<style lang="scss">
@use '~@mr-hope/vuepress-shared/styles/wrapper';

.page .valine-wrapper {
  @include wrapper.wrapper;

  .v[data-class="v"] {
    * {
      color: var(--grey3, #333);
    }

    &:empty {
      padding: 0;
    }

    hr {
      color: var(--grey14, #eee);
    }

    a {
      color: var(--accent-color, #3eaf7c);

      &:hover {
        color: var(--accent-color, #3eaf7c);
      }
    }

    pre,
    code {
      color: var(--dark-grey, #666);
      background: var(--code-bgcolor, #ecf4fa);
    }

    blockquote {
      color: var(--dark-grey, #666);
    }

    .vwrap {
      border-color: var(--grey12, #bbb);

      .vicon.actived {
        fill: var(--accent-color, #3eaf7c);
      }

      .vemojis,
      .vpreview {
        box-shadow: 0px 0 1px var(--grey12, #bbb);
      }

      .vheader .vinput {
        border-color: var(--grey12, #bbb);

        &:focus {
          border-color: var(--accent-color, #3eaf7c);
        }
      }

      .vcontrol .col {
        color: var(--grey12, #bbb);
      }

      .vmark {
        .valert {
          .vtext {
            color: var(--bg-color, #fff);
          }

          .vcode {
            background: var(--grey12, #bbb);

            &:focus {
              background: var(--bg-color, #fff);
              border-color: var(--accent-color, #3eaf7c);
            }
          }
        }
      }
    }

    .power {
      color: var(--light-grey, #999);
    }

    .vbtn {
      background: var(--bg-color, #fff);

      &:active,
      &:hover {
        color: var(--white, #fff);
        background: var(--accent-color, #3eaf7c);
        border-color: var(--accent-color, #3eaf7c);
      }
    }

    .vempty {
      color: var(--light-grey, #999);
    }

    .vcount {
      font-size: 1.2em;
    }

    .vcards {
      .vcard {
        .vimg {
          border-color: var(--grey12, #bbb);
        }

        .vhead {
          .vnick {
            color: var(--accent-color, #3eaf7c);

            &:after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              height: 1.5px;
              background: var(--accent-color);
              transform: scaleX(0);
              transition: 0.2s ease-in-out;
            }

            &:hover:after {
              transform: scaleX(1);
            }
          }

          .vsys {
            background: var(--grey14, #eee);
            color: var(--light-grey, #999);
          }
        }

        .vh {
          border-color: var(--grey12, #bbb);

          .vtime {
            color: var(--light-grey, #999);
          }

          .vmeta .vat {
            color: var(--accent-color, #3eaf7c);

            &:hover {
              color: var(--accent-color-d10, #3eaf7c);
            }
          }
        }

        .vcontent {
          color: var(--grey4, #444);

          &.expand:after {
            color: var(--grey, #888);
          }
        }

        .vquote {
          color: var(--dark-grey, #666);
        }
      }
    }

    .vpower {
      display: none;
    }
  }
}
</style>
