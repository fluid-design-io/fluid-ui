import type { FluidTheme } from '../../type';
import buttonStyles from './buttonStyles';

const defaultTheme: FluidTheme = {
  accordion: {
    base: 'w-full divide-y divide-transparent px-2 py-1 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 shadow-gray-900/10 dark:shadow-gray-900/30 contrast:bg-white dark:contrast:bg-gray-900 contrast:contrast-ring',
    content: {
      base: 'overflow-hidden mx-4',
    },
    divider:
      'divide-gray-200 dark:divide-gray-700 contrast:divide-transparent dark:contrast:divide-transparent',
    header: {
      arrow: {
        base: 'w-4 h-4 transform motion-safe:transition contrast:text-black dark:contrast:text-white contrast:ring contrast:ring-2 contrast:ring-black dark:contrast:ring-white contrast:rounded',
        open: {
          off: 'rotate-0',
          on: 'ltr:-rotate-180 rtl:rotate-180 -rotate-180 contrast:ring-black dark:contrast:ring-black contrast:text-black dark:contrast:text-black',
        },
      },
      base: 'flex px-4 py-2 my-1 w-full justify-between items-center rounded-md hocus:bg-gray-200/30 dark:hocus:bg-gray-600/30 hocus:contrast:bg-amber-300 dark:hocus:contrast:bg-amber-400 text-gray-700 dark:text-gray-200 contrast:text-gray-800 dark:contrast:text-gray-50 dark:contrast:hocus:text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 contrast:focus-visible:ring-gray-800 dark:contrast:focus-visible:ring-gray-200 focus-visible:ring-inset transition-colors [-webkit-tap-highlight-color:transparent] contrast:ring-1 contrast:ring-black dark:contrast:ring-white',
      heading: '',
      open: {
        off: '',
        on: 'bg-gray-200/50 hocus:bg-gray-200/50 dark:bg-gray-600/50 dark:hocus:bg-gray-600/50 dark:hocus:contrast:text-black contrast:bg-amber-300 dark:contrast:bg-amber-400 text-gray-700 dark:text-gray-200 contrast:text-black dark:contrast:text-black contrast:ring-amber-500 dark:contrast:ring-amber-700',
      },
    },
  },
  button: {
    base: 'flex justify-center items-center h-max min-w-fit text-center gap-2 relative [-webkit-tap-highlight-color:transparent]',
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
        xs: 'px-2.5 py-1 text-xs',
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-3.5 py-2',
        lg: 'px-4 py-2.5 text-lg',
        xl: 'px-5 py-3 text-xl',
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
        spin: 'origin-center motion-safe:animate-spin motion-reduce:animate-pulse',
        'spin-large': '',
        pulse: 'animate-pulse',
        ping: 'origin-center motion-safe:animate-ping motion-reduce:animate-pulse',
      },
      text: '',
    },
  },
  form: {
    base: 'block w-full rounded-lg bg-gray-100/30 outline-none transition [-webkit-tap-highlight-color:transparent] dark:bg-gray-800 dark:text-gray-200 contrast:placeholder:text-gray-700 dark:contrast:bg-black dark:contrast:text-gray-50 dark:contrast:placeholder:text-gray-50/75 contrast:contrast-ring',
    select: {
      button:
        'relative w-full cursor-default py-2 pl-4 pr-10 rtl:pr-4 rtl:pl-10 text-start sm:text-sm default-focus-visible',
    },
    popover:
      'rounded-md bg-white shadow-2xl z-10 ring-1 ring-black ring-opacity-5 max-h-60 min-w-full focus:outline-none dark:bg-gray-800 dark:ring-white dark:ring-opacity-5',
  },
  tab: {
    base: 'flex space-x-1 p-1',
    shape: {
      pill: {
        xs: 'text-xs rounded-full',
        sm: 'text-sm rounded-full',
        md: 'rounded-full',
        lg: 'rounded-full text-lg',
        xl: 'rounded-full text-xl',
      },
      round: {
        xs: 'text-xs rounded-lg',
        sm: 'text-sm rounded-lg',
        md: 'rounded-lg',
        lg: 'rounded-lg text-lg',
        xl: 'rounded-lg text-xl',
      },
      square: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: '',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    tabWrap: {
      base: 'group relative btn-clear-gray-700 dark:btn-clear-gray-200 !bg-transparent !border-none outline-none',
      active: {
        normal: '!text-gray-800 dark:!text-gray-50',
        clear: '!text-primary-600 dark:!text-primary-300',
        light: '!text-gray-700 dark:!text-gray-100',
      },
      inactive: {
        normal: 'hocus:!bg-inherit',
        clear: 'hocus:!bg-inherit',
        light: 'hocus:!bg-inherit',
      },
    },
    activeButton: {
      base: 'absolute inset-0 z-0 pointer-events-none group-focus-visible:ring-inset group-focus-visible:ring-white dark:group-focus-visible:ring-black group-focus-visible:ring-opacity-60 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-primary-400 group-focus-visible:outline-none group-focus-visible:ring-2',
      shape: { pill: '9999px', round: '6px', square: '0px' },
      weight: {
        normal: 'bg-white shadow dark:bg-gray-700',
        clear: 'bg-primary-100/70 dark:bg-primary-700/30',
        light: 'bg-white shadow dark:bg-gray-600',
      },
    },
    weight: {
      normal: 'bg-gray-200/10 dark:bg-black/30',
      clear: 'bg-transparent',
      light: 'hover:bg-gray-200/10 dark:hover:bg-gray-800/10',
    },
    panel:
      'w-full focus-visible:ring-white focus-visible:ring-opacity-60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-400 focus:outline-none focus:ring-2',
  },
  dialog: {
    base: 'bg-white ring-1 ring-black/5 transition dark:bg-gray-900 dark:ring-white/10 overflow-hidden rounded-md p-4',
  },
  toast: {
    base: 'bg-white dark:bg-gray-900 dark:ring-white/10 ring-1 ring-black/5 transition rounded-md p-4',
    position: {
      'bottom-left': '',
      'bottom-right': '',
      'bottom-center': '',
      'top-left': '',
      'top-center': '',
      'top-right': '',
      'center-left': '',
      center: '',
      'center-right': '',
    },
  },
};

export default defaultTheme;
