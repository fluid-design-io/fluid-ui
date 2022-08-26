import buttonStyles from './buttonStyles';

export default {
  accordion: {
    base: 'w-full divide-y divide-transparent px-2 py-1 overflow-hidden rounded-lg bg-stone-50 dark:bg-stone-900 shadow-stone-900/10 dark:shadow-stone-900/30 contrast:bg-white dark:contrast:bg-stone-900 contrast:contrast-ring',
    content: {
      base: 'overflow-hidden mx-4',
    },
    divider: 'divide-stone-200 dark:divide-stone-700 contrast:divide-transparent dark:contrast:divide-transparent',
    header: {
      arrow: {
        base: 'w-4 h-4 transform motion-safe:transition contrast:text-black dark:contrast:text-white contrast:ring contrast:ring-2 contrast:ring-black dark:contrast:ring-white contrast:rounded',
        open: {
          off: 'rotate-0',
          on: 'ltr:-rotate-180 rtl:rotate-180 -rotate-180 contrast:ring-black dark:contrast:ring-black contrast:text-black dark:contrast:text-black',
        },
      },
      base: 'flex px-4 py-2 my-1 w-full justify-between items-center rounded-md hocus:bg-stone-200/30 dark:hocus:bg-stone-600/30 hocus:contrast:bg-amber-300 dark:hocus:contrast:bg-amber-400 text-stone-700 dark:text-stone-200 contrast:text-stone-800 dark:contrast:text-stone-50 dark:contrast:hocus:text-stone-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500 contrast:focus-visible:ring-stone-800 dark:contrast:focus-visible:ring-stone-200 focus-visible:ring-inset transition-colors [-webkit-tap-highlight-color:transparent] contrast:ring-1 contrast:ring-black dark:contrast:ring-white',
      heading: '',
      open: {
        off: '',
        on: 'bg-stone-200/50 hocus:bg-stone-200/50 dark:bg-stone-600/50 dark:hocus:bg-stone-600/50 dark:hocus:contrast:text-black contrast:bg-amber-300 dark:contrast:bg-amber-400 text-stone-700 dark:text-stone-200 contrast:text-black dark:contrast:text-black contrast:ring-amber-500 dark:contrast:ring-amber-700',
      },
    },
  },
  button: {
    base: 'flex justify-center items-center h-min w-fit text-center transition-colors transition-opacity gap-2 relative [-webkit-tap-highlight-color:transparent]',
    shape: {
      pill: {
        xs: 'px-3.5 py-1.5 text-xs rounded-full',
        sm: 'px-4 py-2 text-sm rounded-full',
        md: 'px-4 py-2 rounded-full',
        lg: 'px-5 py-2.5 rounded-full text-lg',
        xl: 'px-6 py-2.5 rounded-full text-xl',
      },
      round: {
        xs: 'px-3 py-1.5 text-xs rounded-md',
        sm: 'px-3.5 py-2 text-sm rounded-md',
        md: 'px-4 py-2 rounded-md',
        lg: 'px-5 py-2.5 rounded-md text-lg',
        xl: 'px-6 py-3 rounded-md text-xl',
      },
      square: {
        xs: 'px-2.5 py-1 text-xs uppercase',
        sm: 'px-3 py-1.5 text-sm uppercase',
        md: 'px-3.5 py-2 uppercase',
        lg: 'px-4 py-2.5 text-lg uppercase',
        xl: 'px-5 py-3 text-xl uppercase',
      },
    },
    iconOnly: {
      pill: {
        xs: 'p-1.5 text-xs rounded-full',
        sm: 'p-2 text-sm rounded-full',
        md: 'p-2 rounded-full',
        lg: 'p-2.5 rounded-full text-lg',
        xl: 'p-2.5 rounded-full text-xl',
      },
      round: {
        xs: 'p-1.5 text-xs rounded-md',
        sm: 'p-2 text-sm rounded-md',
        md: 'p-2 rounded-md',
        lg: 'p-2.5 rounded-md text-lg',
        xl: 'p-3 rounded-md text-xl',
      },
      square: {
        xs: 'p-1 text-xs uppercase',
        sm: 'p-1.5 text-sm uppercase',
        md: 'p-2 uppercase',
        lg: 'p-2.5 text-lg uppercase',
        xl: 'p-3 text-xl uppercase',
      },
    },
    color: buttonStyles,
    loading: {
      base: 'absolute inset-0 z-[2] w-full h-full flex justify-center items-center gap-2',
      animation: {
        spin: 'motion-safe:animate-spin motion-reduce:animate-pulse',
        pulse: 'animate-pulse',
        ping: 'motion-safe:animate-ping motion-reduce:animate-pulse',
      },
      text: '',
    },
  },
  form: {
    base: 'block w-full rounded-lg border-none bg-stone-100 outline-none transition [-webkit-tap-highlight-color:transparent] dark:bg-stone-800 dark:text-stone-200 contrast:placeholder:text-stone-700  dark:contrast:bg-black dark:contrast:text-stone-50 dark:contrast:placeholder:text-stone-50/75',
  },
};
