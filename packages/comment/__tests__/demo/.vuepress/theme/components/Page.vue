<template>
  <main class="page">
    <slot name="top" />

    <PageInfo />
    <div class="theme-default-content">
      <Content />
    </div>

    <PageMeta />
    <PageNav />

    <Comment />

    <slot name="bottom" />
  </main>
</template>

<script>
import { defineComponent } from "vue";
import PageMeta from "@vuepress/theme-default/lib/components/PageMeta.vue";
import PageNav from "@vuepress/theme-default/lib/components/PageNav.vue";

export default defineComponent({
  name: "Page",

  components: {
    PageMeta,
    PageNav,
  },
});
</script>
