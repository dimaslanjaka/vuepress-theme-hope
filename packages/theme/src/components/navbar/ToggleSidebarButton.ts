import { defineComponent, h } from 'vue';
import type { VNode } from 'vue';

export default defineComponent({
    name: 'ToggleSidebarButton',

    emits: ['toggle'],

    setup(_props, { emit }) {
        return (): VNode =>
            h(
                'button',
                { class: 'toggle-sidebar-button', onClick: () => emit('toggle') },
                h('span', { class: 'icon' })
            );
    },
});
