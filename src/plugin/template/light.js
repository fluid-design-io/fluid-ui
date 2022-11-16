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

const generateLightBtnState = (color, theme) => {
  const mutate = tinycolor(color).isDark() ? 'lighten' : 'darken';
  const alpha = tinycolor(color).getAlpha();
  const houcusColor = tinycolor(color).saturate(5)[mutate](4).setAlpha(alpha).toRgbString();
  const activeColor = tinycolor(color).saturate(3)[mutate](10).setAlpha(alpha).toRgbString();
  const contrastMoreOffsetColor = tinycolor(color)[mutate](20).toRgbString();
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
        opacity: '0.5',
        borderWidth: '1.5px',
        borderColor: activeColor,
      }),
    },
    '&.pressed::after': {
      transition: 'all 0.08s ease-in-out',
      borderColor: tinycolor(color).isDark() ? '#aaa' : '#222',
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

    return {
      ...BUTTON_DEFAULT,
      ...generateBtnTextBg(color), // Generate text and background color
      ...generateLightBtnState(color, theme), // Generate focus, hover, active and disabled states
      ...generateBtnStroke({ opacity: '0.3' }),
    };
  }
};

module.exports = generateLightBtn;
