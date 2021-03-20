<template>
  <RouterLink
    v-if="isRouterLink"
    class="nav-link"
    :class="{ active: isExact }"
    :to="item.link"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
  >
    <slot name="before" />
    <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
    {{ item.text }}
    <slot name="after" />
  </RouterLink>
  <a
    v-else
    class="nav-link external"
    :href="item.link"
    :rel="linkRel"
    :target="linkTarget"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
  >
    <slot name="before" />
    <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
    <slot name="after" />
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import type { PropType } from "vue";
import { useSiteData } from "@vuepress/client";
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/composables";
import { isLinkHttp, isLinkMailto, isLinkTel } from "@vuepress/shared";
import type { NavLink, ThemeHopeOptions } from "../types";

export default defineComponent({
  name: "NavLink",

  inheritAttrs: false,

  props: {
    item: {
      type: Object as PropType<NavLink>,
      required: true,
    },
  },

  setup(props) {
    const site = useSiteData();
    const themeLocale = useThemeLocaleData<ThemeHopeOptions>();

    const { item } = toRefs(props);

    // if the link has http protocol
    const hasHttpProtocol = computed(() => isLinkHttp(item.value.link));

    // if the link has non-http protocol
    const hasNonHttpProtocal = computed(
      () => isLinkMailto(item.value.link) || isLinkTel(item.value.link)
    );

    // resolve the `target` attr
    const linkTarget = computed(() => {
      if (hasNonHttpProtocal.value) return null;
      if (item.value.target) return item.value.target;
      if (hasHttpProtocol.value) return "_blank";
      return null;
    });

    // if the `target` attr is '_blank'
    const isBlankTarget = computed(() => linkTarget.value === "_blank");

    // is `<RouterLink>` or not
    const isRouterLink = computed(
      () =>
        !hasHttpProtocol.value &&
        !hasNonHttpProtocal.value &&
        !isBlankTarget.value
    );

    // is the `exact` prop of `<RouterLink>` should be true
    const isExact = computed(() => {
      const localeKeys = Object.keys(site.value.locales);
      if (localeKeys.length) {
        return localeKeys.some((key) => key === item.value.link);
      }
      return item.value.link === "/";
    });

    // resolve the `rel` attr
    const linkRel = computed(() => {
      if (hasNonHttpProtocal.value) return null;
      if (item.value.rel) return item.value.rel;
      if (isBlankTarget.value) return "noopener noreferrer";
      return null;
    });

    // resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    );

    const iconPrefix = computed(() => {
      const { iconPrefix } = themeLocale.value;

      return iconPrefix === "" ? "" : (iconPrefix as string) || "icon-";
    });

    return {
      iconPrefix,
      isBlankTarget,
      isExact,
      isRouterLink,
      linkRel,
      linkTarget,
      linkAriaLabel,
    };
  },
});
</script>

<style lang="scss">
.nav-link {
  line-height: 1.4rem;

  .navbar & {
    color: var(--dark-grey);

    &.active {
      color: var(--accent-color);
    }
  }

  .sidebar & {
    color: var(--text-color);

    &:hover,
    &.active {
      color: var(--accent-color);
    }
  }
}
</style>
