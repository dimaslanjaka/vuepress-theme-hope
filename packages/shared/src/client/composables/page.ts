import { usePageData } from '@vuepress/client';
import { ComputedRef, computed } from 'vue';

export type PageTitleRef = ComputedRef<string>;

export const usePageTitle = (): PageTitleRef =>
    computed(() => {
        const page = usePageData();

        return page.value.title;
    });
