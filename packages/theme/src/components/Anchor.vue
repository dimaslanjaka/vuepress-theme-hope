<script lang="ts">
import { h } from "vue";
import type { FunctionalComponent, VNode, PropType } from "vue";
import { SidebarHeader, groupSidebarHeaders } from "../util/sidebar";
import { RouteLocation, useRoute } from "vue-router";
import { isActive } from "../utils";
import { usePageFrontmatter, useThemeLocaleData } from "@vuepress/client";

interface AnchorItem {
  link: string;
  text: string;
  active: boolean;
}

const renderLink = ({ text, link, active }: AnchorItem): VNode =>
  h(
    "RouterLink",
    {
      to: link,
      activeClass: "",
      exactActiveClass: "",
      class: {
        active,
        "anchor-link": true,
      },
    },
    h("div", {}, text)
  );

interface RenderChildrenOptions {
  children: SidebarHeader[] | false;
  path: string;
  route: RouteLocation;
  depth?: number;
  maxDepth: number;
}

const renderChildren = ({
  children,
  path,
  route,
  maxDepth,
  depth = 2,
}: RenderChildrenOptions): VNode | null => {
  if (!children || depth > maxDepth) return null;

  return h(
    "ul",
    { class: "anchor-list" },
    children.map((child: SidebarHeader) => {
      const active = isActive(route, `${path}#${child.slug}`);

      return h("li", { class: ["anchor", `anchor${depth}`] }, [
        renderLink({
          text: child.title,
          link: `${path}#${child.slug}`,
          active,
        }),
        renderChildren({
          children: child.children || false,
          path,
          route,
          maxDepth,
          depth: depth + 1,
        }),
      ]);
    })
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const Anchor: FunctionalComponent<{ header: SidebarHeader[] }> = ({
  header = [],
}) => {
  const pageFrontmatter = usePageFrontmatter();
  const themeLocaleData = useThemeLocaleData();
  const route = useRoute();
  const maxDepth =
    (pageFrontmatter.value.sidebarDepth ||
      (themeLocaleData.value.sidebarDepth as number | undefined) ||
      themeLocaleData.value.sidebarDepth ||
      2) + 1;
  const children = groupSidebarHeaders(header);

  return h("div", { attrs: { class: "anchor-place-holder" } }, [
    h("aside", { attrs: { id: "anchor" } }, [
      h("div", { class: "anchor-wrapper" }, [
        renderChildren({
          children,
          path: route.path,
          route,
          maxDepth,
        }),
      ]),
    ]),
  ]);
};

Anchor.displayName = "Anchor";

Anchor.props = {
  header: {
    type: Array as PropType<SidebarHeader[]>,
    default: (): SidebarHeader[] => [],
  },
};

export default Anchor;
</script>

<style lang="stylus">
@require '../styles/palette'

$headings = 2 3 4 5 6

.anchor-place-holder
  position sticky
  top ($navbarHeight + 2rem)
  max-width $contentWidth
  margin 0 auto
  padding 0 2.5rem

  @media (max-width $MQNarrow)
    padding 0 1.5rem

  & + .theme-default-content:not(.custom)
    padding-top 0

#anchor
  display none
  position absolute
  left calc(100% + 0.5rem)
  min-width 10rem
  max-width 15rem
  max-height 80vh
  overflow-y scroll

  @media (min-width $MQWide)
    .has-anchor &
      display block

  &::-webkit-scrollbar-track-piece
    background transparent

  &::-webkit-scrollbar
    width 3px

  &::-webkit-scrollbar-thumb:vertical
    background var(--light-grey)

  .anchor-wrapper
    position relative
    padding-left 8px

    &::after
      content ' '
      position absolute
      top 15px
      left 4px
      bottom 15px
      width 4px
      margin-left -2px
      background var(--border-color)
      z-index -1

    > .anchor-list
      margin 0

  .anchor-list
    padding-left 0

  .anchor
    box-sizing border-box
    padding 0px 8px
    line-height 1.5
    list-style none

    .anchor-link
      display inline-block
      position relative
      max-width 100%
      color var(--light-grey)

      > div
        text-overflow ellipsis
        white-space nowrap
        overflow hidden

      &::before
        content ' '
        position absolute
        z-index 2
        top 50%
        width 6px
        height 6px
        margin-left -3px
        margin-top -3px
        background var(--bgcolor)
        border 1px solid var(--border-color)
        border-radius 50%

      &:hover, &.active
        color var(--accent-color)

        &::before
          background var(--accent-color)

    for $heading in $headings
      &.anchor{$heading} .anchor-link
        font-size (16 - $heading)px

        &::before
          left (-8 * $heading + 4)px
</style>
