import dts from 'rollup-plugin-dts';
import pkg from './package.json';
import copy from 'rollup-plugin-copy';
import styles from 'rollup-plugin-styles';
import typescript from '@rollup/plugin-typescript';
import typescript2 from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: './src/index.ts',
        output: [{ file: pkg.main, format: 'cjs', sourcemap: true, exports: 'named' }],
        plugins: [
            typescript({
                declaration: true,
                declarationMap: true,
            }),

            terser(),
        ],
        external: ['@vuepress/utils'],
    },
    {
        input: './src/index.ts',
        output: [{ file: pkg.types, format: 'esm' }],
        plugins: [dts()],
    },
    {
        input: './src/clientAppEnhance.ts',
        output: [
            {
                file: './client/appEnhance.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            vue(),
            typescript2({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                    },
                },
            }),
            styles(),
            terser(),
            copy({
                targets: [
                    {
                        src: './src/styles',
                        dest: './client',
                    },
                ],
            }),
        ],
        external: [
            '@vuepress/client',
            '@vuepress/plugin-theme-data/lib/client',
            '@vuepress/shared',
            'vue',
            'vue-router',
        ],
    },
    {
        input: './src/clientAppEnhance.ts',
        output: [
            {
                file: './client/appEnhance.d.ts',
                format: 'esm',
            },
        ],
        plugins: [dts()],
        external: [/\.scss$/],
    },
    {
        input: './src/clientAppSetup.ts',
        output: [
            {
                file: './client/appSetup.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            vue(),
            typescript2({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                    },
                },
            }),
            styles(),
            terser(),
        ],
        external: [
            '@vuepress/client',
            '@vuepress/plugin-theme-data/lib/client',
            '@vuepress/shared',
            'vue',
            'vue-router',
        ],
    },
    {
        input: './src/clientAppSetup.ts',
        output: [
            {
                file: './client/appSetup.d.ts',
                format: 'esm',
            },
        ],
        plugins: [dts()],
    },
    {
        input: './src/layouts/Layout.vue',
        output: [
            {
                file: './client/layouts/Layout.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            vue(),
            typescript2({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                    },
                },
            }),
            styles(),
            terser(),
        ],
        external: [
            '@vuepress/client',
            '@vuepress/plugin-theme-data/lib/client',
            '@vuepress/shared',
            'vue',
            'vue-router',
        ],
    },
    {
        input: './src/layouts/404.vue',
        output: [
            {
                file: './client/layouts/404.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            vue(),
            typescript2({
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                    },
                },
            }),
            styles(),
            terser(),
        ],
        external: [
            '@vuepress/client',
            '@vuepress/plugin-theme-data/lib/client',
            '@vuepress/shared',
            'vue',
            'vue-router',
        ],
    },
];
