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
      if (items.length === 0) return null;

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
        items.forEach((vnode, index) => {
          vnode.props.active = index === activeIndex.value;
        });
      }

      return h("div", { class: "code-group" }, [
        h(
          "ul",
          { class: "code-group-nav" },
          items.map((vnode, index) =>
            h(
              "li",
              {
                class: {
                  "code-group-nav-tab": true,
                  active: index === activeIndex.value,
                },
                role: "button",
                onClick: () => {
                  activeIndex.value = index;
                },
              },
              vnode.props.title
            )
          )
        ),
        items,
      ]);
    };
  },
});
