<script lang="ts">
import { computed, defineComponent, h } from "vue";
import type { VNode } from "vue";

interface ElementOption {
  class: string[];
  style: Record<string, string>;
  "data-color"?: string;
}

export default defineComponent({
  name: "MyBadge",

  props: {
    type: { type: String, default: "tip" },
    text: { type: String, default: "" },
    vertical: { type: String, default: "top" },
    color: { type: String, default: "" },
  },

  setup(props, { slots }) {
    const options = computed<ElementOption>(() => {
      const result: ElementOption = {
        class: ["badge", props.type],
        style: { verticalAlign: props.vertical },
      };

      if (props.color) {
        result.class.push("diy");
        result.style.backgroundColor = props.color;
        result["data-color"] = props.color;
      }

      return result;
    });

    return (): VNode =>
      h("span", options.value, props.text || slots.default?.());
  },
});
</script>

<style lang="scss">
.badge {
  display: inline-block;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: var(--white);
  background-color: var(--accent-color);
  vertical-align: top;

  .table-of-contents & {
    vertical-align: middle;
  }

  &.tip {
    background-color: var(--badge-tip-color);
  }

  &.warning {
    background-color: var(--badge-warning-color);
  }

  &.danger {
    background-color: var(--badge-danger-color);
  }

  & + & {
    margin-left: 5px;
  }
}
</style>
