<script lang="ts">
import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/composables";
import { defineComponent, h, onMounted, ref } from "vue";
import * as screenfull from "screenfull";
import { CancelFullScreenIcon, EnterFullScreenIcon } from "../icons";

import type { Screenfull } from "screenfull";
import type { VNode } from "vue";

export default defineComponent({
  name: "ScreenFull",

  components: { CancelFullScreenIcon, EnterFullScreenIcon },

  setup() {
    const canFullscreen = ref(false);
    const isFullscreen = ref(false);
    const themeLocale = useThemeLocaleData();

    onMounted(() => {
      canFullscreen.value =
        screenfull.isEnabled && themeLocale.value.fullscreen !== false;
    });

    return (): VNode | null =>
      canFullscreen.value
        ? h(
            "button",
            {
              class: "full-screen",
              onClick: () => {
                if (screenfull.isEnabled)
                  void screenfull.toggle().then(() => {
                    isFullscreen.value = (screenfull as Screenfull).isFullscreen;
                  });
              },
            },
            h(isFullscreen.value ? CancelFullScreenIcon : EnterFullScreenIcon)
          )
        : null;
  },
});
</script>

<style lang="scss">
@use '~@mr-hope/vuepress-shared/styles/reset';

button.full-screen,
.cancel-full-screen {
  @include reset.button;
  width: 1.8rem;
  height: 1.8rem;
  padding: 4px;
  color: #aaa;

  & svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
  }
}

.enter-fullscreen-icon:hover,
.cancel-fullscreen-icon {
  color: var(--accent-color);
}

.cancel-fullscreen-icon:hover {
  color: #aaa;
}
</style>
