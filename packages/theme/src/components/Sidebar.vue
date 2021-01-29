<template>
  <aside class="sidebar">
    <!-- <template v-if="showBlogInfo !== 'none'">
      <BloggerInfo :class="{ mobile: showBlogInfo === 'mobile' }" />
      <hr />
    </template> -->

    <slot name="top" />

    <NavbarLinks />

    <slot name="center" />

    <ul class="sidebar-links">
      <SidebarChild
        v-for="item in sidebarItems"
        :key="item.link"
        :item="item"
      />
    </ul>

    <slot name="bottom" />
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useThemeData } from "@vuepress/client";
import { useSidebarItems } from "../composables";
import { BlogOptions } from "../types";
// import BloggerInfo from "./Blog/BloggerInfo.vue";
import NavbarLinks from "./NavbarLinks.vue";
import SidebarChild from "./SidebarChild.vue";

export default defineComponent({
  name: "Sidebar",

  components: {
    // BloggerInfo,
    NavbarLinks,
    SidebarChild,
  },

  setup() {
    const themeData = useThemeData();
    const sidebarItems = useSidebarItems();
    const blogConfig = computed<BlogOptions>(() => themeData.value.blog || {});
    const showBlogInfo = computed<"mobile" | "none" | "always">(
      () => blogConfig.value.showInSidebar || "none"
    );

    return {
      blogConfig,
      showBlogInfo,
      sidebarItems,
    };
  },
});
</script>

<style lang="stylus">
@require '../styles/palette.styl'

.sidebar
  position fixed
  z-index 10
  top $navbarHeight
  left 0
  bottom 0
  box-sizing border-box
  width $sidebarWidth
  margin 0
  background var(--bgcolor-blur)
  box-shadow 2px 0 8px var(--card-shadow-color)
  backdrop-filter saturate(200%) blur(20px)
  font-size 16px
  overflow-y auto

  @media (max-width $MQMobile)
    top $navbarMobileHeight

  .theme-container:not(.has-navbar) &
    top 0

  .navbar-links ul, .sidebar-links ul
    padding 0
    margin 0
    list-style-type none

  a
    display inline-block
    color var(--text-color)

  .blogger-info.mobile
    display none

  .blogger-info.mobile + hr
    display none

  .navbar-links
    display none
    border-bottom 1px solid var(--border-color)
    padding 0.5rem 0 0.75rem 0

    ul
      margin-top 0.25rem

    a
      font-weight 600

    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem

  & > .sidebar-links
    padding 1.5rem 0

    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold

    & > li:not(:first-child)
      margin-top 0.75rem

  // narrow desktop / iPad
  @media (max-width $MQNarrow)
    width $mobileSidebarWidth
    font-size 15px

  @media (min-width ($MQMobile + 1px))
    .theme-container:not(.has-sidebar) &
      display none

  // wide mobile
  @media (max-width $MQMobile)
    transform translateX(-100%)
    transition transform 0.2s ease
    box-shadow none

    .theme-container.sidebar-open &
      transform translateX(0)
      box-shadow 2px 0 8px var(--card-shadow-color)

    .theme-container:not(.has-navbar) &
      top 0

    .blogger-info.mobile
      display block

    .blogger-info.mobile + hr
      display block
      margin-top 16px

    .navbar-links
      display block

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)

    & > .sidebar-links
      padding 1rem 0
</style>
