const { focusHoverRingColor } = require('./generateColors');

const generateRing = ({
  offsetWidth = '2px',
  offsetColor = '#222',
  ringColor = 'transparent',
  ringWidth = '2px',
}) => {
  return {
    '--tw-ring-offset-width': offsetWidth,
    '--tw-ring-offset-color': offsetColor,
    '--tw-ring-color': ringColor,
    '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
    '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(${ringWidth} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
    'box-shadow': [
      `var(--tw-ring-offset-shadow)`,
      `var(--tw-ring-shadow)`,
      `var(--tw-shadow, 0 0 #0000)`,
    ].join(', '),
  };
};

const contrastRing = ({ color, theme, ...props }) => {
  return {
    ...generateRing(props),
    'font-weight': theme('fontWeight.semibold'),
  };
};

const focusRing = ({
  color,
  theme,
  offsetWidth = '2px',
  ringWidth = '2px',
  offsetColor = theme('ringOffsetColor.DEFAULT', '#fff'),
}) => {
  return {
    outline: 'none', // Remove the outline
    ...generateRing({
      offsetColor: offsetColor,
      ringColor: focusHoverRingColor({ color }),
      offsetWidth,
      ringWidth,
    }),
  };
};

module.exports = { contrastRing, focusRing };
