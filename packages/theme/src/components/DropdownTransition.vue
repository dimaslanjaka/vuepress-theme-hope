<template>
  <Transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropdownTransition",

  setup() {
    const setHeight = (item: HTMLElement): void => {
      // explicitly set height so that it can be transitioned
      item.style.height = `${item.scrollHeight}px`;
    };

    const unsetHeight = (item: HTMLElement): void => {
      item.style.height = "";
    };

    return {
      setHeight,
      unsetHeight,
    };
  },
});
</script>

<style lang="stylus">
.dropdown-enter-from, .dropdown-leave-to
  height 0 !important
</style>
