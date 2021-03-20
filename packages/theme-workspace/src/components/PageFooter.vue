<template>
  <footer v-if="enable" class="footer-wrapper">
    <MediaLinks v-if="!($frontmatter.home && $frontmatter.blog)" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="footerContent" class="footer" v-html="footerContent" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="copyright" class="copyright" v-html="copyright" />
  </footer>
</template>

<script lang="ts">
import { usePageFrontmatter } from "@vuepress/client";
import { useThemeData } from "@vuepress/plugin-theme-data/lib/composables";
import { computed, defineComponent } from "vue";
import { HopeFooterConfig } from "../types";
import MediaLinks from "./media/MediaLinks.vue";

export default defineComponent({
  name: "PageFooter",

  components: { MediaLinks },

  setup() {
    const themeData = useThemeData();
    const pageFrontmatter = usePageFrontmatter();

    const footerConfig = computed<HopeFooterConfig>(
      () => themeData.value.footer || {}
    );

    const enable = computed<boolean>(() => {
      const { copyrightText, footer, medialink } = pageFrontmatter.value;

      return (
        footer !== false &&
        Boolean(
          copyrightText || footer || medialink || footerConfig.value.display
        )
      );
    });

    const footerContent = computed<string | false>(() => {
      const { footer } = pageFrontmatter.value;

      return footer === false
        ? false
        : typeof footer === "string"
        ? footer
        : footerConfig.value.content || "";
    });

    const copyright = computed<string | false>(() =>
      pageFrontmatter.value.copyrightText === false
        ? false
        : (pageFrontmatter.value.copyrightText as string) ||
          footerConfig.value.copyright ||
          (themeData.value.author
            ? `Copyright © 2020 ${themeData.value.author}`
            : "")
    );

    return {
      copyright,
      enable,
      footerContent,
    };
  },
});
</script>

<style lang="stylus">
@require '../styles/palette.styl';

.footer-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px 30px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--dark-color, #666);
  text-align: center;

  @media (min-width: $MQMobile) {
    .has-sidebar & {
      padding-left: $sidebarWidth;
      border-left: 30px solid transparent;
    }
  }

  & > div {
    @media (max-width: $MQMobileNarrow) {
      width: 100%;
    }
  }

  .media-links-wrapper {
    margin: 0;
  }

  .footer {
    margin: 8px 16px;
    font-size: 14px;
  }

  .copyright {
    margin: 6px 0;
    font-size: 13px;
  }
}

.page:not(.not-found) + .footer-wrapper {
  margin-top: -2rem;
}
</style>
