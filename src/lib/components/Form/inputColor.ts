export const getInputColor = ({ error, className = undefined }) =>
  `pt-5 pb-1.5 px-4 default-input ${
    error
      ? `prefers-contrast:focus-within:bg-red-500 dark:prefers-contrast:focus-within:bg-red-600 prefers-contrast:focus-within:placeholder:text-gray-50`
      : `prefers-contrast:focus-within:bg-amber-400 dark:prefers-contrast:focus-within:bg-amber-300 prefers-contrast:focus-within:placeholder:text-gray-900 dark:prefers-contrast:focus-within:text-gray-900`
  } ${className}`;
