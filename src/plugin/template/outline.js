/** @type {import('tinycolor2')} */
const tinycolor = require('../lib/tinycolor');

const _color = require('tailwindcss/lib/util/color');
const { contrastRing, focusRing } = require('../util/generateRing');
const {
  disabledColor,
} = require('../util/generateColors');
const { BUTTON_STATE, BUTTON_DEFAULT } = require('../lib/constants');
const { default: toColorValue } = require('../util/toColorValue');

const generateOutlineBtnState = (color, theme) => {
  const mutate = tinycolor(color).isDark() ? 'lighten' : 'darken';
  const alpha = tinycolor(color).getAlpha() || 1;
  const houcusBackground = tinycolor(color)[mutate]().setAlpha(alpha * 0.12).toRgbString();
  const activeBackground = tinycolor(color)[mutate]().setAlpha(alpha * 0.2).toRgbString();
  const activeBorderColor = tinycolor(color).setAlpha(alpha * 0.7).toRgbString();
  return {
    [BUTTON_STATE.HOVER]: {
      'background-color': houcusBackground,
      'border-color': activeBorderColor,
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
      'border-color': color,
      ...focusRing({ color, theme, offsetWidth: '0px' }),
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
      color: disabledColor({ color, textFactor: 0.8 }).textColor,
      cursor: 'not-allowed',
    }, // Disabled state
    [BUTTON_STATE.CONTRAST_MORE]: {
      'background-color': houcusBackground,
      'border-color': activeBorderColor,
      'border-width': '1.5px !important',
      ...contrastRing({
        color,
        theme,
        offsetColor: activeBorderColor,
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
        ...generateBorder(colorValue),
        ...generateOutlineBtnState(toColorValue(value), theme),
        color: toColorValue(value),
        'background-color': 'transparent',
      };
    const { mode, color: c, alpha } = colorValue;
    const color = _color.formatColor({ mode, color: c, alpha });
    const borderColor = tinycolor(color)
      .setAlpha(alpha * 0.7 || 0.7)
      .toRgbString();

    return {
      ...BUTTON_DEFAULT,
      ...generateBorder(borderColor), // Generate border color
      ...generateOutlineBtnState(color, theme), // Generate focus, hover, active and disabled states
      color,
      'background-color': 'transparent',
    };
  }
};

module.exports = generateOutlineBtn;
