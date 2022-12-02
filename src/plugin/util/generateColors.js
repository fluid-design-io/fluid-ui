/** @type {import('tinycolor2')} */
const tinycolor = require('../lib/tinycolor');

const { makeContrast } = require('./contrastColor');

const isNutralDark = ({ color }) => {
  const { r, g, b } = tinycolor(color).toRgb();
  const brightness = tinycolor(color).getBrightness();
  // if r,g,b and brightness difference is less than 10, then it is a neutral color
  return (
    Math.abs(r - brightness) < 10 &&
    Math.abs(g - brightness) < 10 &&
    Math.abs(b - brightness) < 10
  );
};

const focusHoverRingColor = ({ color, isDark = false }) => {
  if (!tinycolor(color).isValid()) color; // If the color is not valid, return the color string
  // convert color to hsv, and set the l to 0.5, and convert back to rgb
  const hsl = tinycolor(color).toHsl(); // Convert color to hsl
  const brightness = tinycolor(color).getBrightness(); // Get the brightness of the color
  if (!isDark && hsl.l > 0.7) hsl.l = 0.5;
  if ((isDark && hsl.l < 0.3) || (isDark && brightness < 255 * 0.5))
    hsl.l = 0.5;
  const rgb = tinycolor(hsl).toRgbString(); // Convert hsv to rgb
  return rgb;
}; // focusHoverRingColor
const houcusColor = ({ color }) => {
  if (!tinycolor(color).isValid()) return { filter: 'brightness(0.97)' }; // If the color is not valid, return filter
  const hsv = tinycolor(color).toHsv(); // Convert color to hsv
  hsv.v < 0.05 ? (hsv.v += 0.05) : (hsv.v -= 0.05);
  return tinycolor(hsv).toRgbString();
};
const activeColor = ({ color }) => {
  if (!tinycolor(color).isValid()) return { filter: 'brightness(0.94)' }; // If the color is not valid, return filter
  const hsv = tinycolor(color).toHsv(); // Convert color to hsv
  hsv.v < 0.1 ? (hsv.v += 0.1) : (hsv.v -= 0.1);
  return tinycolor(hsv).toRgbString();
};
const disabledColor = ({ color, textFactor = 1 }) => {
  if (!tinycolor(color).isValid())
    return {
      textColor: { filter: `brightness(${alpha * 0.8 * textFactor})` },
      backgroundColor: { filter: `brightness(${alpha * 0.35})` },
    }; // If the color is not valid, return filter
  const alpha = tinycolor(color).getAlpha() || 1;
  const textColor = tinycolor(color).setAlpha(alpha * 0.8 * textFactor).toRgbString();
  const backgroundColor = tinycolor(color).setAlpha(alpha * 0.35).toRgbString();
  return {
    textColor,
    backgroundColor,
    alpha,
  };
};
const contrastMoreColor = ({ color }) => {
  if (!tinycolor(color).isValid()) return { filter: 'contrast(1.2)' };
  const isLight = tinycolor(color).isLight();
  const currentColor = isLight ? '#151515' : '#FFF';
  const contrast = isLight ? 'lighten' : 'darken';
  const c = makeContrast({
    inputColor: color,
    currentColor: color,
    contrast,
    threshold: 2.5,
    amount: 20,
    compareTo: currentColor,
  });
  return c;
};

module.exports = {
  focusHoverRingColor,
  houcusColor,
  activeColor,
  disabledColor,
  contrastMoreColor,
};
