import { computed, defineComponent, h, onMounted, onUnmounted, ref, VNode } from 'vue';
import { useRouter } from 'vue-router';
import { usePageData, usePageFrontmatter, useSiteData } from '@vuepress/client';
import { useThemeData, useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client';
import throttle from 'lodash.throttle';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import PageFooter from '../components/PageFooter.vue';
import { useSidebarItems } from '../composables';

import type { ThemeHopeOptions } from '../types';

export default defineComponent({
    name: 'Common',

    components: {
        Navbar,
        PageFooter,
        Sidebar,
    },

    setup(_props, { slots }) {
        const frontmatter = usePageFrontmatter();
        const themeData = useThemeData<ThemeHopeOptions>();
        const themeLocale = useThemeLocaleData<ThemeHopeOptions>();
        const siteData = useSiteData();
        const page = usePageData();

        // navbar
        const showNavbar = computed(
            () =>
                frontmatter.value.navbar !== false &&
                themeLocale.value.navbar !== false &&
                Boolean(
                    siteData.value.title ||
                        themeData.value.logo ||
                        themeData.value.repo ||
                        themeData.value.nav ||
                        themeLocale.value.nav
                )
        );
        const hideNavbar = ref(false);

        // sidebar
        const sidebarItems = useSidebarItems();
        const isSidebarOpen = ref(false);
        const toggleSidebar = (to?: boolean): void => {
            isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value;
        };
        // anchor
        const showAnchor = computed(() => themeData.value.anchorDisplay !== false && page.value.headers.length);

        const touchStart = { x: 0, y: 0 };

        const onTouchStart = (event: TouchEvent): void => {
            touchStart.x = event.changedTouches[0].clientX;
            touchStart.y = event.changedTouches[0].clientY;
        };

        const onTouchEnd = (event: TouchEvent): void => {
            const dx = event.changedTouches[0].clientX - touchStart.x;
            const dy = event.changedTouches[0].clientY - touchStart.y;

            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx > 0 && touchStart.x <= 80) toggleSidebar(true);
                else toggleSidebar(false);
            }
        };

        /** Get scroll distance */
        const getScrollTop = (): number =>
            window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // classes
        const containerClass = computed(() => ({
            'has-navbar': showNavbar.value,
            'hide-navbar': hideNavbar.value,
            'has-sidebar': sidebarItems.value.length,
            'sidebar-open': isSidebarOpen.value,
            'has-anchor': showAnchor.value,
        }));

        let unregisterRouterHook: () => void;
        let lastDistance = 0;

        const navbarHandler = throttle(() => {
            if (!isSidebarOpen.value) {
                const distance = getScrollTop();

                // scroll down
                if (lastDistance < distance && distance > 58) hideNavbar.value = true;
                // scroll up
                else hideNavbar.value = false;

                lastDistance = distance;
            }
        }, 300);

        onMounted(() => {
            const router = useRouter();

            // close sidebar after navigation
            unregisterRouterHook = router.afterEach(() => {
                toggleSidebar(false);
            });

            lastDistance = 0;
            window.addEventListener('scroll', navbarHandler);
        });

        onUnmounted(() => {
            unregisterRouterHook();
        });

        return (): VNode =>
            h(
                'div',
                {
                    class: { 'theme-container': true, ...containerClass.value },
                    onTouchStart,
                    onTouchEnd,
                },
                // isGlobalEncrypted.value?h(Password，{onPasswordVerify:checkGlobalPassword}):
                [
                    showNavbar.value
                        ? h(
                              Navbar,
                              { onToggleSidebar: toggleSidebar },
                              {
                                  navbarBefore: () => slots.navbarBefore?.(),
                                  navbarAfter: () => slots.navbarAfter?.(),
                              }
                          )
                        : null,
                    h('div', {
                        class: 'sidebar-mask',
                        onClick: () => toggleSidebar(false),
                    }),
                    h(Sidebar, {
                        sidebarTop: () => slots.sidebarTop?.(),
                        sidebarCenter: () => slots.sidebarCenter?.(),
                        sidebarBottom: () => slots.sidebarBottom?.(),
                    }),
                    slots.default?.(),
                    h(PageFooter),
                ]
            );
    },
});
