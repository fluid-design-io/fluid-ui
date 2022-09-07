const plugin = require('tailwindcss/plugin');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');
const colors = require('tailwindcss/colors');
/** @type {import('tinycolor2')} */
const tinycolor = require('./tinycolor');

// const resolveConfig = require('tailwindcss/resolveConfig');
// const tailwindConfig = require('../tailwind.config');

// const fullConfig = resolveConfig(tailwindConfig);
// console.log(JSON.stringify(fullConfig.theme.extend.colors, null, 2));
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
    return colorModes.var;
  } else {
    console.log(`unknown color mode: ${color}`);
    return colorModes.unkown;
  }
};
const stepMap = {
  50: 0.95,
  100: 0.9,
  200: 0.8,
  300: 0.7,
  400: 0.6,
  500: 0.5,
  600: 0.4,
  700: 0.3,
  800: 0.2,
  900: 0.1,
}

const getColor = (value, step = 500, alpha = 1) => {
  if (alpha > 1) {
    alpha /= 100;
  }
  if (alpha <= 0) {
    return tinycolor('transparent').toHslString();
  }
  if (typeof value === 'string') {
    if (tinycolor(value).isValid()) {
      const { h, s, a } = tinycolor(value).setAlpha(alpha).toHsl();
      return tinycolor({ h, s, l: stepMap[step], a }).toHslString();
    }
    return value;
  }
  if (typeof value === 'object') {
    if (typeof value[step] === 'function') {
      return value[step]();
    }
    const mode = checkColorMode(value[step]);
    if (mode === colorModes.var) {
      // the string will look like this: rgb(var(--tw-color-gray-50) / <alpha-value>)
      const raw = value[step];
      const colorVar = raw.split('var(')[1].split(')')[0];
      if (typeof window !== 'undefined') {
        const documentColor = getComputedStyle(document.documentElement).getPropertyValue(colorVar);
        console.log(documentColor);
      }
      /* console.log(`
      -------
      ${value[step]}
      rgb(${colorVar} / ${alpha})
      -------`); */
      return `rgb(var(${colorVar}) / ${alpha})`;
    }
    const hex = step ? value[step] : value[500];
    return tinycolor(hex).setAlpha(alpha).toHslString();
  }
  throw new Error(`Invalid color: ${value} at step ${step}`);
};

const changeColor = (mode = 'darken', hslaString, amount = 15) => {
  const hsla = tinycolor(hslaString);
  // change the color
  if (mode === 'darken') {
    return hsla.darken(amount).desaturate().toHslString();
  }
  if (mode === 'lighten') {
    return hsla.brighten(amount).desaturate().toHslString();
  }
};

const checkDarkness = (hslaString, newColorString = hslaString, mode = 'darken', loop = 0, inverted = false) => {
  const readability = tinycolor.readability(hslaString, newColorString);
  /* loop > 7 && console.log(`
    ---------
    mode: ${mode}, color: ${hsla}, newColor: ${newColor}
    readability: ${readability}
    ---------
  `); */
  if (loop > 6 && inverted) {
    // if we've reached the max loop and inverted the color and is still not readable, 
    // then we return the original color
    return newColorString;
  }
  if (loop > 6) {
    // because we either darken or lighten 15% each time, 
    // After 6 loops, the color will be either black or white,
    // But if the readability is still not good, that means we
    // need to invert the color
    if (readability < 4.5) {
      const invertMode = mode === 'darken' ? 'lighten' : 'darken';
      // console.log(`inverting color ${hslaString} mode to ${invertMode}, readability: ${readability}, loop: ${loop}`);
      return checkDarkness(hslaString, changeColor(invertMode, hslaString, 35), invertMode, 0, true);
    }
  }
  if (readability < 4.5) {
    // console.log(`readability: ${readability}, hsla: ${hslaString} newColor: ${newColorString}`);
    return checkDarkness(hslaString, changeColor(mode, newColorString), mode, loop + 1, inverted);
  } else {
    return newColorString;
  }
};
/**
 * A custom is Light function that takes care of bright colors such as yello to blue range
 * 
 * @param {hsla} @type {tinycolor.Instance}
 * @returns {boolean}
 */
const isLight = (hsla) => {
  let { h, s, l } = tinycolor(hsla).toHsl();
  // if h is between 80 and 170, and s is between 0.7 and 1, or l is between > 0.47, then it's light
  return (h >= 45 && h <= 189 && s >= 0.7 && l >= 0.35) || (l >= 0.475);
}

const convertVarWithAlpha = (color, alpha) => {
  const colorVar = color.split('var(')[1].split(')')[0]; // looks like this: --tw-color-gray-50
  const colorStep = colorVar.split('-')[colorVar.split('-').length - 1];
  const parsedColorStep = parseInt(colorStep);
  if (parsedColorStep <= 400) {
    if (alpha && alpha <= 50) {
      return `rgb(var(--tw-color-primary-100) / ${alpha ? alpha / 100 : 1})`;
    }
    return `rgb(var(--tw-color-primary-900) / ${alpha ? alpha / 100 : 1})`;
  } else {
    if (alpha && alpha <= 50) {
      return `rgb(var(--tw-color-primary-900) / ${alpha ? alpha / 100 : 1})`;
    }
    return `rgb(var(--tw-color-primary-100) / ${alpha ? alpha / 100 : 1})`;
  }
}

const getTinycolorContrast = (hslaString, blackWhite) => {
  return isLight(hslaString)
    ? blackWhite
      ? '#000'
      : checkDarkness(hslaString, undefined, 'darken')
    : blackWhite
      ? '#FFF'
      : checkDarkness(hslaString, undefined, 'lighten');
}
/**
 * 
 * @param {*} value 
 * @param {*} step 
 * @param {*} blackWhite 
 * @param {*} shouldContrast - if true and the `value` is typeof `string`, it will return its contrast color
 * @returns 
 */
const contrastColor = (value, step = undefined, blackWhite = false, shouldContrast = true) => {
  let alpha = undefined;
  const colorMode = checkColorMode(value[step]);
  if (typeof step === 'object') {
    alpha = step.alpha;
    step = step.step;
  }
  if (typeof value === 'string') {
    if (colorMode === colorModes.var) {
      console.log(`value: ${value}, step: ${step}, alpha: ${alpha}`);
      return convertVarWithAlpha(value, alpha);
    }
    if (tinycolor(value).isValid()) {
      const hslaString = tinycolor(value).toHslString();
      return shouldContrast ? getTinycolorContrast(hslaString, blackWhite) : hslaString;
    }
    return value;
  } else if (typeof value === 'object') {
    // alpha && console.log(`${value[step]}:${value[step]}`);
    if (colorMode === colorModes.var) {
      return convertVarWithAlpha(value[step], alpha);
    } else {
      const hslaString = getColor(value, step, alpha);
      // alpha && console.log(`Luminance ${value[step]}:${isLight}`);
      return getTinycolorContrast(hslaString, blackWhite);
    }
  }
  return value;
};
const toColor = (value) => {
  if (tinycolor(value).isValid()) {
    return tinycolor(value).toHslString();
  } else if (typeof value === 'string') {
    return value;
  } else {
    throw new Error(`Invalid color: ${value} in function toColor`);
  }
};
const buttonDefault = {
  transition: 'all 0.15s ease-in-out',
}
const generateTxtBg = (
  value,
  step = undefined,
  blackWhite = false,
  textValue = value,
  textStep = step,
  textBW = blackWhite,
  shouldContrast = true
) => {
  let alpha = undefined;
  if (typeof step === 'object') {
    alpha = step.alpha;
    step = step.step;
  }
  return {
    'background-color': toColor(getColor(value, step, alpha)),
    color: toColor(contrastColor(textValue, textStep, textBW, shouldContrast)),
  };
};
const generateTxtStates = (
  value,
  { hocus, active, disabled, textHocus, textActive, textDisabled }
) => ({
  '&:not([href]):enabled:hover, &:not([type]):hover': {
    ...generateTxtBg(
      hocus.value,
      hocus?.step,
      hocus?.bw,
      textHocus?.value,
      textHocus?.step,
      textHocus?.bw,
      textHocus?.shouldContrast
    ),
  },
  '&:not([href]):enabled:focus-visible, &:not([type]):focus-visible': {
    ...generateTxtBg(
      hocus.value,
      hocus?.step,
      hocus?.bw,
      textHocus?.value,
      textHocus?.step,
      textHocus?.bw,
      textHocus?.shouldContrast
    ),
  },
  '&:not([href]):enabled:active, &:not([type]):active': {
    ...generateTxtBg(
      active.value,
      active?.step,
      active?.bw,
      textActive?.value,
      textActive?.step,
      textActive?.bw,
      textActive?.shouldContrast
    ),
  },
  '&:not([href]):disabled': {
    ...generateTxtBg(
      disabled.value,
      disabled?.step,
      disabled?.bw,
      textDisabled?.value,
      textDisabled?.step,
      textDisabled?.bw,
      textDisabled?.shouldContrast
    ),
    cursor: 'not-allowed',
  },
});
const generateCMBtn = (value, { bw, bc, bs, fw, hocus, active }) => ({
  'border-width': bw,
  'border-color': bc,
  'box-shadow': bs,
  'font-weight': fw,
  '&:hover': hocus,
  '&:focus-visible': hocus,
  '&:active': active,
});
const generateCMClass = (value) => ({
  '.contrast &': value,
});
const buttonUtilities = (theme) => {
  return {
    /* ==== START NORMAL BUTTON ==== */
    btn: (value) => ({
      ...buttonDefault,
      ...generateTxtBg(value, 400),
      ...generateTxtStates(value, {
        hocus: { value, step: 500, bw: true },
        active: { value, step: 600 },
        disabled: { value, step: 200 },
        textActive: { value, step: 500 },
      }),
      '.dark &': {
        ...generateTxtBg(value, 500),
        ...generateTxtStates(value, {
          hocus: { value, step: 600, bw: true },
          active: { value, step: { step: 600, alpha: 70 }, bw: true },
          disabled: { value, step: 700 },
          textActive: { value, step: 600, bw: true },
        }),
      },
      ...generateCMClass({
        ...generateTxtBg(value, 50, true),
        ...generateCMBtn(value, {
          bw: '1px',
          bc: toColor(getColor(value, 500)),
          bs: `inset 0 0 0 1px ${toColor(
            getColor(value, 500)
          )}, 0 0px 0px 2px ${toColor(getColor(value, 900))}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 700, true),
          active: generateTxtBg(value, 900, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, 900, true),
          ...generateCMBtn(value, {
            bw: '1px',
            bc: toColor(getColor(value, 900)),
            bs: `inset 0 0 0 1px ${toColor(
              getColor(value, 900)
            )}, 0 0px 0px 2px ${toColor(getColor(value, 50))}`,
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
      ...buttonDefault,
      ...generateTxtBg(
        value,
        { step: 100, alpha: 80 },
        false,
        value,
        { step: 200, alpha: 90 },
        false
      ),
      ...generateTxtStates(value, {
        hocus: { value, step: 200 },
        active: { value, step: { step: 400, alpha: 65 } },
        disabled: { value, step: 100 },
      }),
      '.dark &': {
        ...generateTxtBg(
          value,
          { step: 900, alpha: 40 },
          false,
          value,
          900,
          false
        ),
        ...generateTxtStates(value, {
          hocus: { value, step: 800 },
          active: { value, step: 900 },
          disabled: { value, step: 900 },
        }),
      },
      ...generateCMClass({
        ...generateTxtBg(value, 50, true),
        ...generateCMBtn(value, {
          bw: '1px',
          bc: toColor(getColor(value, 500)),
          bs: `inset 0 0 0 1px ${toColor(
            getColor(value, 500)
          )}, 0 0px 0px 2px ${toColor(getColor(value, 900))}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 700, true),
          active: generateTxtBg(value, 900, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, 900, true),
          ...generateCMBtn(value, {
            bw: '1px',
            bc: toColor(getColor(value, 900)),
            bs: `inset 0 0 0 1px ${toColor(
              getColor(value, 900)
            )}, 0 0px 0px 2px ${toColor(getColor(value, 50))}`,
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
      ...buttonDefault,
      ...generateTxtBg(
        value,
        { step: 700, alpha: 90 },
        false,
        value,
        900,
        true
      ),
      ...generateTxtStates(value, {
        hocus: { value, step: { step: 800, alpha: 80 } },
        active: { value, step: 800 },
        disabled: { value, step: { step: 800, alpha: 60 } },
        textHocus: { value, step: 900, bw: true },
      }),
      '.dark &': {
        ...generateTxtBg(
          value,
          { step: 900, alpha: 85 },
          false,
          value,
          { step: 900, alpha: 100 },
          false
        ),
        ...generateTxtStates(value, {
          hocus: { value, step: { step: 900, alpha: 65 } },
          active: { value, step: { step: 900, alpha: 45 } },
          disabled: { value, step: { step: 900, alpha: 40 } },
          textHocus: { value, step: 900, bw: true },
          textActive: { value, step: 900, bw: true },
        }),
      },
      ...generateCMClass({
        ...generateTxtBg(value, 50, true),
        ...generateCMBtn(value, {
          bw: '3px',
          bc: toColor(getColor(value, 500)),
          bs: `inset 0 0 0 1px ${toColor(
            getColor(value, 500)
          )}, 0 0px 0px 3px ${toColor(getColor(value, 900))}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 700, true),
          active: generateTxtBg(value, 900, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, 900, true),
          ...generateCMBtn(value, {
            bw: '3px',
            bc: toColor(getColor(value, 900)),
            bs: `inset 0 0 0 1px ${toColor(
              getColor(value, 900)
            )}, 0 0px 0px 3px ${toColor(getColor(value, 50))}`,
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
      ...buttonDefault,
      ...generateTxtBg(
        'transparent',
        { step: 50, alpha: 0 },
        false,
        toColor(getColor(value, 700)),
        50,
        false,
        false
      ),
      ...generateTxtStates(value, {
        hocus: { value, step: { step: 400, alpha: 20 } },
        active: { value, step: { step: 400, alpha: 30 } },
        disabled: { value: "transparent" },
        textHocus: { value: toColor(getColor(value, 900)), shouldContrast: false },
        textActive: { value: toColor(getColor(value, 900)), shouldContrast: false },
        textDisabled: { value: toColor(getColor(value, 700)), shouldContrast: false },
      }),
      'border-width': '1px',
      'border-style': 'solid',
      'border-color': toColor(getColor(value, 500, 30)),
      '&:hover, &:focus-visible': {
        'border-color': toColor(getColor(value, 400, 95)),
      },
      '.dark &': {
        ...generateTxtBg(
          'transparent',
          { step: 900, alpha: 0 },
          false,
          toColor(getColor(value, 200)),
          50,
          false,
          false
        ),
        ...generateTxtStates(value, {
          hocus: { value, step: { step: 500, alpha: 20 } },
          active: { value, step: { step: 500, alpha: 30 } },
          disabled: { value, step: { step: 900, alpha: 0 } },
          textHocus: { value: toColor(getColor(value, 50)), shouldContrast: false },
          textActive: { value: toColor(getColor(value, 50)), shouldContrast: false },
          textDisabled: { value: toColor(getColor(value, 300)), shouldContrast: false },
        }),
        'border-color': toColor(getColor(value, 400, 30)),
        '&:hover, &:focus-visible': {
          'border-color': toColor(getColor(value, 200, 85)),
        },
      },
      ...generateCMClass({
        ...generateTxtBg(
          value,
          { step: 50, alpha: 0 },
          false,
          toColor(getColor(value, 700)),
          50,
          false
        ),
        ...generateCMBtn(value, {
          bw: '1px',
          bc: toColor(getColor(value, 700)),
          bs: `inset 0 0 0 1px ${toColor(
            getColor(value, 700)
          )}, 0 0px 0px 2px ${toColor(getColor(value, 50))}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 50, true),
          active: generateTxtBg(value, 300, true),
        }),
        '.dark &': {
          ...generateTxtBg(
            value,
            { step: 900, alpha: 0 },
            false,
            toColor(getColor(value, 100)),
            50,
            false
          ),
          ...generateCMBtn(value, {
            bw: '1px',
            bc: toColor(getColor(value, 200)),
            bs: `inset 0 0 0 1px ${toColor(
              getColor(value, 700)
            )}, 0 0px 0px 2px ${toColor(getColor(value, 100))}`,
            fw: 'bold',
            hocus: generateTxtBg(value, 700, true),
            active: generateTxtBg(
              value,
              { step: 900, alpha: 60 },
              true,
              value,
              900,
              true
            ),
          }),
        },
      }),
    }),
    /* ==== END OUTLINE BUTTON ==== */
    /* ==== START CLEAR BUTTON ==== */
    'btn-clear': (value) => ({
      ...buttonDefault,
      ...generateTxtBg(
        value,
        { step: 50, alpha: 0 },
        false,
        toColor(getColor(value, 500)),
        50,
        false,
        false
      ),
      ...generateTxtStates(value, {
        hocus: { value, step: 100 },
        active: { value, step: { step: 200, alpha: 80 } },
        disabled: { value, step: { step: 50, alpha: 0 } },
        textHocus: { value: toColor(getColor(value, 600)), shouldContrast: false }, // step is not calculated when value is a hex string
        textActive: { value: toColor(getColor(value, 600)), shouldContrast: false },
        textDisabled: { value: toColor(getColor(value, 300)), shouldContrast: false },
      }),
      'border-width': '1px',
      'border-style': 'solid',
      'border-color': 'transparent',
      '&:hover, &:focus-visible': {
        'border-color': toColor(getColor(value, 400, 25)),
      },
      '.dark &': {
        ...generateTxtBg(
          value,
          { step: 900, alpha: 0 },
          false,
          toColor(getColor(value, 400)),
          50,
          false,
          false
        ),
        ...generateTxtStates(value, {
          hocus: { value, step: { step: 600, alpha: 30 } },
          active: { value, step: { step: 600, alpha: 20 } },
          disabled: { value: "transparent" },
          textHocus: { value: toColor(getColor(value, 100)), shouldContrast: false },
          textActive: { value: toColor(getColor(value, 100)), shouldContrast: false },
          textDisabled: { value: toColor(getColor(value, 600)), shouldContrast: false },
        }),
        '&:hover, &:focus-visible': {
          'border-color': toColor(getColor(value, 300, 25)),
        },
      },
      ...generateCMClass({
        ...generateTxtBg(
          value,
          { step: 50, alpha: 0 },
          false,
          toColor(getColor(value, 700)),
          50,
          false
        ),
        ...generateCMBtn(value, {
          bw: '1px',
          bc: toColor(getColor(value, 500)),
          bs: `inset 0 0 0 1px ${toColor(
            getColor(value, 500)
          )}, 0 0px 0px 2px ${toColor(getColor(value, 900))}`,
          fw: 'bold',
          hocus: generateTxtBg(value, 700, true),
          active: generateTxtBg(value, 900, true),
        }),
        '.dark &': {
          ...generateTxtBg(value, 900, true),
          ...generateCMBtn(value, {
            bw: '1px',
            bc: toColor(getColor(value, 900)),
            bs: `inset 0 0 0 1px ${toColor(
              getColor(value, 900)
            )}, 0 0px 0px 2px ${toColor(getColor(value, 50))}`,
            fw: 'bold',
            hocus: generateTxtBg(value, 50, true),
            active: generateTxtBg(value, 300, true),
          }),
        },
      }),
    }),
    /* ==== END CLEAR BUTTON ==== */
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

module.exports = plugin(function ({
  matchUtilities,
  addVariant,
  addComponents,
  addBase,
  theme,
}) {
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
      [[
        '[data-tooltip-top]',
        '[data-tooltip-left]',
        '[data-tooltip-right]',
        '[data-tooltip-bottom]',
      ]]: {
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
    addVariant('hocus-enabled', ['&:hover', '&:focus-visible']),
    addVariant('active-enabled', ['&:active']),
    addVariant('contrast', ['.contrast &', '@media (prefers-contrast: more)']);
});
