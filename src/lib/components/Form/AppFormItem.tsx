import React from 'react';
import { FormItemDescription, FormProp } from '.';
import clsxm from '../../helpers/clsxm';

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
          `relative mb-4 overflow-hidden rounded-lg transition-all`,
          error &&
            focused &&
            `contrast-more:ring-stone-800 dark:contrast-more:ring-amber-800 ring-1 ring-blue-400`,
          error &&
            !focused &&
            'contrast-more:ring-red-500 dark:contrast-more:ring-red-300 ring-1 ring-red-400 dark:ring-red-500',
          !error &&
            'contrast-more:ring-stone-800 dark:contrast-more:ring-stone-200 ring ring-transparent',
          !error &&
            focused &&
            'contrast-more:ring-blue-400 dark:contrast-more:ring-blue-200 ring-1 ring-blue-400',
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
