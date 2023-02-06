import React from 'react';

import clsxm from '../../helpers/clsxm';

import { FormItemDescription } from '.';
import { FormProp } from '../../../type';

function FormItem({
  error,
  descriptionError,
  focused,
  children,
  description,
  ...props
}: {
  /**
   * Error displayed in the border
   */
  error?: string;
  /**
   * Error displayed in the description
   */
  descriptionError?: string;
  focused?: boolean;
  description?: FormProp['description'];
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <>
      <div
        className={clsxm(
          `relative mb-4 last:mb-0 overflow-visible rounded-lg transition-all [&_+_.item-description]:-mt-3`,
          error &&
            focused &&
            `contrast:ring-gray-800 dark:contrast:ring-amber-800 ring-2 contrast:ring-2 ring-primary-400`,
          error &&
            !focused &&
            'contrast:ring-red-500 dark:contrast:ring-red-300 ring-2 contrast:ring ring-red-400 dark:ring-red-500',
          !error && '',
          !error &&
            focused &&
            'contrast:ring-primary-400 dark:contrast:ring-primary-200 ring-2 contrast:ring-2 contrast:ring-offset-1 ring-primary-400',
          'focus-within:ring-2 focus-within:ring-primary-400',
          props.className && props.className
        )}
      >
        {children}
      </div>
      {descriptionError && <FormItemDescription {...{ descriptionError }} />}
      {description && <FormItemDescription {...{ description }} />}
    </>
  );
}

export default FormItem;
