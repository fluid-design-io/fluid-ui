const plugin = require('tailwindcss/plugin');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');
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
    return colorModes.var;
  } else {
    console.log(`unknown color mode: ${color}`);
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
    return color;
  } else {
    console.log(`unknown color mode: ${mode}, ${color}`);
    return color;
  }
};
const hexToRgb = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
};
const rgbToHsl = (r, g, b, a = 1) => {
  r /= 255;
  g /= 255;
  b /= 255;
  if (a > 1) a /= 100;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  // round to 2 decimal places
  return [rounded(h), rounded(s), rounded(l), a];
};
const getColor = (value, step = 500, alpha = 1) => {
  if (alpha > 1) {
    alpha /= 100;
  }
  if (alpha <= 0) {
    return 'transparent';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object') {
    if (typeof value[step] === 'function') {
      return value[step]();
    }
    const mode = checkColorMode(value[step]);
    if (mode === colorModes.var) {
      // the string will look like this: rgb(var(--tw-color-primary-50) / <alpha-value>)
      const raw = value[step];
      const colorVar = raw.split('var(')[1].split(')')[0];
      /* console.log(`
      -------
      ${value[step]}
      rgb(${colorVar} / ${alpha})
      -------`); */
      return `rgb(var(${colorVar}) / ${alpha})`;
    }
    const hex = step ? value[step] : value[500];
    const [r, g, b] = getRGB(hex);
    const [h, s, l, a] = rgbToHsl(r, g, b, alpha);
    return [h, s, l, a];
  }
  return undefined;
};
const rounded = (num) => Math.round(num * 100) / 100;
/* const hslToRgb = (h, s, l) => {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}; */

const changeColor = (mode = 'dark', hsla) => {
  const amount = 0.15;
  let [h, s, l, a] = hsla;
  // change the color
  if (mode === 'dark') {
    l -= amount;
    l = l < 0 ? 0 : l;
    s *= 0.9;
  }
  if (mode === 'light') {
    l += amount;
    l = l > 1 ? 1 : l;
    s *= 0.9;
  }
  return [h, rounded(s), rounded(l), a];
};
const getLuminance = (hsla) => {
  const l = hsla[2];
  const a = hsla[3];
  return rounded(l * a);
};
const checkDarkness = (hsla, newColor = hsla, mode = 'dark', loop = 0) => {
  const originalLuminance = getLuminance(hsla);
  const newLuminance = getLuminance(newColor);
  /* loop > 7 && console.log(`
    ---------
    mode: ${mode}, color: ${hsla}, newColor: ${newColor}
    originalLuminance: ${originalLuminance}, newLuminance: ${newLuminance},
    difference: ${Math.abs(originalLuminance - newLuminance)}
    ---------
  `); */
  if (loop >= 10) {
    return newColor;
  }
  if (
    Math.abs(originalLuminance - newLuminance) > 0.5 * hsla[3] ||
    newLuminance > 0.95 ||
    newLuminance < 0.05
  ) {
    return newColor;
  } else {
    return checkDarkness(hsla, changeColor(mode, newColor), mode, loop + 1);
  }
};
const isLight = (hsla) => {
  let [h, s, l] = hsla;
  h = h * 360;
  // if h is between 80 and 170, and s is between 0.7 and 1, or l is between > 0.47, then it's light
  return (h >= 45 && h <= 188 && s >= 0.7 && l >= 0.35) || (l >= 0.475);
}

const contrastColor = (value, step = undefined, blackWhite = false) => {
  let alpha = undefined;
  if (typeof step === 'object') {
    alpha = step.alpha;
    step = step.step;
  }
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'object') {
    // alpha && console.log(`${value[step]}:${value[step]}`);
    const colorMode = checkColorMode(value[step]);
    if (colorMode === colorModes.var) {
      return value[step];
    } else {
      const hsla = getColor(value, step, alpha);
      // alpha && console.log(`Luminance ${value[step]}:${isLight}`);
      return isLight(hsla)
        ? blackWhite
          ? '#000'
          : checkDarkness(hsla, undefined, 'dark')
        : blackWhite
          ? '#FFF'
          : checkDarkness(hsla, undefined, 'light');
    }
  }
  return value;
};
const toColor = (value) => {
  if (typeof value === 'string') {
    return value;
  } // else if check if value is an array
  else if (typeof value === 'object') {
    const colorMode = checkColorMode(value);
    return `hsla(${value[0] * 360}, ${value[1] * 100}%, ${value[2] * 100}%, ${value[3]
      })`;
  }
  return value;
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
) => {
  let alpha = undefined;
  if (typeof step === 'object') {
    alpha = step.alpha;
    step = step.step;
  }
  return {
    'background-color': toColor(getColor(value, step, alpha)),
    color: toColor(contrastColor(textValue, textStep, textBW)),
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
      textHocus?.bw
    ),
  },
  '&:not([href]):enabled:focus-visible, &:not([type]):focus-visible': {
    ...generateTxtBg(
      hocus.value,
      hocus?.step,
      hocus?.bw,
      textHocus?.value,
      textHocus?.step,
      textHocus?.bw
    ),
  },
  '&:not([href]):enabled:active, &:not([type]):active': {
    ...generateTxtBg(
      active.value,
      active?.step,
      active?.bw,
      textActive?.value,
      textActive?.step,
      textActive?.bw
    ),
  },
  '&:not([href]):disabled': {
    ...generateTxtBg(
      disabled.value,
      disabled?.step,
      disabled?.bw,
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
          { step: 900, alpha: 100 },
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
        false
      ),
      ...generateTxtStates(value, {
        hocus: { value, step: { step: 400, alpha: 20 } },
        active: { value, step: { step: 400, alpha: 30 } },
        disabled: { value: "transparent" },
        textHocus: { value: toColor(getColor(value, 900)) },
        textActive: { value: toColor(getColor(value, 900)) },
        textDisabled: { value: toColor(getColor(value, 700)) },
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
          false
        ),
        ...generateTxtStates(value, {
          hocus: { value, step: { step: 500, alpha: 20 } },
          active: { value, step: { step: 500, alpha: 30 } },
          disabled: { value, step: { step: 900, alpha: 0 } },
          textHocus: { value: toColor(getColor(value, 50)) },
          textActive: { value: toColor(getColor(value, 50)) },
          textDisabled: { value: toColor(getColor(value, 300)) },
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
        false
      ),
      ...generateTxtStates(value, {
        hocus: { value, step: 100 },
        active: { value, step: { step: 200, alpha: 85 } },
        disabled: { value, step: { step: 50, alpha: 0 } },
        textHocus: { value: toColor(getColor(value, 600)) }, // step is not calculated when value is a hex string
        textActive: { value: toColor(getColor(value, 600)) },
        textDisabled: { value: toColor(getColor(value, 300)) },
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
          false
        ),
        ...generateTxtStates(value, {
          hocus: { value, step: { step: 600, alpha: 30 } },
          active: { value, step: { step: 600, alpha: 20 } },
          disabled: { value: "transparent" },
          textHocus: { value: toColor(getColor(value, 100)) },
          textActive: { value: toColor(getColor(value, 100)) },
          textDisabled: { value: toColor(getColor(value, 600)) },
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
