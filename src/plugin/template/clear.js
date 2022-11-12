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

const generateClearBtnState = (color, theme, isDark) => {
  const activeColor = isDark
    ? tinycolor(color).saturate(3).lighten(10).toRgbString()
    : tinycolor(color).saturate(3).darken(10).toRgbString();
  const contrastMoreOffsetColor = isDark
    ? tinycolor(color).lighten(30).toRgbString()
    : tinycolor(color).darken(30).toRgbString();
  return {
    [BUTTON_STATE.HOVER]: {
      color: color,
      'background-color': tinycolor(color).setAlpha(0.1).toRgbString(),
    }, // Focus and hover state
    [BUTTON_STATE.FOCUS]: {
      color: color,
      'background-color': tinycolor(color).setAlpha(0.1).toRgbString(),
      ...focusRing({ color, theme }),
    }, // Focus and hover state
    [BUTTON_STATE.ACTIVE]: {
      color: color,
      'background-color': tinycolor(color).setAlpha(0.2).toRgbString(),
    }, // Active state
    [BUTTON_STATE.DISABLED]: {
      ...generateBtnTextBg(
        disabledColor({ color }).textColor,
        disabledColor({ color }).backgroundColor
      ),
      cursor: 'not-allowed',
    }, // Disabled state
    [BUTTON_STATE.CONTRAST_MORE]: {
      color: color,
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

    return {
      ...BUTTON_DEFAULT,
      ...generateBtnStroke({ opacity: '0.38' }),
      ...generateClearBtnState(color, theme), // Generate focus, hover, active and disabled states
      color: color,
      'background-color': 'transparent',
      [BUTTON_STATE.DARK]: {
        ...generateBtnStroke({ opacity: '0.3' }),
        ...generateClearBtnState(color, theme, true),
        color: color,
        'background-color': 'transparent',
      },
      '&.pressed::after': {
        transition: 'all 0.08s ease-in-out',
        borderColor: color,
      },
    };
  }
};

module.exports = generateClearBtn;
