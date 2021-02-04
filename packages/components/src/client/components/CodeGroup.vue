<script lang="ts">
import { defineComponent, h, ref } from "vue";
import type { VNode } from "vue";

export default defineComponent({
  name: "CodeGroup",

  setup(_props, { slots }) {
    // index of current active item
    const activeIndex = ref(-1);

    return (): VNode | null => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won't be changed once the
      // `setup()` function of current component is called

      // get children code-group-item
      const items = (slots.default?.() || [])
        .filter(
          (vnode) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            vnode.type.name === "CodeGroupItem"
        )
        .map((vnode) => {
          if (vnode.props === null) {
            vnode.props = {};
          }
          return vnode as VNode & { props: Exclude<VNode["props"], null> };
        });

      // do not render anything if there is no code-group-item
      if (items.length === 0) {
        return null;
      }

      if (activeIndex.value === -1) {
        // initial state

        // find the index of the code-group-item with `active` props
        activeIndex.value = items.findIndex(
          (vnode) => vnode.props.active === "" || vnode.props.active === true
        );

        // if there is no `active` props on code-group-item, set the first item active
        if (activeIndex.value === -1) {
          activeIndex.value = 0;
        }
      } else {
        // re-render triggered by modifying `activeIndex` ref

        // set the active item
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value;
        });
      }

      return h("div", { class: "code-group" }, [
        h(
          "div",
          { class: "code-group-nav" },
          h(
            "ul",
            { class: "code-group-ul" },
            items.map((vnode, index) =>
              h(
                "li",
                { class: "code-group-li" },
                h(
                  "button",
                  {
                    class: `code-group-nav-tab${
                      index === activeIndex.value ? " active" : ""
                    }`,
                    onClick: () => (activeIndex.value = index),
                  },
                  vnode.props.title
                )
              )
            )
          )
        ),
        items,
      ]);
    };
  },
});
</script>

<style lang="scss">
.code-group-nav {
  margin-top: 0.85rem;
  /* 2 * margin + border-radius of <pre> tag */
  margin-bottom: calc(-1.7rem - 6px);
  padding-bottom: calc(1.7rem - 6px);
  padding-left: 10px;
  padding-top: 10px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: var(--code-bgcolor);

  @media (max-width: var(--mobile-narrow-break-point)) {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    border-radius: 0;
  }
}

.code-group-ul {
  display: inline-flex;
  margin: auto 0;
  padding-left: 0;
  list-style: none;
}

.code-group-nav-tab {
  border: 0;
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  font-size: 0.85em;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;

  &:focus {
    outline: none;
  }

  &.active {
    border-bottom: var(--accent-color) 1px solid;
  }
}
</style>
