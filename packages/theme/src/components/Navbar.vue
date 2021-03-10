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
      <ThemeColor />
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
import ThemeColor from "./Theme/ThemeColor.vue";
import ToggleSidebarButton from "./ToggleSidebarButton.vue";

import type { ThemeHopeOptions } from "../types";

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
    ThemeColor,
    ToggleSidebarButton,
  },

  emits: ["toggle-sidebar"],

  setup() {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData<ThemeHopeOptions>();

    const isMobile = ref(false);

    const navbar = ref<HTMLElement | null>(null);
    const siteBrand = ref<HTMLElement | null>(null);

    const siteBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value
    );
    const siteBrandLogo = computed(() => withBase(themeLocale.value.logo));
    const siteBrandDarkLogo = computed(() =>
      withBase(themeLocale.value.darkLogo)
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

<style lang="scss">
.navbar {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: $navbarHeight;
  padding: $navbarVerticalPadding $navbarHorizontalPadding;
  background: var(--bgcolor-blur);
  box-sizing: border-box;
  box-shadow: 0 2px 8px var(--card-shadow-color);
  backdrop-filter: saturate(200%) blur(20px);
  line-height: $navbarHeight - $navbarVerticalPadding * 2;
  transition: transform 0.3s ease-in-out;

  @media (max-width: $MQMobile) {
    height: $navbarMobileHeight;
    padding: $navbarMobileVerticalPadding $navbarMobileHorizontalPadding;
    padding-left: $navbarMobileHorizontalPadding + 2.4rem;
    line-height: $navbarMobileHeight - $navbarMobileVerticalPadding * 2;
  }

  .hide-navbar &.can-hide {
    transform: translateY(-100%);
  }

  a,
  span,
  img {
    display: inline-block;
  }

  .home-link:hover .site-name {
    color: var(--accent-color);
  }

  .logo {
    min-width: $navbarHeight - $navbarVerticalPadding * 2;
    height: $navbarHeight - $navbarVerticalPadding * 2;
    margin-right: 0.8rem;
    vertical-align: top;

    @media (max-width: $MQMobile) {
      min-width: $navbarMobileHeight - $navbarMobileVerticalPadding * 2;
      height: $navbarMobileHeight - $navbarMobileVerticalPadding * 2;
    }

    .theme-light & {
      &.light {
        display: block;
      }

      &.dark {
        display: none;
      }
    }

    .theme-dark & {
      &.light {
        display: none;
      }

      &.dark {
        display: block;
      }
    }
  }

  .can-hide {
    @media (max-width: $MQMobile) {
      display: none;
    }
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-color);
    position: relative;

    @media (max-width: $MQMobile) {
      width: calc(100vw - 9.4rem);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .navbar-links-wrapper {
    position: absolute;
    top: $navbarVerticalPadding;
    right: $navbarHorizontalPadding;
    display: flex;
    box-sizing: border-box;
    padding-left: 1.5rem;
    font-size: 0.9rem;
    white-space: nowrap;

    @media (max-width: $MQMobile) {
      padding-left: 0;
      top: $navbarMobileVerticalPadding;
      right: $navbarMobileHorizontalPadding;
    }
  }
}
</style>
