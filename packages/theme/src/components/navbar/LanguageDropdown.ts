import { defineComponent, h } from "vue";
import DropdownLink from "./DropdownLink.vue";
import I18nIcon from "../../icons/I18nIcon.vue";
import NavLink from "../NavLink.vue";
import { useNavbarSelectLanguage } from "../../composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "LanguageDropdown",

  components: { NavLink, DropdownLink },

  setup() {
    const dropdown = useNavbarSelectLanguage();

    return (): VNode | null =>
      dropdown.value.length
        ? h("div", { class: "nav-links" }, [
            h("div", { class: "nav-item" }, [
              h(DropdownLink, { item: dropdown.value }, [
                h(I18nIcon, {
                  slot: "title",
                  style: {
                    width: "1rem",
                    height: "1rem",
                    verticalAlign: "middle",
                    marginLeft: "1rem",
                  },
                }),
              ]),
            ]),
          ])
        : null;
  },
});
