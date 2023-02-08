const plugin = require('tailwindcss/plugin');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

module.exports = plugin(function ({
  matchUtilities,
  addVariant,
  theme,
}) {
  // bg-grid utility properties are pulled and modified from tailwindcss site
  /* eslint-disable no-unused-expressions */
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
    matchUtilities(
      {
        'scrollbar': (value) => ({
          '-ms-overflow-style': value,
          'scrollbar-width': value,
          '&::-webkit-scrollbar': {
            display: value,
          },
        }),
      },
      {
        values: {
          'none': 'none',
        },
      }

    )
  addVariant('hocus', ['&:hover', '&:focus-visible']),
    addVariant('contrast', ['.contrast &', '@media (prefers-contrast: more)'])
});
