<script lang="ts">
import { computed, defineComponent, h, VNode } from "vue";

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
    const options: ElementOption = computed(() => {
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (): VNode => h("span", options, props.text || slots.default?.());
  },
});
</script>

<style lang="stylus">
@require '../../styles/palette'

$badgeTipColor ?= $tipColor
$badgeWarningColor ?= $warningColor
$badgeDangerColor ?= $dangerColor

.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color var(--white)
  background-color #42b983
  vertical-align top

  .table-of-contents &
    vertical-align middle

  &.tip
    background-color $badgeTipColor

  &.warning
    background-color $badgeWarningColor

  &.danger
    background-color $badgeDangerColor

  & + &
    margin-left 5px
</style>
