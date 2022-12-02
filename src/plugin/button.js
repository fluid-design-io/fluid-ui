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
    linkBtnOptions,
} = require('./util/firstLevelColors');
const generateDefaultBtn = require('./template/default');
const generateLightBtn = require('./template/light');
const generateOutlineBtn = require('./template/outline');
const generateClearBtn = require('./template/clear');
const generateBoldBtn = require('./template/bold');
const generateLinkBtn = require('./template/link');

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
const linkButtonUtilities = (theme) => ({
    'btn-link': (value) => generateLinkBtn(value, theme),
});

module.exports = plugin(function ({ matchUtilities, theme, addVariant }) {
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
    matchUtilities(linkButtonUtilities(theme), {
        values: themeColorOptions(theme('colors'), linkBtnOptions),
        type: 'color',
    }),
        addVariant('hocus', ['&:hover', '&:focus-visible']),
        addVariant('contrast', ['.contrast &', '@media (prefers-contrast: more)'])
});
