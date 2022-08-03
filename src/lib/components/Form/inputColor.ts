export const getInputColor = ({ error, className = undefined }) =>
  `pt-5 pb-1.5 px-4 ${
    error
      ? `contrast-more:focus-within:bg-red-500 dark:contrast-more:focus-within:bg-red-600 contrast-more:focus-within:placeholder:text-gray-50`
      : `contrast-more:focus-within:bg-amber-400 dark:contrast-more:focus-within:bg-amber-300 contrast-more:focus-within:placeholder:text-gray-900 dark:contrast-more:focus-within:text-gray-900`
  } ${className}`;
