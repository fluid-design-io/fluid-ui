const plugin = require('tailwindcss/plugin');

const defaultValues = (theme) => ({
    '--tooltip-width': 'fit-content',
    '--tooltip-min-height': 'fit-content',
    '--tooltip-arrow-width': '12px',
    '--tooltip-arrow-height': '12px',
    '--tooltip-background-color': theme("colors.stone.700"),
    '--tooltip-color': theme("colors.stone.50"),
    '--tooltip-border-radius': theme("spacing.1"),
    '--tooltip-padding': `${theme("spacing.1")} ${theme("spacing.2")}`,
    '--tooltip-font-size': theme("fontSize.sm"),
    '--tooltip-arrow-border-color': theme("colors.stone.700"),
    '--tooltip-arrow-border-radius': '3px',
    '--tooltip-pointer-events': 'none',
})

const tooltipStyle = {
    width: 'var(--tooltip-width)',
    minHeight: 'var(--tooltip-min-height)',
    display: 'none',
    position: 'absolute',
    textAlign: 'center',
    borderRadius: 'var(--tooltip-border-radius)',
    backgroundColor: 'var(--tooltip-background-color)',
    color: 'var(--tooltip-color)',
    padding: 'var(--tooltip-padding)',
    fontSize: 'var(--tooltip-font-size)',
    zIndex: 50,
    pointerEvents: 'var(--tooltip-pointer-events)',
}
const tooltipArrowStyle = {
    content: '""',
    display: 'none',
    position: 'absolute',
    width: 'var(--tooltip-arrow-width)',
    height: 'var(--tooltip-arrow-height)',
    zIndex: 49,
    borderStyle: 'solid',
    borderColor: 'var(--tooltip-arrow-border-color)',
    borderRadius: 'var(--tooltip-arrow-border-radius)',
    pointerEvents: 'var(--tooltip-pointer-events)',
}

const createDataTooltipSelectors = () => {
    let selectors = [];
    let states = ['hover', 'focus-within'];
    let positions = ['', '-top', '-left', '-right', '-bottom'];

    for (let state of states) {
        for (let position of positions) {
            selectors.push(`[data-tooltip${position}]:${state}::before`);
            selectors.push(`[data-tooltip${position}]:${state}::after`);
        }
    }

    return selectors;
}


module.exports = plugin(function ({ addBase, theme }) {
    addBase({
        ':root': {
            ...defaultValues(theme),
        },
        [
            [...createDataTooltipSelectors()]
        ]: {
            display: 'inline-block',
        },
        [[
            '[data-tooltip]',
            '[data-tooltip-top]',
            '[data-tooltip-left]',
            '[data-tooltip-right]',
            '[data-tooltip-bottom]',
        ]]: {
            position: 'relative',
        },
        '[data-tooltip]::before': {
            ...tooltipStyle,
            content: 'attr(data-tooltip)',
            left: -20,
            right: -20,
            bottom: 'calc(100% + 6px)',
            margin: '0 auto',
        },
        '[data-tooltip-top]::before': {
            ...tooltipStyle,
            content: 'attr(data-tooltip-top)',
            left: -20,
            right: -20,
            bottom: 'calc(100% + 6px)',
            margin: '0 auto',
        },
        [['[data-tooltip]::after', '[data-tooltip-top]::after']]: {
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
            margin: 'auto 0',
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
            margin: 'auto 0',
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
            margin: '0 auto',
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