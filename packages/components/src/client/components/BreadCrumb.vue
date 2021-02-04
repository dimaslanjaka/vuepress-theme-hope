<template>
  <nav class="breadcrumb" :class="{ disable: !enable }">
    <ul v-if="enable">
      <li
        v-for="(item, index) in config"
        :key="item.url"
        :class="{ 'is-active': config.length - 1 === index }"
      >
        <RouterLink :to="item.url">
          <i
            v-if="item.icon && iconEnable"
            :class="`iconfont ${iconPrefix}${item.icon}`"
          />
          {{ item.title }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {
  usePageFrontmatter,
  usePagesData,
  useThemeData,
} from "@vuepress/client";
import { computed, defineComponent, onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { getLinks } from "../composables";

interface BreadCrumbConfig {
  title: string;
  icon?: string;
  url: string;
}

export default defineComponent({
  name: "BreadCrumb",

  setup() {
    const pageFrontmatter = usePageFrontmatter();
    const themeData = useThemeData();
    const pagesData = usePagesData();
    const route = useRoute();
    const config = ref<BreadCrumbConfig[]>([]);

    const enable = computed<boolean>(() => {
      const globalEnable = themeData.value.breadcrumb !== false;
      const pageEnable = pageFrontmatter.value.breadcrumb;

      return (
        ((globalEnable && pageEnable !== false) || pageEnable === true) &&
        config.value.length > 1
      );
    });

    const iconEnable = computed<boolean>(() => {
      const globalEnable = themeData.value.breadcrumbIcon !== false;
      const pageEnable = pageFrontmatter.value.breadcrumbIcon;

      return (
        enable.value &&
        ((globalEnable && pageEnable !== false) || pageEnable === true)
      );
    });

    const iconPrefix = computed<string>(() => {
      const { iconPrefix } = themeData.value;

      return iconPrefix === "" ? "" : iconPrefix || "icon-";
    });

    const updateConfig = async (): Promise<void> => {
      const breadcrumbConfig: BreadCrumbConfig[] = [];
      const pages = pagesData.value;
      const links = getLinks(route);

      // generate breadcrumb config
      for (let index = 1; index < links.length; index++) {
        const page = await pages[links[index]]();

        breadcrumbConfig.push({
          title: page.title,
          icon: page.frontmatter.icon as string,
          url: page.path,
        });
      }

      if (breadcrumbConfig.length > 1) config.value = breadcrumbConfig;
    };

    watch(route, updateConfig);

    onMounted(() => {
      updateConfig();
    });

    return {
      config,
      enable,
      iconEnable,
      iconPrefix,
    };
  },
});
</script>

<style lang="scss">
@use '~@mr-hope/vuepress-shared/styles/wrapper';

// Fix top boarder of heading1
.theme-default-content:not(.custom) {
  > *:first-child {
    margin-top: 0;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  .theme-default-content:not(.custom) &:first-child {
    margin-top: 0.5rem - var(--navbar-height) !important;
    padding-top: var(--navbar-height) + 1rem !important;

    @media (max-width: var(--screen-m)) {
      margin-top: 0.5rem - var(--navbar-mobile-height) !important;
      padding-top: var(--navbar-mobile-height) + 1rem !important;
    }
  }
}

.breadcrumb {
  @include wrapper.wrapper;
  position: relative;
  margin-top: var(--navbar-height);
  margin-bottom: (-var(--navbar-height));
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  font-size: 15px;
  z-index: 2;

  @media (max-width: var(--screen-l)) {
    margin-top: var(--navbar-mobile-height);
    margin-bottom: (-var(--navbar-mobile-height));
    font-size: 14px;
  }

  @media (max-width: var(--screen-s)) {
    font-size: 12.8px;
  }

  &.disable {
    padding-bottom: 1.3em;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 0px;
    list-style: none;
  }

  li {
    display: inline-block;

    &:first-child a {
      padding-left: 0;
    }

    &:last-child a {
      padding-right: 0;
    }

    &.is-active a {
      color: var(--light-grey);
      cursor: default;
      pointer-events: none;
    }
  }

  li + li::before {
    color: var(--light-grey);
    content: "\0002f";
  }

  a {
    display: inline-block;
    padding: 0 0.5em;
    line-height: 2;

    &:before {
      position: relative;
      bottom: 0.125rem;
      margin-right: 0.25em;
    }

    &:hover {
      color: var(--accent-color-l10);

      .theme-dark & {
        color: var(--accent-color-d10);
      }
    }
  }
}
</style>
