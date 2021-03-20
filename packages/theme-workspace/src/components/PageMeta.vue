<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="meta-item edit-link">
      <NavLink class="meta-item-label" :item="editNavLink" />
    </div>

    <div v-if="lastUpdated" class="meta-item last-updated">
      <span class="meta-item-label">{{ $themeLocale.lastUpdatedText }}: </span>
      <span class="meta-item-info">{{ lastUpdated }}</span>
    </div>

    <div
      v-if="contributors && contributors.length"
      class="meta-item contributors"
    >
      <span class="meta-item-label">{{ $themeLocale.contributorsText }}: </span>
      <span class="meta-item-info">
        <template v-for="(contributor, index) in contributors" :key="index">
          <span class="contributor" :title="`email: ${contributor.email}`">
            {{ contributor.name }}
          </span>
          <template v-if="index !== contributors.length - 1">, </template>
        </template>
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  useContributors,
  useEditNavLink,
  useLastUpdated,
} from "../composables";
import NavLink from "./NavLink.vue";

export default defineComponent({
  name: "PageMeta",

  components: {
    NavLink,
  },

  setup() {
    const editNavLink = useEditNavLink();
    const lastUpdated = useLastUpdated();
    const contributors = useContributors();

    return {
      editNavLink,
      lastUpdated,
      contributors,
    };
  },
});
</script>

<style lang="stylus">
@require '../styles/palette.styl'
@require '../styles/wrapper.styl'

.page-meta
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  font-family Arial, Helvetica, sans-serif
  overflow auto

  .meta-item
    cursor default
    margin-top 0.8rem

    .meta-item-label
      font-weight 500
      color lighten($textColor, 25%)

    .meta-item-info
      font-weight 400
      color #767676

  .edit-link
    display inline-block
    margin-right 0.25rem

    @media (max-width $MQMobile)
      margin-bottom 8px
      font-size 0.8em

    a
      color var(--accent-color-l10)

  .last-updated
    float right

    @media (max-width $MQMobile)
      font-size 0.8em
      float none
      // text-align left

    .prefix
      font-weight 500
      color var(--text-color-l25)

    .time
      font-weight 400
      color var(--dark-grey)

  .contributors
    @media (max-width $MQMobile)
      font-size 0.8em
</style>
