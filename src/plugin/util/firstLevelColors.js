const getFirstLevelColors = (colors) =>
  Object.keys(colors).filter((key) => typeof colors[key] === 'object');

const btncolorOptions = (colors) => {
  // filter out key value that the value is not an object
  const firstLevelColors = getFirstLevelColors(colors);
  // return an object with the key as the color name and the value as the object's['500'] value
  return firstLevelColors.reduce((acc, color) => {
    acc[color] = colors[color]['500'];
    return acc;
  }, {});
};

const lightBtnOptions = (colors) => {
  const firstLevelColors = getFirstLevelColors(colors);
  return firstLevelColors.reduce((acc, color) => {
    acc[color] = colors[color]['100'];
    return acc;
  }, {});
};

const outlineBtnOptions = (colors) => {
  const firstLevelColors = getFirstLevelColors(colors);
  return firstLevelColors.reduce((acc, color) => {
    acc[color] = colors[color]['400'];
    return acc;
  }, {});
};
const clearBtnOptions = (colors) => {
  const firstLevelColors = getFirstLevelColors(colors);
  return firstLevelColors.reduce((acc, color) => {
    acc[color] = colors[color]['500'];
    return acc;
  }, {});
};

module.exports = {
  btncolorOptions,
  lightBtnOptions,
  outlineBtnOptions,
  clearBtnOptions,
};

//withAlphaValue(colors[color]['800'], 0.3, 1)
