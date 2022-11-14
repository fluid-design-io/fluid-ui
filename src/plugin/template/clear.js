/** @type {import('tinycolor2')} */
const tinycolor = require('../lib/tinycolor');

const _color = require('tailwindcss/lib/util/color');
const { contrastRing, focusRing } = require('../util/generateRing');
const {
  disabledColor,
  contrastMoreColor,
} = require('../util/generateColors');
const { generateBtnStroke } = require('../util/generateStroke');
const { BUTTON_STATE, BUTTON_DEFAULT } = require('../lib/constants');
const { generateBtnTextBg } = require('../util/generateTextBg');
const { default: toColorValue } = require('../util/toColorValue');
const { generateTransparentTxtBg } = require('../util/generateTransparentTxtBg');

const generateClearBtnState = (color, theme, isDark) => {
  const activeColor = isDark
    ? tinycolor(color).saturate(3).lighten(10).toRgbString()
    : tinycolor(color).saturate(3).darken(10).toRgbString();
  const contrastMoreOffsetColor = isDark
    ? tinycolor(color).lighten(30).toRgbString()
    : tinycolor(color).darken(30).toRgbString();
  const houcusColor = isDark
    ? tinycolor(color).saturate(5).toRgbString()
    : tinycolor(color).saturate(5).darken(4).toRgbString();
  const houcusBackground = isDark
    ? tinycolor(activeColor).darken().setAlpha(0.12).toRgbString()
    : tinycolor(houcusColor).setAlpha(0.1).toRgbString();
  const activeBackground = isDark
    ? tinycolor(activeColor).darken().setAlpha(0.2).toRgbString()
    : tinycolor(activeColor).setAlpha(0.18).toRgbString();
  return {
    [BUTTON_STATE.HOVER]: {
      'background-color': houcusBackground,
    }, // Focus and hover state
    [BUTTON_STATE.FOCUS]: {
      'background-color': houcusBackground,
      ...focusRing({ color, theme }),
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
      ...generateBtnTextBg(
        contrastMoreColor({ color }), 'transparent', true),
      ...contrastRing({ color, theme, offsetColor: contrastMoreOffsetColor }),
    },
  };
};

const generateClearBtn = (value, theme) => {
  if (value) {
    const colorValue = _color.parseColor(toColorValue(value));
    if (!colorValue)
      return {
        ...BUTTON_DEFAULT,
        ...generateBtnTextBg(toColorValue(value)),
        ...generateClearBtnState(toColorValue(value), theme),
        ...generateBtnStroke({ opacity: '0.3' }),
      };
    const { mode, color: c, alpha } = colorValue;
    const color = _color.formatColor({ mode, color: c, alpha });
    const { lightColor, darkColor } = generateTransparentTxtBg({ color, alpha });

    return {
      ...BUTTON_DEFAULT,
      ...generateBtnStroke({ opacity: '0.48' }),
      ...generateClearBtnState(lightColor, theme), // Generate focus, hover, active and disabled states
      'background-color': 'transparent',
      color: lightColor,
      [BUTTON_STATE.DARK]: {
        color: darkColor,
        ...generateBtnStroke({ opacity: '0.38' }),
        ...generateClearBtnState(darkColor, theme, true),
      },
      '&.pressed::after': {
        transition: 'all 0.08s ease-in-out',
        borderColor: darkColor,
        [BUTTON_STATE.DARK]: {
          borderColor: lightColor,
        }
      },
    };
  }
};

module.exports = generateClearBtn;
