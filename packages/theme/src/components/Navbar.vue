<template>
  <header ref="navbar" class="navbar" :class="{ 'can-hide': canHide }">
    <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <RouterLink ref="siteBrand" :to="siteBrandLink" class="home-link">
      <img
        v-if="siteBrandLogo"
        class="logo"
        :class="{ light: Boolean(siteBrandDarkLogo) }"
        :src="siteBrandLogo"
        :alt="siteBrandTitle"
      />
      <img
        v-if="siteBrandDarkLogo"
        class="logo dark"
        :src="siteBrandDarkLogo"
        :alt="siteBrandTitle"
      />
      <span
        v-if="siteBrandTitle"
        class="site-name"
        :class="{ 'can-hide': siteBrandLogo }"
      >
        {{ siteBrandTitle }}
      </span>
    </RouterLink>

    <div class="navbar-links-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <!-- <ThemeColor /> -->
      <NavbarLinks class="can-hide" />
      <slot name="after" />
      <Docsearch />
      <!-- <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algoliaConfig" /> -->
      <!-- <SearchBox
        v-else-if="
          $themeConfig.search !== false && $page.frontmatter.search !== false
        "
      /> -->
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouteLocale, useSiteLocaleData, withBase } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/composables";
import NavbarLinks from "./NavbarLinks.vue";
// import ThemeColor from "./Theme/ThemeColor.vue";
import ToggleSidebarButton from "./ToggleSidebarButton.vue";

import type { HopeThemeOptions } from "../types";

const getCssValue = (
  el: Element | null,
  property: keyof Omit<
    CSSStyleDeclaration,
    | "getPropertyPriority"
    | "getPropertyValue"
    | "item"
    | "removeProperty"
    | "setProperty"
    | number
  >
): number => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const value = el?.ownerDocument.defaultView?.getComputedStyle(el, null)[
    property
  ] as string;

  const num = Number.parseInt(value, 10);
  return Number.isNaN(num) ? 0 : num;
};

export default defineComponent({
  name: "Navbar",

  components: {
    NavbarLinks,
    // ThemeColor,
    ToggleSidebarButton,
  },

  emits: ["toggle-sidebar"],

  setup() {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData<HopeThemeOptions>();

    const isMobile = ref(false);

    const navbar = ref<HTMLElement | null>(null);
    const siteBrand = ref<HTMLElement | null>(null);

    const siteBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value
    );
    const siteBrandLogo = computed(() =>
      themeLocale.value.logo ? withBase(themeLocale.value.logo) : null
    );
    const siteBrandDarkLogo = computed(() =>
      themeLocale.value.darkLogo ? withBase(themeLocale.value.darkLogo) : null
    );
    const siteBrandTitle = computed(() => siteLocale.value.title);

    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) return {};

      return {
        "max-width": `${linksWrapperMaxWidth.value}px`,
      };
    });

    const canHide = computed(() => {
      const autoHide = themeLocale.value.navAutoHide;

      return autoHide !== "none" && (autoHide === "always" || isMobile.value);
    });

    // avoid overlapping of long title and long navbar links
    onMounted(() => {
      // TODO: migrate to css var
      // refer to _variables.scss
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const navbarHorizontalPadding =
        getCssValue(navbar.value, "paddingLeft") +
        getCssValue(navbar.value, "paddingRight");
      const handleLinksWrapWidth = (): void => {
        if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
          isMobile.value = true;
          linksWrapperMaxWidth.value = 0;
        } else {
          isMobile.value = false;
          linksWrapperMaxWidth.value =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            navbar.value!.offsetWidth -
            navbarHorizontalPadding -
            (siteBrand.value?.offsetWidth || 0);
        }
      };
      handleLinksWrapWidth();
      window.addEventListener("resize", handleLinksWrapWidth, false);
      window.addEventListener("orientationchange", handleLinksWrapWidth);
    });

    return {
      canHide,
      navbar,
      siteBrand,
      siteBrandLink,
      siteBrandLogo,
      siteBrandDarkLogo,
      siteBrandTitle,
      linksWrapperStyle,
    };
  },
});
</script>
