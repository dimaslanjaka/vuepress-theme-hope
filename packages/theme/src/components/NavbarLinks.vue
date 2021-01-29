<template>
  <nav v-if="navbarLinks.length" class="navbar-links">
    <div v-for="item in navbarLinks" :key="item.link" class="navbar-links-item">
      <DropdownLink v-if="item.children" :item="item" />
      <NavLink v-else :item="item" />
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  useNavbarConfig,
  useNavbarSelectLanguage,
  useNavbarRepo,
} from "../composables";
import DropdownLink from "./DropdownLink.vue";
import NavLink from "./NavLink.vue";

export default defineComponent({
  name: "NavbarLinks",

  components: {
    NavLink,
    DropdownLink,
  },

  setup() {
    const navbarConfig = useNavbarConfig();
    const navbarSelectLanguage = useNavbarSelectLanguage();
    const navbarRepo = useNavbarRepo();

    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value,
    ]);

    return {
      navbarLinks,
    };
  },
});
</script>

<style lang="stylus">
@require '../styles/palette'

.navbar-links
  display inline-block

  .nav-link
    line-height 1.4rem
    color var(--dark-grey)

    @media (max-width $MQMobile)
      color var(--text-color)

      &:hover, &.active
        color var(--accent-color)

    &.active
      color var(--accent-color)

  .navbar-links-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem

    @media (max-width $MQMobile)
      margin-left 0

    &:first-child
      margin-left 0

  .repo-link
    color var(--dark-grey)
    margin-left 1.5rem

    @media (max-width $MQMobile)
      margin-left 0

@media (min-width $MQMobile)
  .navbar-links-item > .nav-link
    &::after
      position absolute
      content ' '
      left 0
      right 0
      bottom 0px
      height 2px
      background var(--accent-color-l10)
      border-radius 1px
      visibility hidden
      transform scaleX(0)
      transition transform 0.3s ease-in-out

    &:hover, &.active
      &::after
        visibility visible
        transform scaleX(1)

    &.active
      color var(--accent-color)
</style>
