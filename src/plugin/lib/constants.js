const BUTTON_DEFAULT = {
  transition: 'all 0.15s ease-in-out',
};

const BUTTON_STATE = {
  HOVER: '&:not([type]):hover, &:not([href]):enabled:hover', // Hover state
  FOCUS: '&:not([type]):focus-visible, &:not([href]):enabled:focus-visible', // Focus state
  ACTIVE: '&:not([type]):active, &:not([href]):enabled:active', // Active state
  DISABLED: '&:not([type]):disabled, &:not([href]):disabled', // Disabled state
  DARK: '.dark &', // Dark mode
  CONTRAST_MORE: '.contrast &', // High contrast mode
  POINTER_HOVER: '@media (hover: hover) and (pointer: fine)',
  POINTER_TOUCH: '@media (hover: none) and (pointer: coarse)', // Pointer none state
};

module.exports = {
  BUTTON_DEFAULT,
  BUTTON_STATE,
};
