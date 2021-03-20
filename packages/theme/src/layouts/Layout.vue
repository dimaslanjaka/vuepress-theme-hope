<template>
  <Common :sidebar="$frontmatter.blog !== true">
    <!-- <template
      v-if="$frontmatter.blog && $themeConfig.blog !== false"
      #sidebar-bottom
    >
      <BlogInfo />
    </template> -->

    <template #default>
      <!-- <BlogHome v-if="$frontmatter.blog && $themeConfig.blog !== false" /> -->

      <Home v-if="$frontmatter.home" />
      <!-- <Home v-else-if="$frontmatter.home" /> -->

      <Home v-if="$frontmatter.home" />

      <Page v-else>
        <template #top>
          <slot name="page-top" />
        </template>

        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </template>
  </Common>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import BlogInfo from "@BlogInfo";
// import BlogHome from "@BlogHome";
import Common from "../components/Common";
import Home from "../components/Home.vue";
import Page from "../components/Page.vue";

export default defineComponent({
  name: "Layout",

  components: {
    // BlogInfo,
    // BlogHome,
    Common,
    Home,
    Page,
  },
});
</script>
