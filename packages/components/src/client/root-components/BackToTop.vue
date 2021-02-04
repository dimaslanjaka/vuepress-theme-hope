<template>
  <transition name="fade">
    <button
      v-if="isDisplay"
      :aria-label="hint"
      class="back-to-top"
      data-balloon-pos="left"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M512 0C229.517 0 0 229.517 0 512s227.752 512 512 512c282.483 0 512-227.752 512-512C1024 229.517 794.483 0 512 0zM351.338 271.89h305.434c14.125 0 26.483 12.358 26.483 26.482s-12.358 26.483-26.483 26.483H351.338c-14.124 0-26.483-12.358-26.483-26.483 0-15.89 12.359-26.482 26.483-26.482z m331.917 303.669c-12.358 12.358-33.545 12.358-45.903 0L531.42 471.393v270.124c0 14.124-12.359 26.483-26.483 26.483s-26.483-12.359-26.483-26.483v-271.89l-105.93 104.166c-12.36 12.359-33.546 12.359-45.904 0-12.359-12.359-12.359-31.78 0-45.903l155.365-151.835c7.062-7.062 14.124-8.827 22.952-8.827s15.89 3.53 22.952 8.827L683.255 527.89c12.359 15.89 12.359 35.31 0 47.669z"
          fill="currentColor"
        />
      </svg>
    </button>
  </transition>
</template>

<script lang="ts">
import {
  onBeforeUnmount,
  computed,
  defineComponent,
  onMounted,
  ref,
} from "vue";
import {
  useRouteLocale,
  usePageFrontmatter,
  useThemeData,
} from "@vuepress/client";
import debounce from "lodash.debounce";
import { componentI18n } from "../define";

export default defineComponent({
  name: "BackToTop",

  props: {
    threshold: { type: Number, default: 300 },
  },

  setup(props) {
    const pageFrontmatter = usePageFrontmatter();
    const themeData = useThemeData();
    const routeLocale = useRouteLocale();

    /** Scroll distance */
    const scrollTop = ref(0);

    const thresholdDistance = computed<number>(() => {
      const { backToTop } = themeData.value;

      return typeof backToTop === "number" ? backToTop : props.threshold;
    });

    /** Whether to display button */
    const show = computed<boolean>(() => {
      const globalEnable = themeData.value.backToTop !== false;
      const pageEnable = pageFrontmatter.value.backToTop as boolean;

      return (
        (pageEnable || (globalEnable && pageEnable !== false)) &&
        scrollTop.value > thresholdDistance.value
      );
    });

    const hint = computed(
      () => componentI18n[routeLocale.value || "/"].backToTop
    );

    // Get scroll distance
    const getScrollTop = (): number =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // Scroll to top
    const scrollToTop = (): void => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      scrollTop.value = 0;
    };

    const scrollHandler = debounce(() => {
      scrollTop.value = getScrollTop();
    }, 100);

    onMounted(() => {
      scrollTop.value = getScrollTop();
      window.addEventListener("scroll", scrollHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scrollHandler);
    });

    return {
      hint,
      scrollToTop,
      show,
    };
  },
});
</script>

<style lang="scss">
@use "~@mr-hope/vuepress-shared/styles/reset";

.back-to-top {
  @include reset.button;
  position: fixed !important;
  right: 1rem;
  bottom: 4rem;
  z-index: 10;
  width: 3rem;
  height: 3rem;
  padding: 8px;

  &:hover {
    color: var(--accent-color-l25);
  }

  svg {
    width: 100%;
    border-radius: 50%;
    background: var(--bg-color);
    color: var(--accent-color);
    overflow: hidden;
    fill: currentcolor;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
