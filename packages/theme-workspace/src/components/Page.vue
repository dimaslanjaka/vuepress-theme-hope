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
