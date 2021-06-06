import { rollupTypescript } from '../../script/rollup';

export default [
    ...rollupTypescript('node/index', {
        external: [
            'dayjs',
            'dayjs/plugin/localizedFormat',
            'dayjs/plugin/objectSupport',
            'dayjs/plugin/timezone',
            'dayjs/plugin/utc',
        ],
    }),
    ...rollupTypescript('client/index', {
        external: [
            '@vuepress/client',
            '@vuepress/plugin-theme-data/lib/client',
            'dayjs',
            'dayjs/plugin/localizedFormat',
            'dayjs/plugin/objectSupport',
            'dayjs/plugin/timezone',
            'dayjs/plugin/utc',
            'vue',
        ],
    }),
];
