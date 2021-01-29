<template>
  <RawOutboundLink>
    <span class="sr-only">{{ $themeLocale.openInNewWindow }}</span>
  </RawOutboundLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OutboundLink } from "@vuepress/client";

export default defineComponent({
  name: "OutboundLink",

  components: {
    RawOutboundLink: OutboundLink,
  },
});
</script>
