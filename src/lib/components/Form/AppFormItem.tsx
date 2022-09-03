import React from 'react';

import clsxm from '../../helpers/clsxm';

import { FormItemDescription, FormProp } from '.';

function FormItem({
  error,
  focused,
  children,
  description,
  ...props
}: {
  error?: string;
  focused?: boolean;
  description?: FormProp['description'];
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <>
      <div
        className={clsxm(
          `relative mb-4 last:mb-0 overflow-visible rounded-lg transition-all [&_+_.item-description]:-mt-4`,
          error &&
            focused &&
            `contrast:ring-primary-800 dark:contrast:ring-amber-800 ring-1 contrast:ring ring-blue-400`,
          error &&
            !focused &&
            'contrast:ring-red-500 dark:contrast:ring-red-300 ring-1 contrast:ring ring-red-400 dark:ring-red-500',
          !error &&
            'contrast:ring-primary-800 dark:contrast:ring-primary-200 ring ring-transparent',
          !error &&
            focused &&
            'contrast:ring-blue-400 dark:contrast:ring-blue-200 ring-1 contrast:ring ring-blue-400',
          props.className && props.className
        )}
      >
        {children}
      </div>
      {description && <FormItemDescription {...{ description }} />}
    </>
  );
}

export default FormItem;
