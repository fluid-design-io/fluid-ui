import React from 'react';
import clsxm from '../../helpers/clsxm';

function AppLabel({ focused, error, errors, name, label, value }) {
  const noErrorStyle = 'text-gray-500 dark:text-gray-400 contrast:text-gray-900';
  const notFocusedStyle = value || focused ? 'top-1' : '!text-base top-3.5 bottom-0 font-normal';
  return (
    <label
      className={clsxm(
        focused && error
          ? 'contrast:text-gray-50 top-1 text-red-400 dark:text-red-500'
          : [noErrorStyle, `dark:contrast:text-gray-900`],
        !focused && error
          ? `contrast:text-red-500 dark:contrast:text-red-300 top-1 text-red-400 dark:text-red-500`
          : [notFocusedStyle, noErrorStyle, `dark:contrast:text-gray-50`],
        `pointer-events-none absolute left-4 -mb-1 text-xs font-semibold transition-all`
      )}
      htmlFor={name}
    >
      {error ? errors[name] : label}
    </label>
  );
}

export default AppLabel;
