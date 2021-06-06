<template>
    <nav v-if="prevNavLink || nextNavLink" class="page-nav">
        <p class="inner">
            <span v-if="prevNavLink" class="prev">
                <NavLink :item="prevNavLink">
                    <template #before>
                        <PrevIcon />
                    </template>
                </NavLink>
            </span>

            <span v-if="nextNavLink" class="next">
                <NavLink :item="nextNavLink">
                    <template #after>
                        <NextIcon />
                    </template>
                </NavLink>
            </span>
        </p>
    </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { usePageFrontmatter } from '@vuepress/client';
import { isPlainObject, isString } from '@vuepress/shared';
import { useNavLink, useSidebarItems } from '../composables';
import type { NavLink as NavLinkType, ResolvedSidebarItem } from '../types';
import NavLink from './NavLink.vue';
import NextIcon from './icons/NextIcon.vue';
import PrevIcon from './icons/PrevIcon.vue';
/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (conf: unknown): null | false | NavLinkType => {
    if (conf === false) return null;

    if (isString(conf)) return useNavLink(conf);

    if (isPlainObject<NavLinkType>(conf)) return conf;

    return false;
};

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
    sidebarItems: ResolvedSidebarItem[],
    currentPath: string,
    offset: number
): null | NavLinkType => {
    const index = sidebarItems.findIndex((item) => item.link === currentPath);

    if (index !== -1) {
        const targetItem = sidebarItems[index + offset];

        if (!targetItem?.link) return null;

        return targetItem as NavLinkType;
    }

    for (const item of sidebarItems)
        if (item.children) {
            const childResult = resolveFromSidebarItems(item.children, currentPath, offset);

            if (childResult) return childResult;
        }

    return null;
};

export default defineComponent({
    name: 'PageNav',

    components: {
        NavLink,
        NextIcon,
        PrevIcon,
    },

    setup() {
        const frontmatter = usePageFrontmatter();
        const sidebarItems = useSidebarItems();
        const route = useRoute();

        const prevNavLink = computed(() => {
            const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);

            return prevConfig !== false ? prevConfig : resolveFromSidebarItems(sidebarItems.value, route.path, -1);
        });

        const nextNavLink = computed(() => {
            const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);

            return nextConfig !== false ? nextConfig : resolveFromSidebarItems(sidebarItems.value, route.path, 1);
        });

        return {
            prevNavLink,
            nextNavLink,
        };
    },
});
</script>

<style lang="stylus">
@require '../styles/palette.styl'
@require '../styles/wrapper.styl'

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  font-family Arial, Helvetica, sans-serif

  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid var(--border-color)
    padding-top 1rem
    overflow auto

  .next
    float right

  .prev, .next
    .icon
      position relative
      top 0.125em
      width 1em
      height 1em
      color var(--accent-color)
</style>
