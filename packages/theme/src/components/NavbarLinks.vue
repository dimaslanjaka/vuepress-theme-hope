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

<style lang="scss">
.nav-links {
  display: inline-block;

  .sidebar & {
    display: none;
    padding: 0.5rem 0 0.75rem 0;
    border-bottom: 1px solid var(--border-color);

    ul {
      margin-top: 0.25rem;
    }
  }
}

.nav-item {
  position: relative;
  display: inline-block;
  line-height: 2rem;

  .navbar & {
    margin-left: 1rem;
  }

  .sidebar & {
    display: block;
    padding: 0.5rem 0 0.5rem 1.5rem;
    font-size: 1.1em;
    line-height: 1.25rem;
  }

  &:first-child {
    margin-left: 0;
  }

  > .nav-link {
    .navbar & {
      color: var(--dark-grey);

      &::after {
        position: absolute;
        content: " ";
        left: 50%;
        right: 50%;
        bottom: 0px;
        height: 2px;
        background: var(--accent-color-l10);
        border-radius: 1px;
        visibility: hidden;
        transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
      }

      &.active {
        color: var(--accent-color);
      }

      &:hover,
      &.active {
        &::after {
          left: 0;
          right: 0;
          visibility: visible;
        }
      }
    }

    .sidebar & {
      font-weight: bold;
    }
  }
}

.repo-link {
  color: var(--dark-grey);

  .navbar & {
    margin-left: 1rem;
  }

  .sidebar & {
    display: block;
    padding: 0.5rem 0 0.5rem 1.5rem;
    font-size: 1.1em;
    line-height: 1.25rem;
  }
}
</style>
