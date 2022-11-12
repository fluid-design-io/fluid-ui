const plugin = require('tailwindcss/plugin');
const {
    default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

const {
    btncolorOptions,
    lightBtnOptions,
    outlineBtnOptions,
    clearBtnOptions,
    boldBtnOptions,
} = require('./util/firstLevelColors');
const generateDefaultBtn = require('./template/default');
const generateLightBtn = require('./template/light');
const generateOutlineBtn = require('./template/outline');
const generateClearBtn = require('./template/clear');
const generateBoldBtn = require('./template/bold');

/*============ Combines tailwind colors with options and top level color shortcuts ============*/
const themeColorOptions = (colors, btnOption) => ({
    ...flattenColorPalette(colors),
    ...btnOption(colors),
}); // Get all the colors from the theme

const defaultButtonUtilities = (theme) => ({
    btn: (value) => generateDefaultBtn(value, theme),
});
const lightButtonUtilities = (theme) => ({
    'btn-light': (value) => generateLightBtn(value, theme),
});
const boldButtonUtilities = (theme) => ({
    'btn-bold': (value) => generateBoldBtn(value, theme),
});
const outlineButtonUtilities = (theme) => ({
    'btn-outline': (value) => generateOutlineBtn(value, theme),
});
const clearButtonUtilities = (theme) => ({
    'btn-clear': (value) => generateClearBtn(value, theme),
});

module.exports = plugin(function ({ matchUtilities, theme }) {
    matchUtilities(defaultButtonUtilities(theme), {
        values: themeColorOptions(theme('colors'), btncolorOptions),
        type: 'color',
    }),
        matchUtilities(lightButtonUtilities(theme), {
            values: themeColorOptions(theme('colors'), lightBtnOptions),
            type: 'color',
        }),
        matchUtilities(boldButtonUtilities(theme), {
            values: themeColorOptions(theme('colors'), boldBtnOptions),
            type: 'color',
        }),
        matchUtilities(outlineButtonUtilities(theme), {
            values: themeColorOptions(theme('colors'), outlineBtnOptions),
            type: 'color',
        }),
        matchUtilities(clearButtonUtilities(theme), {
            values: themeColorOptions(theme('colors'), clearBtnOptions),
            type: 'color',
        })
});
