<template>
  <RawOutboundLink>
    <span class="sr-only">{{ $themeLocale.openInNewWindow }}</span>
  </RawOutboundLink>
</template>

<script lang="ts">
import { OutboundLink } from "@vuepress/client";
import { defineComponent } from "vue";

export default defineComponent({
  name: "OutboundLink",

  components: { RawOutboundLink: OutboundLink },
});
</script>
