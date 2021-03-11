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
          if (vnode.props === null) vnode.props = {};

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
        if (activeIndex.value === -1) activeIndex.value = 0;
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
                    class: {
                      "code-group-nav-tab": true,
                      active: index === activeIndex.value,
                    },
                    onClick: () => {
                      activeIndex.value = index;
                    },
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
  /* 2 * margin + border-radius of <pre> tag */
  margin: 0.85rem 0 calc(-1.7rem - 7px);
  padding: 0 5px calc(1.7rem - 7px);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: var(--code-border-color);

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
  position: relative;
  border: 0;
  padding: 6px 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: transparent;
  font-size: 0.85em;
  line-height: 1.4;
  color: var(--text-color, #242424);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--code-highlight-line-color);
  }

  &::before,
  &::after {
    position: absolute;
    z-index: 1;
    content: " ";
    bottom: 0;
    width: 8px;
    height: 8px;
  }

  &::before {
    right: 100%;
  }

  &::after {
    left: 100%;
  }

  &:focus {
    outline: none;
  }

  &.active {
    background-color: var(--code-bg-color);

    &:before {
      background: radial-gradient(
        16px at left top,
        transparent 50%,
        var(--code-bg-color) 50%
      );
    }

    &:after {
      background: radial-gradient(
        16px at right top,
        transparent 50%,
        var(--code-bg-color) 50%
      );
    }
  }
}
</style>
