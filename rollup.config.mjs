import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'

import pkg from './package.json' assert { type: 'json' };


const PLUGINS = [
    copy({
        targets: [
            { src: 'src/plugin/**/*', dest: 'dist/plugin' },
        ],
    }),
    postcss({
        plugins: [
            autoprefixer(),
            tailwindcss(),
        ],
        extract: true,
        minimize: true,
    }),
    typescript(),
    external({ includeDependencies: true, }),
    commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto',
    }),
    babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
    }),
    nodeResolve(),
    terser(),
];


const config = [
    {
        input: './src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                exports: 'named',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'esm',
                exports: 'named',
                sourcemap: true,
            },
        ],
        plugins: PLUGINS,
    },
]

export default config;