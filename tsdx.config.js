const babel = require("rollup-plugin-babel");
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcss = require("rollup-plugin-postcss")


module.exports = {
    rootDir: './src',
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [tailwindcss(), autoprefixer()],
                minimize: true,
            }),
            babel({
                exclude: "node_modules/**",
                presets: ["@babel/preset-react"],
            }),
        );
        return config;
    },
};