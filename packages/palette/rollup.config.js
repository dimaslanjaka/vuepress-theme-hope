import { rollupTypescript } from '../../script/rollup';

export default rollupTypescript('node/index', {
    external: ['@vuepress/utils'],
});
