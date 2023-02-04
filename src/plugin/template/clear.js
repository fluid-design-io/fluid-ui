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

const generateClearBtnState = (color, theme) => {
  const mutate = new tinycolor(color).isDark() ? 'lighten' : 'darken';
  const alpha = new tinycolor(color).getAlpha() || 1;
  const contrastMoreOffsetColor = new tinycolor(color).greyscale(0.5).toRgbString();
  const houcusBackground = new tinycolor(color)[mutate]().setAlpha(alpha * 0.12).toRgbString()
  const activeBackground = new tinycolor(color)[mutate]().setAlpha(alpha * 0.2).toRgbString()
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
      color: disabledColor({ color, textFactor: 0.7 }).textColor,
      cursor: 'not-allowed',
    }, // Disabled state
    [BUTTON_STATE.CONTRAST_MORE]: {
      ...contrastRing({ color, theme, offsetColor: contrastMoreOffsetColor }),
    },
    [BUTTON_STATE.DARK]: {
      [BUTTON_STATE.FOCUS]: {
        '--tw-ring-offset-color': '#222 !important',
      },
    },
  };
};

const generateClearBtn = (value, theme) => {
  if (value) {
    const colorValue = _color.parseColor(toColorValue(value));
    if (!colorValue)
      return {
        ...BUTTON_DEFAULT,
        color: toColorValue(value),
        'background-color': 'transparent',
        ...generateClearBtnState(toColorValue(value), theme),
        ...generateBtnStroke({ opacity: '0.45' }),
      };
    const { mode, color: c, alpha } = colorValue;
    const color = _color.formatColor({ mode, color: c, alpha });

    return {
      ...BUTTON_DEFAULT,
      ...generateBtnStroke({ opacity: '0.45' }),
      ...generateClearBtnState(color, theme), // Generate focus, hover, active and disabled states
      color: color,
      'background-color': 'transparent',
      '&.pressed::after': {
        transition: 'all 0.08s ease-in-out',
        borderColor: color
      },
    };
  }
};

module.exports = generateClearBtn;
