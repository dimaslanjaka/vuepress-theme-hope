import { defineComponent, h } from 'vue';
import DropdownLink from './DropdownLink.vue';
import NavLink from './NavLink.vue';
import { useNavbarConfig } from '../../composables';

import type { VNode } from 'vue';

export default defineComponent({
    name: 'NavLinks',

    components: {
        DropdownLink,
        NavLink,
    },

    setup() {
        const navbarLinks = useNavbarConfig();

        return (): VNode | null =>
            navbarLinks.value.length
                ? h(
                      'nav',
                      { class: 'nav-links' },
                      navbarLinks.value.map((item) =>
                          h(
                              'div',
                              { class: 'nav-item' },
                              'children' in item ? h(DropdownLink, { item }) : h(NavLink, { item })
                          )
                      )
                  )
                : null;
    },
});
