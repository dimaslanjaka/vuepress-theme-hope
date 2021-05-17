import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";
import { computed, defineComponent, h, ref, VNode } from "vue";
import type { ThemeHopeOptions } from "../types";

export default defineComponent({
  name: "Clipboard",

  props: {
    html: { type: String, default: "" },
    lang: { type: String, default: "en-US" },
  },

  setup(props) {
    const location = ref("");
    const themeLocale = useThemeLocaleData<ThemeHopeOptions>();

    if (typeof window !== "undefined")
      location.value = window.location.toString();

    const copyright = computed(() => {
      const { author } = themeLocale.value;
      // TODO: Move i18n in one place
      const content: Record<string, string> = {
        "zh-CN": `${props.html}\n-----\n${
          author ? `著作权归${author}所有。\n` : ""
        }链接: ${location.value}`,
        "en-US": `${props.html}\n-----\n${
          author ? `Copyright by ${author}.\n` : ""
        }Link: ${location.value}`,
        "vi-VN": `${props.html}\n-----\n${
          author ? `bản quyền bởi ${author}.\n` : ""
        }Liên kết: ${location.value}`,
      };

      return content[props.lang];
    });

    return (): VNode => h("div", { innerHTML: copyright });
  },
});
