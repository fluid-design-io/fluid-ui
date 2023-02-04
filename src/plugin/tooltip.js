const plugin = require('tailwindcss/plugin');

const tooltipStyle = {
    width: 'fit-content',
    minHeight: 'fit-content',
    display: 'none',
    position: 'absolute',
    borderRadius: '0.25rem',
    backgroundColor: colors.stone[700],
    color: colors.stone[50],
    padding: '0.25rem',
    fontSize: '0.8rem',
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

module.exports = plugin(function ({ addBase }) {
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
    })
});