<template>
    <RouterLink
        v-if="isRouterLink"
        class="nav-link"
        :class="{ active }"
        :to="item.link"
        :aria-label="linkAriaLabel"
        v-bind="$attrs"
        @focusout="focusoutAction"
    >
        <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
        {{ item.text }}
    </RouterLink>
    <a
        v-else
        class="nav-link external"
        :href="item.link"
        :rel="linkRel"
        :target="linkTarget"
        :aria-label="linkAriaLabel"
        v-bind="$attrs"
        @focusout="focusoutAction"
    >
        <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
        {{ item.text }}
        <OutboundLink v-if="isBlankTarget" />
    </a>
</template>

<script lang="ts">
import { useSiteData } from '@vuepress/client';
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client';
import { isLinkHttp, isLinkMailto, isLinkTel } from '@vuepress/shared';
import { computed, defineComponent, toRef } from 'vue';

import type { PropType } from 'vue';
import { DefaultThemeData, NavLink } from '../../types';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'NavLink',

    inheritAttrs: false,

    props: {
        item: {
            type: Object as PropType<NavLink>,
            required: true,
        },
    },

    emits: ['focusout'],

    setup(props, { emit }) {
        const route = useRoute();
        const site = useSiteData();
        const item = toRef(props, 'item');
        const themeData = useThemeData<DefaultThemeData>();

        // if the link has http protocol
        const hasHttpProtocol = computed(() => isLinkHttp(item.value.link));

        // if the link has non-http protocol
        const hasNonHttpProtocal = computed(() => isLinkMailto(item.value.link) || isLinkTel(item.value.link));

        // resolve the `target` attr
        const linkTarget = computed(() =>
            hasNonHttpProtocal.value
                ? null
                : item.value.target
                ? item.value.target
                : hasHttpProtocol.value
                ? '_blank'
                : null
        );

        // if the `target` attr is '_blank'
        const isBlankTarget = computed(() => linkTarget.value === '_blank');

        // is `<RouterLink>` or not
        const isRouterLink = computed(
            () => !hasHttpProtocol.value && !hasNonHttpProtocal.value && !isBlankTarget.value
        );

        // is the `exact` prop of `<RouterLink>` should be true
        const isExact = computed(() => {
            const localeKeys = Object.keys(site.value.locales);
            if (localeKeys.length) {
                return localeKeys.some((key) => key === item.value.link);
            }
            return item.value.link === '/';
        });

        // resolve the `rel` attr
        const linkRel = computed(() =>
            hasNonHttpProtocal.value
                ? null
                : item.value.rel
                ? item.value.rel
                : isBlankTarget.value
                ? 'noopener noreferrer'
                : null
        );

        // resolve the `aria-label` attr
        const linkAriaLabel = computed(() => item.value.ariaLabel || item.value.text);

        const iconPrefix = computed(() => {
            const { iconPrefix } = themeData.value;

            return iconPrefix === '' ? '' : iconPrefix || 'icon-';
        });

        const active = computed(() => {
            const { link } = item.value;

            return Object.keys(site.value.locales).some((rootLink) => rootLink === link)
                ? // when link is home path, use exact match
                  route.path === link
                : // or inclusive match
                  route.path.startsWith(link);
        });

        const focusoutAction = (): void => emit('focusout');

        return {
            active,
            iconPrefix,
            focusoutAction,
            isBlankTarget,
            isExact,
            isRouterLink,
            linkRel,
            linkTarget,
            linkAriaLabel,
        };
    },
});
</script>
