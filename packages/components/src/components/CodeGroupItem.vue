<script lang="ts">
import { VNode, defineComponent, h } from "vue";

export default defineComponent({
  name: "CodeGroupItem",

  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props, { slots }) {
    return (): VNode =>
      h("div", { class: { "code-group-item": true, active: props.active } }, [
        slots.default?.(),
      ]);
  },
});
</script>

<style lang="scss">
.code-group-item {
  display: none;

  &.active {
    display: block;
  }
}
</style>
