const plugin = require('tailwindcss/plugin');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
const colors = require('tailwindcss/colors');
// construct an enum of color modes
const colorModes = {
  rgba: 'rgba',
  hsla: 'hsla',
  hex: 'hex',
  var: 'var',
  unkown: 'unknown',
};
const checkColorMode = (color) => {
  // check if color is either using rbga or hex
  if (typeof color !== 'string') {
    return colorModes.unkown;
  }
  if (color.includes('rgba')) {
    return colorModes.rgba;
  } else if (color.includes('#')) {
    return colorModes.hex;
  } else if (color.includes('var')) {
    // Only able to pass the var as the color,
    // Can't manipulate the color
    return colorModes.var;
  } else {
    return colorModes.unkown;
  }
};
const getRGB = (color) => {
  const mode = checkColorMode(color);
  if (mode === colorModes.hex) {
    // return as [r, g, b]
    return hexToRgb(color);
  } else if (mode === colorModes.rgba) {
    // return as [r, g, b]
    return color.match(/\d+/g).map(Number);
  } else if (mode === colorModes.var) {
    // recieve the variable name
    console.log(color);
    return color;
  } else {
    console.log(`unknown color mode: ${mode}, ${color}`);
    return color;
  }
};
const combineAlpha = (color, alpha) => {
  // convert hex color to rgb
  const [r, g, b] = getRGB(color);
  // if alpha is larger than 1, divide by 100 to get the percentage
  alpha = alpha ? (alpha > 1 ? alpha / 100 : alpha) : 1;
  // console.log(`recieved ${color} and ${alpha}`);
  color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  return color;
};
const hexToRgb = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
};
const changeColor = (mode = 'darker', color, amount, prefix = 0) => {
  const [r, g, b] = getRGB(color);
  const h = mode === 'darker' ? 0.008 * amount - prefix : 1.014 * amount + prefix;
  return `rgba(${Math.round(r * h)}, ${Math.round(g * h)}, ${Math.round(b * h)}, 1)`;
};
const getLuminance = (color) => {
  const [r, g, b] = getRGB(color);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // round to the nearest integer
  return Math.round(luminance * 100) / 100;
};
const checkDarkness = (color, mode = 'dark') => {
  const luminance = getLuminance(color);
  if (mode === 'dark') {
    return luminance < 116 ? color : checkDarkness(changeColor('darker', color, 50, 0.1), mode);
  } else {
    return luminance > 134 ? color : checkDarkness(changeColor('lighter', color, 50, 0.1), mode);
  }
};
const contrastColor = (value, step = undefined, blackWhite = false) => {
  let alpha = undefined;
  if (typeof step === 'object') {
    alpha = step.alpha;
    step = step.step;
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    // alpha && console.log(`${value[step]}:${value[step]}`);
    const color = getColor(value, step, alpha);
    // alpha && console.log(`${value[step]}:${color}`);
    const luminance = getLuminance(color);
    // alpha && console.log(`Luminance ${value[step]}:${luminance}`);
    return luminance > 128
      ? blackWhite
        ? '#000'
        : combineAlpha(checkDarkness(color, 'dark'), alpha)
      : blackWhite
        ? '#FFF'
        : combineAlpha(checkDarkness(color, 'light'), alpha);
  }
  return value;
};
const getColor = (value, step = undefined, alpha = undefined) => {
  const generateColor = () => {
    if (alpha !== undefined) {
      // console.log(`recieved ${value[step]} and ${alpha}`);
      return combineAlpha(step ? value[step] : value[500], alpha);
    }
    return step ? value[step] : value[500];
  };
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    return generateColor();
  }
  return value;
};
const generateTxtBg = (
  value,
  step,
  blackWhite = false,
  textValue = undefined,
  textStep = undefined,
  textBW = undefined
) => {
  textValue = textValue || value;
  textStep = textStep || step;
  textBW = textBW || blackWhite;
  let alpha = undefined;
  if (typeof step === 'object') {
    alpha = step.alpha;
    step = step.step;
  }
  return {
    'background-color': getColor(value, step, alpha),
    color: contrastColor(textValue, textStep, textBW),
  };
};
const generateTxtStates = (value, { hocus, active, disabled, textHocus, textActive, textDisabled }) => ({
  '&:enabled:hover': {
    ...generateTxtBg(hocus.value, hocus.step, hocus.bw, textHocus?.value, textHocus?.step, textHocus?.bw),
  },
  '&:enabled:focus-visible': {
    ...generateTxtBg(hocus.value, hocus.step, hocus.bw, textHocus?.value, textHocus?.step, textHocus?.bw),
  },
  '&:enabled:active': {
    ...generateTxtBg(active.value, active.step, active.bw, textActive?.value, textActive?.step, textActive?.bw),
  },
  '&:disabled': {
    ...generateTxtBg(
      disabled.value,
      disabled.step,
      disabled.bw,
      textDisabled?.value,
      textDisabled?.step,
      textDisabled?.bw
    ),
    cursor: 'not-allowed',
  },
});
const generateCMBtn = (value, { bw, bc, bs, fw, hocus, active }) => ({
  'border-width': bw,
  'border-color': bc,
  'box-shadow': bs,
  'font-weight': fw,
  '&:enabled:hover': hocus,
  '&:enabled:focus-visible': hocus,
  '&:enabled:active': active,
});
const generateCMClass = (value) => ({
  '.contrast &': value,
});
const buttonUtilities = (theme) => {
  return {
    /* ==== START NORMAL BUTTON ==== */
    btn: (value) => ({
      ...generateTxtBg(value, 400),
      ...generateTxtStates(value, {
        hocus: { value, step: 500, bw: true },
        active: { value, step: 600, bw: false },
        disabled: { value, step: 200 },
        textActive: { value, step: 500, bw: false },
      }),
      '.dark &': {
        ...generateTxtBg(value, 500),
        ...generateTxtStates(value, {
          hocus: { value, step: 600, bw: true },
          active: { value, step: { step: 600, alpha: 75 }, bw: true },
          disabled: { value, step: 700 },
          textActive: { value, step: 600, bw: true },
        }),
      },
      ...generateCMClass({
        ...generateTxtBg(value, 50, true),
        ...generateCMBtn(value, {
          bw: '1px',
          bc: getColor(value, 500),
          bs: `inset 0 0 0 1px ${getColor(value, 500)}, 0 0px 0px 2px ${getColor(value, 900)}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 700, true),
          active: generateTxtBg(value, 900, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, 900, true),
          ...generateCMBtn(value, {
            bw: '1px',
            bc: getColor(value, 900),
            bs: `inset 0 0 0 1px ${getColor(value, 900)}, 0 0px 0px 2px ${getColor(value, 50)}`,
            fw: 'bold',
            hocus: generateTxtBg(value, 50, true),
            active: generateTxtBg(value, 300, true),
          }),
        },
      }),
    }),
    /* ==== END NORMAL BUTTON ==== */
    /* ==== START LIGHT BUTTON ==== */
    'btn-light': (value) => ({
      ...generateTxtBg(value, { step: 100, alpha: 80 }, false, value, { step: 50, alpha: 90 }, false),
      ...generateTxtStates(value, {
        hocus: { value, step: 300 },
        active: { value, step: 200 },
        disabled: { value, step: 100 },
        textHocus: { value, step: 50, bw: true },
      }),
      '.dark &': {
        ...generateTxtBg(value, { step: 900, alpha: 40 }, false, value, { step: 800, alpha: 90 }, false),
        ...generateTxtStates(value, {
          hocus: { value, step: 800 },
          active: { value, step: 700 },
          disabled: { value, step: 900 },
        }),
      },
      ...generateCMClass({
        ...generateTxtBg(value, 50, true),
        ...generateCMBtn(value, {
          bw: '1px',
          bc: getColor(value, 500),
          bs: `inset 0 0 0 1px ${getColor(value, 500)}, 0 0px 0px 1px ${getColor(value, 900)}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 700, true),
          active: generateTxtBg(value, 900, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, 900, true),
          ...generateCMBtn(value, {
            bw: '1px',
            bc: getColor(value, 900),
            bs: `inset 0 0 0 1px ${getColor(value, 900)}, 0 0px 0px 1px ${getColor(value, 50)}`,
            fw: 'bold',
            hocus: generateTxtBg(value, 50, true),
            active: generateTxtBg(value, 300, true),
          }),
        },
      }),
    }),
    /* ==== END LIGHT BUTTON ==== */
    /* ==== START BOLD BUTTON ==== */
    'btn-bold': (value) => ({
      ...generateTxtBg(value, { step: 700, alpha: 90 }, false, value, { step: 700, alpha: 90 }, false),
      ...generateTxtStates(value, {
        hocus: { value, step: { step: 800, alpha: 80 } },
        active: { value, step: 800 },
        disabled: { value, step: { step: 800, alpha: 60 } },
        textHocus: { value, step: 900 },
      }),
      '.dark &': {
        ...generateTxtBg(value, { step: 900, alpha: 90 }, false, value, { step: 900, alpha: 90 }, false),
        ...generateTxtStates(value, {
          hocus: { value, step: { step: 900, alpha: 65 } },
          active: { value, step: 800 },
          disabled: { value, step: { step: 900, alpha: 40 } },
          textHocus: { value, step: 900, bw: true },
        }),
      },
      ...generateCMClass({
        ...generateTxtBg(value, 50, true),
        ...generateCMBtn(value, {
          bw: '3px',
          bc: getColor(value, 500),
          bs: `inset 0 0 0 3px ${getColor(value, 500)}, 0 0px 0px 3px ${getColor(value, 900)}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 700, true),
          active: generateTxtBg(value, 900, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, 900, true),
          ...generateCMBtn(value, {
            bw: '3px',
            bc: getColor(value, 900),
            bs: `inset 0 0 0 3px ${getColor(value, 900)}, 0 0px 0px 3px ${getColor(value, 50)}`,
            fw: 'bold',
            hocus: generateTxtBg(value, 50, true),
            active: generateTxtBg(value, 300, true),
          }),
        },
      }),
    }),
    /* ==== END BOLD BUTTON ==== */
    /* ==== START OUTLINE BUTTON ==== */
    'btn-outline': (value) => ({
      ...generateTxtBg(value, { step: 50, alpha: 0.01 }, false, getColor(value, 500), 50, false),
      ...generateTxtStates(value, {
        hocus: { value, step: 500, bw: true },
        active: { value, step: { step: 600, alpha: 85 } },
        disabled: { value, step: { step: 50, alpha: 50 } },
        textActive: { value, step: 500, bw: true },
      }),
      'border-color': getColor(value, 500),
      'border-width': '1px',
      'border-style': 'solid',
      '.dark &': {
        ...generateTxtBg(value, { step: 900, alpha: 0.01 }, false, getColor(value, 400), 50, false),
        ...generateTxtStates(value, {
          hocus: { value, step: 500, bw: true },
          active: { value, step: { step: 400, alpha: 85 } },
          disabled: { value, step: { step: 50, alpha: 50 } },
          textActive: { value, step: 500, bw: true },
        }),
        'border-color': getColor(value, 400),
      },
      ...generateCMClass({
        ...generateTxtBg(value, { step: 50, alpha: 0.01 }, false, getColor(value, 700), 50, false),
        ...generateCMBtn(value, {
          bw: '1px',
          bc: getColor(value, 700),
          bs: `inset 0 0 0 3px ${getColor(value, 700)}, 0 0px 0px 3px ${getColor(value, 50)}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 50, true),
          active: generateTxtBg(value, 300, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, { step: 900, alpha: 0.01 }, false, getColor(value, 100), 50, false),
          ...generateCMBtn(value, {
            bw: '1px',
            bc: getColor(value, 200),
            bs: `inset 0 0 0 3px ${getColor(value, 700)}, 0 0px 0px 3px ${getColor(value, 100)}`,
            fw: 'bold',
            hocus: generateTxtBg(value, 700, true),
            active: generateTxtBg(value, { step: 900, alpha: 60 }, true, value, 900, true),
          }),
        },
      }),
    }),
  };
};

const tooltipStyle = {
  minWidth: '80px',
  minHeight: 'fit-content',
  display: 'none',
  position: 'absolute',
  borderRadius: '0.25rem',
  backgroundColor: colors.stone[700],
  color: colors.stone[50],
  padding: '0.5rem',
  fontSize: '0.75rem',
  zIndex: 20,
  textAlign: 'center',
};
const tooltipArrowStyle = {
  content: '""',
  display: 'none',
  position: 'absolute',
  width: 12,
  height: 12,
  zIndex: 19,
  borderStyle: 'solid',
  borderColor: `${colors.stone[700]}`,
  borderRadius: 3,
};

module.exports = plugin(function ({ matchUtilities, addVariant, addComponents, addBase, theme }) {
  /* eslint-disable no-unused-expressions */
  matchUtilities(
    buttonUtilities(theme),
    // values is the key of the theme colors object
    { values: theme('colors'), type: ['color'] }
  ),
    matchUtilities(
      {
        'bg-grid': (value) => ({
          'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='${encodeURIComponent(
            value
          )}'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }),
      },
      { values: flattenColorPalette(theme('colors')), type: ['image', 'color'] }
    ),
    addBase({
      [[
        '[data-tooltip-top]:hover::before',
        '[data-tooltip-left]:hover::before',
        '[data-tooltip-right]:hover::before',
        '[data-tooltip-bottom]:hover::before',
        '[data-tooltip-top]:hover::after',
        '[data-tooltip-left]:hover::after',
        '[data-tooltip-right]:hover::after',
        '[data-tooltip-bottom]:hover::after',
        '[data-tooltip-top]:focus-within::before',
        '[data-tooltip-left]:focus-within::before',
        '[data-tooltip-right]:focus-within::before',
        '[data-tooltip-bottom]:focus-within::before',
        '[data-tooltip-top]:focus-within::after',
        '[data-tooltip-left]:focus-within::after',
        '[data-tooltip-right]:focus-within::after',
        '[data-tooltip-bottom]:focus-within::after',
      ]]: {
        display: 'inline-block',
      },
      [['[data-tooltip-top]', '[data-tooltip-left]', '[data-tooltip-right]', '[data-tooltip-bottom]']]: {
        position: 'relative',
      },
      '[data-tooltip-top]::before': {
        ...tooltipStyle,
        content: 'attr(data-tooltip-top)',
        left: -20,
        right: -20,
        bottom: 'calc(100% + 6px)',
      },
      '[data-tooltip-top]::after': {
        ...tooltipArrowStyle,
        transform: 'rotate(45deg)',
        bottom: 'calc(100% + 3px)',
        left: 'calc(50% - 6px)',
        borderWidth: '0 8px 8px 0',
      },
      '[data-tooltip-left]::before': {
        ...tooltipStyle,
        content: 'attr(data-tooltip-left)',
        top: 0,
        bottom: 0,
        right: 'calc(100% + 6px)',
      },
      '[data-tooltip-left]::after': {
        ...tooltipArrowStyle,
        transform: 'rotate(225deg)',
        top: 'calc(50% - 6px)',
        right: 'calc(100% + 3px)',
        borderWidth: '0 0 8px 8px',
      },
      '[data-tooltip-right]::before': {
        ...tooltipStyle,
        content: 'attr(data-tooltip-right)',
        top: 0,
        bottom: 0,
        left: 'calc(100% + 6px)',
      },
      '[data-tooltip-right]::after': {
        ...tooltipArrowStyle,
        transform: 'rotate(135deg)',
        top: 'calc(50% - 6px)',
        left: 'calc(100% + 3px)',
        borderWidth: '8px 8px 0 0',
      },
      '[data-tooltip-bottom]::before': {
        ...tooltipStyle,
        content: 'attr(data-tooltip-bottom)',
        top: 'calc(100% + 6px)',
        left: -20,
        right: -20,
      },
      '[data-tooltip-bottom]::after': {
        ...tooltipArrowStyle,
        transform: 'rotate(135deg)',
        top: 'calc(100% + 3px)',
        left: 'calc(50% - 6px)',
        borderWidth: '0 8px 8px 0',
      },
    }),
    addVariant('hocus', ['&:hover', '&:focus-visible']),
    addVariant('hocus-enabled', ['&:enabled:hover', '&:enabled:focus-visible']),
    addVariant('active-enabled', ['&:enabled:active']),
    addVariant('contrast', ['.contrast &', '@media (prefers-contrast: more)']);
});
