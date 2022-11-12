/** @type {import('tinycolor2')} */
const tinycolor = require('../lib/tinycolor');

const _color = require('tailwindcss/lib/util/color');
const { contrastRing, focusRing } = require('../util/generateRing');
const {
  focusHoverRingColor,
  disabledColor,
  contrastMoreColor,
} = require('../util/generateColors');
const { generateBtnStroke } = require('../util/generateStroke');
const { BUTTON_STATE, BUTTON_DEFAULT } = require('../lib/constants');
const { generateBtnTextBg } = require('../util/generateTextBg');
const { default: toColorValue } = require('../util/toColorValue');

const generateLightBtnState = (color, theme, isDark) => {
  const houcusColor = isDark
    ? tinycolor(color).saturate(5).lighten(4).toRgbString()
    : tinycolor(color).saturate(5).darken(4).toRgbString();
  const activeColor = isDark
    ? tinycolor(color).saturate(3).lighten(10).toRgbString()
    : tinycolor(color).saturate(3).darken(10).toRgbString();
  const contrastMoreOffsetColor = isDark
    ? tinycolor(color).lighten(30).toRgbString()
    : tinycolor(color).darken(30).toRgbString();
  return {
    [BUTTON_STATE.HOVER]: {
      ...generateBtnTextBg(houcusColor),
    }, // Focus and hover state
    [BUTTON_STATE.FOCUS]: {
      ...generateBtnTextBg(houcusColor),
      ...focusRing({ color, theme }),
    }, // Focus and hover state
    [BUTTON_STATE.ACTIVE]: {
      ...generateBtnTextBg(houcusColor, activeColor),
    }, // Active state
    [BUTTON_STATE.DISABLED]: {
      ...generateBtnTextBg(
        disabledColor({ color }).textColor,
        disabledColor({ color }).backgroundColor
      ),
      cursor: 'not-allowed',
    }, // Disabled state
    [BUTTON_STATE.CONTRAST_MORE]: {
      ...generateBtnTextBg(
        contrastMoreColor({ color }),
        contrastMoreColor({ color }),
        true
      ),
      ...contrastRing({ color, theme, offsetColor: contrastMoreOffsetColor }),
      ...generateBtnStroke({
        opacity: isDark ? '0.5' : '0.35',
        borderWidth: '1.5px',
        borderColor: activeColor,
      }),
    },
  };
};

const generateLightBtn = (value, theme) => {
  if (value) {
    const colorValue = _color.parseColor(toColorValue(value));
    if (!colorValue)
      return {
        ...BUTTON_DEFAULT,
        ...generateBtnTextBg(toColorValue(value)),
        ...generateLightBtnState(toColorValue(value), theme),
        ...generateBtnStroke({ opacity: '0.3' }),
      };
    const { mode, color: c, alpha } = colorValue;
    const color = _color.formatColor({ mode, color: c, alpha });
    const { h, s } = tinycolor(color).toHsl();
    const lightColor = tinycolor(color)
      .setAlpha(alpha || 1)
      .toRgbString();
    const darkColorHSL = tinycolor({ h, s, l: 0.5 }).toRgbString();
    const hsv = tinycolor(darkColorHSL).toHsv();
    const darkColor = tinycolor({
      h: hsv.h,
      s: hsv.s,
      v: hsv.v * 0.25,
    }).toRgbString();

    return {
      ...BUTTON_DEFAULT,
      ...generateBtnTextBg(lightColor), // Generate text and background color
      ...generateLightBtnState(lightColor, theme), // Generate focus, hover, active and disabled states
      ...generateBtnStroke({ opacity: '0.3' }),

      [BUTTON_STATE.DARK]: {
        ...generateBtnStroke({ opacity: '0.15' }),
        ...generateBtnTextBg(darkColor),
        ...generateLightBtnState(darkColor, theme, true),
      },
      '&.pressed::after': {
        transition: 'all 0.08s ease-in-out',
        borderColor: '#222',
        [BUTTON_STATE.DARK]: {
          borderColor: '#fff !important',
        },
      },
    };
  }
};

module.exports = generateLightBtn;
