import { h } from 'vue';
import { usePageData } from '@vuepress/client';
import { useRoute } from 'vue-router';
import { isActive } from '../utils';

import type { PageHeader } from '@vuepress/core';
import type { FunctionalComponent, PropType, VNode } from 'vue';

interface AnchorItem {
    text: string;
    level?: number;
    link: string;
}

const renderLink = ({ text, link, level }: AnchorItem): VNode =>
    h(
        'RouterLink',
        {
            to: link,
            activeClass: '',
            exactActiveClass: '',
            class: {
                'anchor-link': true,
                [level ? `heading${level}` : '']: level,
            },
        },
        h('div', text)
    );

const renderChildren = (header: PageHeader[]): VNode => {
    const route = useRoute();

    return h(
        'ul',
        { class: 'anchor-list' },
        header.map((child) => {
            const active = isActive(route, `${route.path}#${child.slug}`);

            return h(
                'li',
                { class: { anchor: true, active } },
                renderLink({
                    text: child.title,
                    link: `${route.path}#${child.slug}`,
                    level: child.level,
                })
            );
        })
    );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const Anchor: FunctionalComponent<{ items: PageHeader[] }> = (props) => {
    const page = usePageData();

    return h(
        'div',
        { class: 'anchor-place-holder' },
        h(
            'aside',
            { id: 'anchor' },
            h(
                'div',
                { class: 'anchor-wrapper' },
                props.items.length
                    ? renderChildren(props.items)
                    : page.value.headers
                    ? renderChildren(page.value.headers)
                    : []
            )
        )
    );
};

Anchor.displayName = 'Anchor';

Anchor.props = {
    items: {
        type: Array as PropType<PageHeader[]>,
        default: (): PageHeader[] => [],
    },
};

export default Anchor;
