// import babel from "rollup-plugin-babel";
// import resolve from "@rollup/plugin-node-resolve";
// import external from "rollup-plugin-peer-deps-external";
// import { terser } from "rollup-plugin-terser";
// import postcss from "rollup-plugin-postcss";
// import typescript from 'rollup-plugin-typescript'

const babel = require("rollup-plugin-babel");
const autoprefixer = require('autoprefixer');
const postcss = require("rollup-plugin-postcss")


module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [autoprefixer()],
                minimize: true,
            }),
            babel({
                exclude: "node_modules/**",
                presets: ["@babel/preset-react"],
            }),
            // typescript(),
            // external(),
            // resolve,
            // terser(),
        );
        return config;
    },
};