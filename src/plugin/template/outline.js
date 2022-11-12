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

const generateOutlineBtnState = (color, theme, isDark) => {
  const houcusColor = isDark
    ? tinycolor(color).saturate(5).toRgbString()
    : tinycolor(color).saturate(5).darken(4).toRgbString();
  const activeColor = isDark
    ? tinycolor(color).saturate(3).toRgbString()
    : tinycolor(color).saturate(3).darken(10).toRgbString();
  const houcusBackground = isDark
    ? tinycolor(activeColor).darken().setAlpha(0.12).toRgbString()
    : tinycolor(houcusColor).setAlpha(0.1).toRgbString();
  const activeBackground = isDark
    ? tinycolor(activeColor).darken().setAlpha(0.2).toRgbString()
    : tinycolor(activeColor).setAlpha(0.18).toRgbString();
  const activeBorderColor = isDark
    ? tinycolor(activeColor).setAlpha(0.7).toRgbString()
    : activeColor;
  return {
    [BUTTON_STATE.HOVER]: {
      'background-color': houcusBackground,
      'border-color': activeBorderColor,
      '--tw-ring-offset-color': theme(
        'ringOffsetColor.DEFAULT',
        isDark ? '#222' : '#fff'
      ),
      [BUTTON_STATE.CONTRAST_MORE]: {
        ...focusRing({
          color: activeBorderColor,
          theme,
          offsetWidth: '1.5px',
          ringWidth: '1.5px',
        }),
      },
    }, // Focus and hover state
    [BUTTON_STATE.FOCUS]: {
      'background-color': houcusBackground,
      'border-color': activeBorderColor,
      ...focusRing({ color, theme, offsetWidth: '0px' }),
      '--tw-ring-offset-color': theme(
        'ringOffsetColor.DEFAULT',
        isDark ? '#222' : '#fff'
      ),
      [BUTTON_STATE.CONTRAST_MORE]: {
        ...focusRing({
          color: activeBorderColor,
          theme,
          offsetWidth: '1.5px',
          ringWidth: '1.5px',
        }),
      },
    }, // Focus and hover state
    [BUTTON_STATE.ACTIVE]: {
      'background-color': activeBackground,
    }, // Active state
    [BUTTON_STATE.DISABLED]: {
      ...generateBtnTextBg(
        disabledColor({ color }).textColor,
        disabledColor({ color }).backgroundColor
      ),
      cursor: 'not-allowed',
    }, // Disabled state
    [BUTTON_STATE.CONTRAST_MORE]: {
      'background-color': houcusBackground,
      'border-color': activeBorderColor,
      'border-width': '1.5px !important',
      ...contrastRing({
        color,
        theme,
        offsetColor: activeColor,
        offsetWidth: '1.5px',
        ringWidth: '1.5px',
      }),
    },
  };
};

const generateBorder = (value) => {
  return {
    'border-color': toColorValue(value),
    'border-width': '1px',
  };
};

const generateOutlineBtn = (value, theme) => {
  if (value) {
    const colorValue = _color.parseColor(toColorValue(value));
    if (!colorValue)
      return {
        ...BUTTON_DEFAULT,
        ...generateBtnTextBg(toColorValue(value), 'transparent'),
        ...generateOutlineBtnState(toColorValue(value), theme),
        'background-color': 'transparent',
        color: toColorValue(value),
      };
    const { mode, color: c, alpha } = colorValue;
    const color = _color.formatColor({ mode, color: c, alpha });
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
    const borderColor = tinycolor(color)
      .setAlpha(alpha * 0.7 || 0.7)
      .toRgbString();

    return {
      ...BUTTON_DEFAULT,
      ...generateBorder(borderColor), // Generate border color
      ...generateOutlineBtnState(color, theme), // Generate focus, hover, active and disabled states
      'background-color': 'transparent',
      color: lightColor,

      [BUTTON_STATE.DARK]: {
        'background-color': 'transparent',
        color: darkColor,
        ...generateBorder(borderColor),
        ...generateOutlineBtnState(darkColor, theme, true),
      },
    };
  }
};

module.exports = generateOutlineBtn;
