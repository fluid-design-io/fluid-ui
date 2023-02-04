/** @type {import('tinycolor2')} */
const tinycolor = require('../lib/tinycolor');

const makeContrast = ({
  inputColor,
  currentColor = inputColor,
  contrast = 'lighten',
  loop = 0,
  isReversed = false,
  threshold = 0,
  amount = 15,
  compareTo = undefined,
}) => {
  const readability = compareTo
    ? tinycolor.readability(currentColor, compareTo)
    : tinycolor.readability(inputColor, currentColor);
  if (readability < 4.5 + threshold) {
    const transformColor = new tinycolor(currentColor)
      .desaturate(loop * 10)
    [contrast](amount)
      .toRgbString();
    // compareTo && console.log(`original: ${inputColor}, current: ${transformColor}, readability: ${readability}, compareTo: ${compareTo}, loop: ${loop}`); // For debugging purpose only
    if (loop > 7) {
      if (!isReversed) {
        const reverseContrast = contrast === 'lighten' ? 'darken' : 'lighten'; // Reverse the contrast if the loop is greater than 6 and is not reversed
        return makeContrast({
          inputColor,
          currentColor: transformColor,
          contrast: reverseContrast,
          loop: 0,
          isReversed: true,
          compareTo,
        }); // If the loop is greater than 6, reverse the contrast
      } else {
        return transformColor; // this is the last color that we can get
      }
    } else {
      return makeContrast({
        inputColor,
        currentColor: transformColor,
        contrast,
        loop: loop + 1,
        compareTo,
      }); // If the loop is less than 6, continue looping
    }
  } else {
    // compareTo && console.log(`readability is greater than ${4.5 + threshold}, loop: ${loop}, color: ${currentColor}`); // For debugging purpose only
    return currentColor;
  }
}; // makeContrast

/**
 * Returns the color that has at least a 4.5 contrast ratio with the given color.
 * @param {string} color
 * @param {boolean} mono - If true, returns black or white.
 * @returns {string}
 * more info: https://www.w3.org/TR/WCAG20-TECHS/G18.html#G18-tests
 */
const contrastColor = ({ color, mono = false }) => {
  if (!new tinycolor(color).isValid()) return color;
  const isLight = new tinycolor(color).isLight();
  if (mono) return isLight ? '#000' : '#fff';
  const contrastColor = makeContrast({
    inputColor: color,
    currentColor: color,
    contrast: isLight ? 'darken' : 'lighten',
    amount: new tinycolor(color).getBrightness() < 255 * 0.3 ? 75 : 15,
  });
  // console.log(`original color: ${color}, contrast color: ${contrastColor}`); // For debugging purpose only
  return contrastColor; // Return the contrast color
}; // contrastColor

module.exports = { contrastColor, makeContrast };
