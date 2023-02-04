const { contrastColor } = require('./contrastColor');

const generateBtnTextBg = (color, backgroundColor = color, mono = false) => {
  if (typeof color === 'object') {
    return color;
  } else {
    return {
      color: contrastColor({ color, mono }),
      'background-color': backgroundColor,
    };
  }
};

module.exports = {
  generateBtnTextBg,
};
