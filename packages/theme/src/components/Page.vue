<template>
  <main class="page">
    <!-- <DropTransition>
      <BreadCrumb :key="$route.path" />
    </DropTransition> -->

    <slot name="top" />

    <!-- <DropTransition v-if="commentEnable" :delay="0.04">
      <PageInfo :key="$route.path" />
    </DropTransition>

    <DropTransition :delay="0.08">
      <Password
        v-if="pagePassword && !pageDescrypted"
        :key="$route.path"
        :page="true"
        @password-verify="password = $event"
      />
    </DropTransition> -->

    <!-- <DropTransition v-if="!pagePassword || pageDescrypted" :delay="0.12">
      <Anchor :key="$route.path" :header="headers" />
    </DropTransition> -->

    <!-- <DropTransition v-show="!pagePassword || pageDescrypted" :delay="0.08"> -->
    <div class="theme-default-content">
      <Content :key="$route.path" />
    </div>
    <!-- </DropTransition> -->

    <!-- <DropTransition v-if="!pagePassword || pageDescrypted" :delay="0.12"> -->
    <PageMeta :key="$route.path" />
    <!-- </DropTransition> -->

    <!-- <DropTransition v-if="!pagePassword || pageDescrypted" :delay="0.14"> -->
    <PageNav :key="$route.path" />
    <!-- </DropTransition> -->

    <!-- <DropTransition
      v-if="(!pagePassword || pageDescrypted) && commentEnable"
      :delay="0.16"
    >
      <Comment :key="$route.path" />
    </DropTransition> -->

    <slot name="bottom" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import DropTransition from "./DropTransition.vue";
import PageMeta from "./PageMeta.vue";
import PageNav from "./PageNav.vue";

export default defineComponent({
  name: "Page",

  components: {
    // DropTransition,
    PageMeta,
    PageNav,
  },
});
</script>

<style lang="stylus">
@require '../styles/palette.styl';

.page {
  display: block;
  box-sizing: border-box;
  min-height: 100vh;
  padding-left: $sidebarWidth;
  padding-bottom: 2rem;
  background: var(--bg-color);

  @media (max-width: $MQMobile) {
    min-height: 100vh;
  }

  // narrow desktop / iPad
  @media (max-width: $MQNarrow) {
    padding-left: $mobileSidebarWidth;
  }

  @media (min-width: ($MQMobile + 1px)) {
    .theme-container:not(.has-sidebar) & {
      padding-left: 0;
    }
  }

  // wide mobile
  @media (max-width: $MQMobile) {
    padding-left: 0;
  }

  @media (min-width: $MQWide) {
    .has-anchor & {
      padding-right: 16rem;
    }
  }
}
</style>
