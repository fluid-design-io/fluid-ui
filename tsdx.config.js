// import babel from "rollup-plugin-babel";
// import resolve from "@rollup/plugin-node-resolve";
// import external from "rollup-plugin-peer-deps-external";
// import { terser } from "rollup-plugin-terser";
// import postcss from "rollup-plugin-postcss";
// import typescript from 'rollup-plugin-typescript'

const babel = require("rollup-plugin-babel");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require("rollup-plugin-postcss");
const typescript = require('rollup-plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const external = require('rollup-plugin-peer-deps-external');
const { terser } = require('rollup-plugin-terser');


module.exports = {
    rollup(config, options) {
        options.input = "./src/index.ts",
            // options.minify = true,
            config.plugins.push(
                postcss({
                    config: {
                        path: "./postcss.config.js",
                    },
                    extensions: [".css"],
                    minimize: true,
                    inject: {
                        insertAt: "top",
                    },
                    plugins: [cssnano()],

                }),
                babel({
                    exclude: "node_modules/**",
                    presets: ["@babel/preset-react"],
                }),
                typescript(),
                external(),
                resolve,
                terser(),
            );
        return config;
    },
};