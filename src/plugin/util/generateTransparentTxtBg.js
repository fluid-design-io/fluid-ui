/** @type {import('tinycolor2')} */
const tinycolor = require('../lib/tinycolor');

const generateTransparentTxtBg = ({ color, alpha }) => {
    const { h, s, v } = tinycolor(color).toHsv();
    const lightColor = tinycolor({ h, s, v: s > 0.25 ? 0.55 : 0.4 })
        .setAlpha(alpha || 1)
        .toRgbString();
    const darkColorHSV = tinycolor({ h, s, v: v * 0.8 }).toRgbString();
    const darkColorHSL = tinycolor(darkColorHSV).toHsl();
    const darkColor = tinycolor({
        h: darkColorHSL.h,
        s: darkColorHSL.s,
        l: 0.8,
    }).toRgbString();
    return {
        lightColor,
        darkColor,
    }
}
module.exports = { generateTransparentTxtBg };
