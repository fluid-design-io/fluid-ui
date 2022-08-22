export const getInputColor = ({ error, className = undefined }) =>
  `pt-5 pb-1.5 px-4 ${
    error
      ? `contrast:focus-within:bg-red-500 dark:contrast:focus-within:bg-red-600 contrast:focus-within:placeholder:text-primary-50`
      : `contrast:focus-within:bg-amber-400 dark:contrast:focus-within:bg-yellow-800 contrast:focus-within:placeholder:text-primary-900 dark:contrast:focus-within:text-primary-50`
  } ${className}`;
