import { Transition, defineComponent, h } from 'vue';

import type { VNode } from 'vue';

export default defineComponent({
    name: 'DropTransition',

    props: {
        delay: { type: Number, default: 0 },
        duration: { type: Number, default: 0.25 },
    },

    setup(props, { slots }) {
        const setStyle = (el: Element): void => {
            const htmlElement = el as HTMLElement;

            htmlElement.style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
            htmlElement.style.transform = 'translateY(-20px)';
            htmlElement.style.opacity = '0';
        };

        const unsetStyle = (el: Element): void => {
            const htmlElement = el as HTMLElement;

            htmlElement.style.transform = 'translateY(0)';
            htmlElement.style.opacity = '1';
        };

        return (): VNode =>
            h(
                Transition,
                {
                    name: 'drop',
                    appear: true,
                    onAppear: setStyle,
                    onAfterAppear: unsetStyle,
                },
                { default: slots.default?.() }
            );
    },
});
