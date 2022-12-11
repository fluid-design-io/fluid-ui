/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { FormProp } from '../../../type';
import clsxm from '../../helpers/clsxm';

function AppFormItemDescription({
  description,
  descriptionError,
  className,
}: {
  description?: FormProp['description'];
  descriptionError?: string;
  className?: string;
}) {
  if (!description && !descriptionError) {
    return null;
  }
  return (
    <div
      className={clsxm('flex flex-col items-start item-description', className)}
    >
      {React.isValidElement(description) && description}
      {descriptionError && (
        <p className='text-sm text-red-400 dark:text-red-500'>
          {descriptionError}
        </p>
      )}
      {typeof description === 'string' && (
        <p className='text-sm'>{description}</p>
      )}
      {typeof description === 'object' && (
        <p className='flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500'>
          {/* @ts-ignore-next-line */}
          <description.icon className='h-4 w-4' />
          {/* @ts-ignore-next-line */}
          {description.text}
        </p>
      )}
    </div>
  );
}

export default AppFormItemDescription;
