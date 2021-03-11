<script lang="ts">
import { h } from "vue";
import { usePageData } from "@vuepress/client";
import { useRoute } from "vue-router";
import { isActive } from "../utils";

import type { FunctionalComponent, VNode } from "vue";
import type { SidebarHeader } from "../util/sidebar";

interface AnchorItem {
  text: string;
  level?: number;
  link: string;
  active: boolean;
}

const renderLink = ({ text, link, level, active }: AnchorItem): VNode =>
  h(
    "RouterLink",
    {
      to: link,
      activeClass: "",
      exactActiveClass: "",
      class: {
        active,
        "anchor-link": true,
        [level ? `heading${level}` : ""]: level,
      },
    },
    h("div", text)
  );

const renderChildren = (header: SidebarHeader[]): VNode => {
  const route = useRoute();

  return h(
    "ul",
    { class: "anchor-list" },
    header.map((child: SidebarHeader) => {
      const active = isActive(route, `${route.path}#${child.slug}`);

      return h("li", { class: "anchor" }, [
        renderLink({
          text: child.title,
          link: `${route.path}#${child.slug}`,
          level: child.level,
          active,
        }),
      ]);
    })
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const Anchor: FunctionalComponent = () => {
  const page = usePageData();

  return h(
    "div",
    { class: "anchor-place-holder" },
    h(
      "aside",
      { id: "anchor" },
      h(
        "div",
        { class: "anchor-wrapper" },
        page.value.headers ? renderChildren(page.value.headers) : []
      )
    )
  );
};

Anchor.displayName = "Anchor";

export default Anchor;
</script>

<style lang="scss">
.anchor-place-holder {
  position: sticky;
  top: ($navbarHeight + 2rem);
  max-width: $contentWidth;
  margin: 0 auto;
  padding: 0 2.5rem;

  @media (max-width: $MQNarrow) {
    padding: 0 1.5rem;
  }

  & + .theme-default-content:not(.custom) {
    padding-top: 0;
  }
}

#anchor {
  display: none;
  position: absolute;
  left: calc(100% + 0.5rem);
  min-width: 10rem;
  max-width: 15rem;
  max-height: 80vh;
  overflow-y: scroll;

  @media (min-width: $MQWide) {
    .has-anchor & {
      display: block;
    }
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb:vertical {
    background: #ddd;

    .theme-dark & {
      background: #333;
    }
  }

  .anchor-wrapper {
    position: relative;
    padding-left: 8px;

    &::after {
      content: " ";
      position: absolute;
      top: 15px;
      left: 4px;
      bottom: 15px;
      width: 4px;
      margin-left: -2px;
      background: var(--border-color);
      z-index: -1;
    }

    > .anchor-list {
      margin: 0;
    }
  }

  .anchor-list {
    padding-left: 0;
  }

  .anchor {
    box-sizing: border-box;
    padding: 0px 8px;
    line-height: 1.5;
    list-style: none;

    .anchor-link {
      display: inline-block;
      position: relative;
      max-width: 100%;
      color: var(--light-grey);

      > div {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      &::before {
        content: " ";
        position: absolute;
        z-index: 2;
        top: 50%;
        left: -16px;
        width: 6px;
        height: 6px;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        transform: translateY(-3px);
      }

      &:hover,
      &.active {
        color: var(--accent-color);

        &::before {
          background: var(--accent-color);
        }
      }

      @for $heading from 2 through 6 {
        &.heading#{$heading} {
          padding-left: ($heading * 8 - 16) px;
          font-size: (16 - $heading) px;
        }
      }
    }
  }
}
</style>
