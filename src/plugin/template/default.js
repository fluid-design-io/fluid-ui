/** @type {import('tinycolor2')} */
const tinycolor = require('../lib/tinycolor');

const _color = require('tailwindcss/lib/util/color');
const { contrastRing, focusRing } = require('../util/generateRing');
const {
  houcusColor,
  activeColor,
  disabledColor,
  contrastMoreColor,
} = require('../util/generateColors');
const { BUTTON_STATE, BUTTON_DEFAULT } = require('../lib/constants');
const { generateBtnTextBg } = require('../util/generateTextBg');
const { default: toColorValue } = require('../util/toColorValue');

const generateDefaultBtnState = (color, theme) => {
  return {
    [BUTTON_STATE.HOVER]: {
      ...generateBtnTextBg(houcusColor({ color })),
    }, // Focus and hover state
    [BUTTON_STATE.FOCUS]: {
      ...generateBtnTextBg(houcusColor({ color })),
      ...focusRing({ color, theme }),
    }, // Focus and hover state
    [BUTTON_STATE.ACTIVE]: {
      ...generateBtnTextBg(houcusColor({ color }), activeColor({ color })),
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
      ...contrastRing({ color, theme }),
    },
    [BUTTON_STATE.DARK]: {
      [BUTTON_STATE.FOCUS]: {
        '--tw-ring-offset-color': '#222 !important',
      },
    },
  };
};

const generateDefaultBtn = (value, theme) => {
  if (value) {
    const colorValue = _color.parseColor(toColorValue(value));
    if (!colorValue)
      return {
        ...BUTTON_DEFAULT,
        ...generateBtnTextBg(toColorValue(value)),
        ...generateDefaultBtnState(toColorValue(value), theme),
      };
    const { mode, color: c, alpha } = colorValue;
    const color = _color.formatColor({ mode, color: c, alpha });
    return {
      ...BUTTON_DEFAULT,
      ...generateBtnTextBg(color), // Generate text and background color
      ...generateDefaultBtnState(color, theme), // Generate focus, hover, active and disabled states
    };
  }
};

module.exports = generateDefaultBtn;
