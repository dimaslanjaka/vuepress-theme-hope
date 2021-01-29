<template>
  <Common :sidebar="false">
    <main class="page not-found">
      <h1>404</h1>

      <blockquote v-text="getMsg()" />

      <button class="action-button" @click="back" v-text="i18n.back" />
      <RouterLink class="action-button" to="/" v-text="i18n.home" />
    </main>
  </Common>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouteLocale, useThemeLocaleData } from "@vuepress/client";
import Common from "../components/Common.vue";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";

import type { HopeThemeLocaleConfigItem } from "@mr-hope/vuepress-shared";
import type { ThemeHopeOptions } from "../types";

export default defineComponent({
  name: "NotFound",

  components: { Common },

  setup() {
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData<ThemeHopeOptions>();

    const i18n = computed<HopeThemeLocaleConfigItem["error404"]>(
      () => themeLocale.value.error404 || getDefaultLocale().error404
    );

    const getMsg = (): string =>
      i18n.value.hint[Math.floor(Math.random() * i18n.value.hint.length)];

    const back = (): void => window.history.go(-1);

    return {
      back,
      getMsg,
      i18n,
    };
  },
});
</script>

<style lang="stylus">
@require '../styles/palette'

.page.not-found
  display block
  max-width $homePageWidth
  margin 0px auto
  padding ($navbarHeight + 1rem) 2rem

  .action-button
    display inline-block
    box-sizing border-box
    margin 0 0.25rem
    padding 0.5rem 1rem
    border-bottom 1px solid var(--accent-color-d10)
    border-radius 0.25rem
    background var(--accent-color)
    color var(--white)
    font-size 1rem
    outline none
    transition background 0.1s ease

    &:hover
      cursor pointer
      background var(--accent-color-l10)
</style>
