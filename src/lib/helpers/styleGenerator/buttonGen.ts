/* 

This generator will generate gradients for the tones based on the colors.

*/

import { colorsWithHex } from './tailwindColors';

const base =
  'select-none disabled:cursor-not-allowed disabled:opacity-80 disabled:filter disabled:saturate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-transparent';
const getActive = (color: string) =>
  `ring-2 ring-offset-2 ring-offset-${color}-50 dark:ring-offset-${color}-800`;
const getLight = (color: string) =>
  `
    bg-${color}-50
    text-${color}-500
    focus-visible:bg-${color}-100
    enabled:hover:bg-${color}-100
    enabled:hover:text-${color}-600
    focus-visible:text-${color}-600
    enabled:active:bg-${color}-200

    contrast-more:border
    contrast-more:bg-${color}-50
    contrast-more:text-${color}-900
    contrast-more:border-${color}-800
    contrast-more:enabled:hover:bg-${color}-50
    contrast-more:focus-visible:bg-${color}-50
    contrast-more:enabled:hover:text-${color}-900

    dark:bg-${color}-900/40
    dark:text-${color}-100
    dark:enabled:hover:bg-${color}-900/60
    dark:focus-visible:bg-${color}-900/60
    dark:enabled:active:bg-${color}-900/90
    dark:enabled:hover:text-${color}-100
    dark:focus-visible:text-${color}-100

    dark:contrast-more:font-bold
    dark:contrast-more:bg-black
    dark:contrast-more:text-${color}-50
    dark:contrast-more:enabled:hover:bg-${color}-800
    dark:contrast-more:focus-visible:bg-${color}-800
    dark:contrast-more:enabled:hover:text-${color}-50
    dark:contrast-more:focus-visible:text-${color}-50
    dark:contrast-more:border-${color}-200

    focus-visible:ring-${color}-500

    dark:focus-visible:ring-offset-${color}-600
`;

const getNormal = (color: string) =>
  `
    bg-${color}-500
    text-${color}-50
    focus-visible:bg-${color}-600
    enabled:hover:bg-${color}-600
    enabled:hover:text-${color}-100
    focus-visible:text-${color}-100
    enabled:active:bg-${color}-700

    contrast-more:border
    contrast-more:bg-${color}-50
    contrast-more:text-${color}-900
    contrast-more:border-${color}-800
    contrast-more:enabled:hover:bg-${color}-50
    contrast-more:focus-visible:bg-${color}-50
    contrast-more:enabled:hover:text-${color}-900

    dark:bg-${color}-600
    dark:text-${color}-50
    dark:enabled:hover:bg-${color}-500
    dark:focus-visible:bg-${color}-500
    dark:enabled:active:bg-${color}-600/80
    dark:enabled:hover:text-${color}-50
    dark:focus-visible:text-${color}-50

    dark:contrast-more:font-bold
    dark:contrast-more:bg-black
    dark:contrast-more:text-${color}-50
    dark:contrast-more:enabled:hover:bg-${color}-800
    dark:contrast-more:focus-visible:bg-${color}-800
    dark:contrast-more:enabled:hover:text-${color}-50
    dark:contrast-more:focus-visible:text-${color}-50
    dark:contrast-more:border-${color}-200

    focus-visible:ring-${color}-800

    dark:focus-visible:ring-offset-${color}-100
`;

const getBold = (color: string) =>
  `
    bg-${color}-800
    text-${color}-100
    focus-visible:bg-${color}-900/80
    enabled:hover:bg-${color}-900/80
    enabled:hover:text-${color}-50
    focus-visible:text-${color}-50
    enabled:active:bg-${color}-900

    contrast-more:border
    contrast-more:border-${color}-50
    contrast-more:enabled:hover:bg-${color}-600
    contrast-more:focus-visible:bg-${color}-600
    contrast-more:enabled:hover:text-${color}-50

    dark:bg-${color}-300
    dark:text-${color}-900/80
    dark:enabled:hover:bg-${color}-200
    dark:focus-visible:bg-${color}-200
    dark:enabled:hover:text-${color}-900
    dark:focus-visible:text-${color}-900
    dark:enabled:active:bg-${color}-300/90

    dark:contrast-more:font-bold
    dark:contrast-more:bg-${color}-100
    dark:contrast-more:text-${color}-900
    dark:contrast-more:enabled:hover:bg-${color}-800
    dark:contrast-more:focus-visible:bg-${color}-800
    dark:contrast-more:border-${color}-500

    focus-visible:ring-${color}-500

    dark:focus-visible:ring-offset-${color}-50
`;

const getOutline = (color: string) =>
  `
    border
    border-${color}-500
    text-${color}-700
    enabled:hover:text-${color}-50
    enabled:hover:bg-${color}-500
    enabled:active:text-white
    enabled:active:bg-${color}-600
    enabled:active:border-${color}-600
    focus-visible:bg-${color}-500
    focus-visible:text-${color}-50
    
    contrast-more:border
    contrast-more:text-${color}-900
    contrast-more:border-${color}-800
    contrast-more:enabled:hover:border-${color}-50
    contrast-more:focus-visible:border-${color}-50
    contrast-more:enabled:hover:text-${color}-900
    
    dark:border
    dark:border-${color}-600
    dark:text-${color}-300
    dark:enabled:hover:text-${color}-50
    dark:enabled:hover:bg-${color}-600
    dark:enabled:active:text-white
    dark:enabled:active:bg-${color}-700
    dark:enabled:active:border-${color}-700
    dark:focus-visible:bg-${color}-600
    dark:focus-visible:text-${color}-50
    
    dark:contrast-more:font-bold
    dark:contrast-more:text-${color}-50
    dark:contrast-more:enabled:hover:border-${color}-800
    dark:contrast-more:focus-visible:border-${color}-800
    dark:contrast-more:enabled:hover:text-${color}-50
    dark:contrast-more:focus-visible:text-${color}-50
    dark:contrast-more:border-${color}-100
    
    focus-visible:ring-${color}-500
    
    dark:focus-visible:ring-offset-${color}-600
    `;

const getNone = (color: string) =>
  `
    text-${color}-500
    enabled:hover:text-${color}-600
    focus-visible:text-${color}-600

    dark:text-${color}-300
    dark:enabled:hover:text-${color}-400
    dark:focus-visible:text-${color}-400

    focus-visible:ring-${color}-500
    dark:focus-visible:ring-offset-${color}-600
`;

const getLinear = (color: string) => `
    text-${color}-900
    bg-gradient-to-b
    from-${color}-300
    to-${color}-500
    enabled:hover:from-${color}-400
    enabled:hover:to-${color}-500
    focus-visible:from-${color}-400
    focus-visible:to-${color}-500

    dark:text-${color}-50
    dark:bg-gradient-to-b
    dark:from-${color}-500
    dark:to-${color}-700
    dark:enabled:hover:from-${color}-600
    dark:enabled:hover:to-${color}-800
    dark:focus-visible:from-${color}-600
    dark:focus-visible:to-${color}-800
`;
const getClay = (color: string) => {
  const { rgb } = colorsWithHex.find(c => c.name === color);
  // split the rgb into 3 parts
  const [r, g, b] = rgb.split(',').map(n => parseInt(n, 10));
  const makeDarker = (n: number) => Math.round(n * 0.8);
  const [rDark, gDark, bDark] = [r, g, b].map(makeDarker);
  return `
    bg-${color}-400
    font-bold
    uppercase
    tracking-wider
    text-white
    shadow-[0px_6px_16px_rgba(${rDark},${gDark},${bDark},_0.35),_inset_-8px_-8px_12px_rgba(${rgb},1),_inset_8px_8px_12px_rgba(255,255,255,_0.25)]
    enabled:hover:scale-105
    enabled:hover:shadow-[0px_8px_18px_rgba(${rDark},${gDark},${bDark},_0.5),_inset_-8px_-8px_12px_rgba(${rgb},1),_inset_8px_8px_12px_rgba(255,255,255,_0.35)]
    active:scale-[0.98]
    active:shadow-[0px_4px_14px_rgba(${rDark},${gDark},${bDark},_0.35),_inset_-8px_-8px_12px_rgba(${rgb},1),_inset_8px_8px_12px_rgba(255,255,255,_0.35)
`;
};

// a function replaces enter with a space
const replaceEnter = (str: string) =>
  str.replace(/\n/g, ' ').replace(/\s+/g, ' ');

const generate = (color: string) => {
  const active = replaceEnter(getActive(color));
  const light = replaceEnter(getLight(color));
  const normal = replaceEnter(getNormal(color));
  const bold = replaceEnter(getBold(color));
  const none = replaceEnter(getNone(color));
  const outline = replaceEnter(getOutline(color));
  const linear = replaceEnter(getLinear(color));
  const clay = replaceEnter(getClay(color));

  return {
    [color]: {
      base,
      active,
      weight: {
        light,
        normal,
        bold,
        outline,
        none,
      },
      gradient: {
        linear,
        clay,
      },
    },
  };
};

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'gray',
  'slate',
  'zinc',
  'neutral',
  'stone',
];

export const generateAllColors = () => {
  const result = colors.map(color => generate(color));
  // return as object
  return result.reduce((acc, curr) => {
    return { ...acc, ...curr };
  }, {});
};
