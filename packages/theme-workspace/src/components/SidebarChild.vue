<script lang="ts">
import { h } from 'vue';
import { useRoute } from 'vue-router';
import { isActive } from '../utils';
import NavLink from './NavLink.vue';

import type { FunctionalComponent, VNode } from 'vue';
import type { ResolvedSidebarItem } from '../types';

const renderItem = (item: ResolvedSidebarItem, props: VNode['props']): VNode =>
    item.link
        ? // if the item has link, render it as `<NavLink>`
          h(NavLink, {
              ...props,
              item,
          })
        : // if the item only has text, render it as `<p>`
          h('p', props, item.text);

const renderChildren = (item: ResolvedSidebarItem, depth: number): VNode | null => {
    if (!item.children?.length) return null;

    return h(
        'ul',
        {
            class: {
                'sidebar-sub-headers': depth > 0,
            },
        },
        item.children.map((child) =>
            h(
                'li',
                h(SidebarChild, {
                    item: child,
                    depth: depth + 1,
                })
            )
        )
    );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const SidebarChild: FunctionalComponent<{
    item: ResolvedSidebarItem;
    depth: number;
}> = ({ item, depth }) => {
    if (item.isGroup)
        return [
            h('section', { class: 'sidebar-group' }, [
                renderItem(item, { class: 'sidebar-heading' }),
                renderChildren(item, depth),
            ]),
        ];

    const route = useRoute();
    const active = isActive(route, item.link) || item.children?.some((child) => isActive(route, child.link));

    return [
        renderItem(item, {
            class: {
                'sidebar-link': true,
                active,
            },
        }),
        renderChildren(item, depth),
    ];
};

SidebarChild.displayName = 'SidebarChild';

SidebarChild.props = {
    item: {
        type: Object,
        required: true,
    },
    depth: {
        type: Number,
        required: false,
        default: 0,
    },
};

export default SidebarChild;
</script>

<style lang="stylus">
@require '../styles/palette.styl'

.sidebar-group
  .sidebar-group
    padding-left 0.5em

  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      color inherit
      cursor auto

  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0

    & > .sidebar-heading
      padding-left 2rem
      font-size 0.95em
      font-weight normal
      line-height 1.4

      &:not(.clickable)
        opacity 0.8

    & > .sidebar-group-items
      padding-left 1rem

      & > li > .sidebar-link
        border-left none
        font-size 0.95em

  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  box-sizing border-box
  width 100%
  margin 0
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  border-left 0.25rem solid transparent
  color var(--text-color)
  font-size 1.1em
  font-weight bold
  cursor pointer
  transition color 0.15s ease
  user-select none

  &.open, &:hover
    color inherit

  .arrow
    position relative
    top -0.12em
    left 0.5em

  &.clickable
    &.active
      border-left-color var(--accent-color)
      color var(--accent-color)
      font-weight 600

    &:hover
      color var(--accent-color)

.sidebar-group-items
  font-size 0.95em
  transition height 0.1s ease-out
  overflow hidden

.sidebar
  .sidebar-links
    ul.sidebar-sub-headers
      padding-left 1rem
      font-size 0.95em

      .has-anchor &
        @media (min-width $MQWide)
          display none

a.sidebar-link
  display inline-block
  box-sizing border-box
  width 100%
  padding 0.35rem 1rem 0.35rem 1.25rem
  border-left 0.25rem solid transparent
  color var(--text-color)
  font-size 1em
  line-height 1.4
  font-weight 400

  &:hover
    color var(--accent-color)

  &.active
    font-weight 600
    color var(--accent-color)
    border-left-color var(--accent-color)

  .sidebar-group &
    padding-left 2rem

  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none

    &.active
      font-weight 500
</style>
