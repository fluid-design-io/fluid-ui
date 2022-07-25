import buttonStyles from "./buttonStyles";

export default {
  accordion: {
    base: "w-full px-2 py-1 overflow-hidden rounded-lg bg-stone-50 dark:bg-stone-900 shadow-stone-900/10 dark:shadow-stone-900/30 component prefers-contrast:bg-white dark:prefers-contrast:bg-stone-900 prefers-contrast:contrast-ring",
    content: {
      base: "overflow-hidden !mt-0 mx-4",
    },
    divider: false,
    header: {
      arrow: {
        base: "w-4 h-4 transform transition",
        open: {
          off: "",
          on: "rotate-180",
        },
      },
      base: "flex px-4 py-2 my-1 w-full justify-between items-center rounded-md hover:bg-stone-200/30 focus-visible:bg-stone-200/30 dark:hover:bg-stone-600/30 dark:focus-visible:bg-stone-600/30 hover:prefers-contrast:bg-amber-300 dark:hover:prefers-contrast:bg-amber-400 text-stone-700 dark:text-stone-200 prefers-contrast:text-stone-1800 dark:prefers-contrast:text-stone-50 dark:prefers-contrast:focus-visible:text-stone-1800 dark:prefers-contrast:hover:text-stone-1800 focus-within:outline-none focus-within:ring-1 focus-within:ring-stone-400 dark:focus-within:ring-stone-500 prefers-contrast:focus-within:ring-stone-1800 dark:prefers-contrast:focus-within:ring-stone-200 focus-within:ring-inset transition-colors [-webkit-tap-highlight-color:transparent]",
      heading: "",
      open: {
        off: "",
        on: "bg-stone-200/50 hover:bg-stone-200/50 dark:bg-stone-600/50 dark:hover:bg-stone-600/50 prefers-contrast:bg-amber-300 dark:prefers-contrast:bg-amber-400 text-stone-700 dark:text-stone-200 prefers-contrast:text-stone-900 dark:prefers-contrast:text-stone-900",
      },
    },
  },
  button: {
    base: "hover:opacity-80 transition-colors flex justify-center items-center",
    size: {
      xs: "w-full px-3 py-1.5 text-sm rounded-md",
      sm: "w-full px-3.5 py-2 text-sm rounded-md",
      md: "w-full px-4 py-2 rounded-md",
      lg: "w-full px-5 py-2.5 rounded-md",
      xl: "w-full px-6 py-3 rounded-md",
    },
    color: {
      gray: buttonStyles.gray,
      yellow: buttonStyles.yellow,
      orange: buttonStyles.orange,
      red: buttonStyles.red,
      lime: buttonStyles.lime,
      green: buttonStyles.green,
      teal: buttonStyles.teal,
      sky: buttonStyles.sky,
      indigo: buttonStyles.indigo,
      fuchsia: buttonStyles.fuchsia,
      rose: buttonStyles.rose,
    },
  },
};
