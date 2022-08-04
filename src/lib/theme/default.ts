import buttonStyles from "./buttonStyles";

export default {
  accordion: {
    base:
      "w-full divide-y divide-transparent px-2 py-1 overflow-hidden rounded-lg bg-stone-50 dark:bg-stone-900 shadow-stone-900/10 dark:shadow-stone-900/30 contrast-more:bg-white dark:contrast-more:bg-stone-900 contrast-more:contrast-ring",
    content: {
      base: "overflow-hidden mx-4",
    },
    divider: "divide-stone-200 dark:divide-stone-700",
    header: {
      arrow: {
        base: "w-4 h-4 transform transition",
        open: {
          off: "",
          on: "rotate-180",
        },
      },
      base:
        "flex px-4 py-2 my-1 w-full justify-between items-center rounded-md hover:bg-stone-200/30 focus-visible:bg-stone-200/30 dark:hover:bg-stone-600/30 dark:focus-visible:bg-stone-600/30 hover:contrast-more:bg-amber-300 dark:hover:contrast-more:bg-amber-400 text-stone-700 dark:text-stone-200 contrast-more:text-stone-1800 dark:contrast-more:text-stone-50 dark:contrast-more:focus-visible:text-stone-1800 dark:contrast-more:hover:text-stone-1800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 contrast-more:focus-visible:ring-stone-1800 dark:contrast-more:focus-visible:ring-stone-200 focus-visible:ring-inset transition-colors [-webkit-tap-highlight-color:transparent]",
      heading: "",
      open: {
        off: "",
        on:
          "bg-stone-200/50 hover:bg-stone-200/50 dark:bg-stone-600/50 dark:hover:bg-stone-600/50 contrast-more:bg-amber-300 dark:contrast-more:bg-amber-400 text-stone-700 dark:text-stone-200 contrast-more:text-stone-900 dark:contrast-more:text-stone-900",
      },
    },
  },
  button: {
    base: "flex justify-center items-center h-min w-fit text-center transition-all gap-2 relative",
    shape: {
      pill: {
        xs: "px-3.5 py-1.5 text-xs rounded-full",
        sm: "px-4 py-2 text-sm rounded-full",
        md: "px-4 py-2 rounded-full",
        lg: "px-5 py-2.5 rounded-full text-lg",
        xl: "px-6 py-2.5 rounded-full text-xl",
      },
      round: {
        xs: "px-3 py-1.5 text-xs rounded-md",
        sm: "px-3.5 py-2 text-sm rounded-md",
        md: "px-4 py-2 rounded-md",
        lg: "px-5 py-2.5 rounded-md text-lg",
        xl: "px-6 py-3 rounded-md text-xl",
      },
      square: {
        xs: "px-2.5 py-1 text-xs uppercase",
        sm: "px-3 py-1.5 text-sm uppercase",
        md: "px-3.5 py-2 uppercase",
        lg: "px-4 py-2.5 text-lg uppercase",
        xl: "px-5 py-3 text-xl uppercase",
      },
    },
    color: buttonStyles,
    loading: {
      base: "absolute inset-0 z-[2] w-full h-full flex justify-center items-center gap-2",
      animation: {
        spin: "animate-spin",
        pulse: "animate-pulse",
        ping: "animate-ping",
      },
      text: "",
    },
  },
  form: {
    base:
      "block w-full rounded-lg border-none bg-stone-100 outline-none transition [-webkit-tap-highlight-color:transparent] dark:bg-stone-800 dark:text-stone-200 contrast-more:placeholder:text-stone-700  dark:contrast-more:bg-black dark:contrast-more:text-stone-50 dark:contrast-more:placeholder:text-stone-50/75",
  },
};
