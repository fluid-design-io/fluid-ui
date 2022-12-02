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

const generateLinkBtnState = (color, theme) => {
  const alpha = tinycolor(color).getAlpha();
  const houcusColor = tinycolor(color).saturate(5).darken(4).setAlpha(alpha).toRgbString();
  const activeColor = tinycolor(color).saturate(3).darken(10).setAlpha(alpha).toRgbString();
  return {
    [BUTTON_STATE.HOVER]: {
      color: houcusColor,
      'text-decoration-line': 'underline',
      'text-decoration-style': 'dotted',
    }, // Focus and hover state
    [BUTTON_STATE.FOCUS]: {
      color: houcusColor,
      'text-decoration-line': 'underline',
      'text-decoration-style': 'dotted',
      ...focusRing({ color, theme }),
    }, // Focus and hover state
    [BUTTON_STATE.ACTIVE]: {
      'text-decoration-line': 'underline',
      'text-decoration-style': 'dotted',
      color: activeColor,
    }, // Active state
    [BUTTON_STATE.DISABLED]: {
      color: disabledColor({ color, textFactor: 0.7 }).textColor,
      cursor: 'not-allowed',
    }, // Disabled state
    [BUTTON_STATE.CONTRAST_MORE]: {
      ...generateBtnTextBg(
        contrastMoreColor({ color }),
        'transparent',
        true
      ),
    },
  };
};

const generateLinkBtn = (value, theme) => {
  if (value) {
    const colorValue = _color.parseColor(toColorValue(value));
    if (!colorValue)
      return {
        ...BUTTON_DEFAULT,
        ...generateBtnTextBg(toColorValue(value), 'transparent'),
        ...generateLinkBtnState(toColorValue(value), theme),
        ...generateBtnStroke({ opacity: '0.3' }),
      };
    const { mode, color: c, alpha } = colorValue;
    const color = _color.formatColor({ mode, color: c, alpha });

    return {
      ...BUTTON_DEFAULT,
      ...generateLinkBtnState(color, theme), // Generate focus, hover, active and disabled states
      color,
      backgroundColor: 'transparent',
    };
  }
};

module.exports = generateLinkBtn;
