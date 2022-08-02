/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { FormProp } from '.';

function AppFormItemDescription({
  description,
}: {
  description?: FormProp['description'];
}) {
  if (!description && !React.isValidElement(description)) {
    return null;
  }
  return (
    <div className="flex flex-col items-start">
      {React.isValidElement(description) && description}
      {typeof description === 'string' && (
        <p className="item-description text-sm">{description}</p>
      )}
      {typeof description === 'object' && (
        <p className="item-description flex items-center gap-2 text-sm">
          {/* @ts-ignore-next-line */}
          <description.icon className="h-4 w-4" />
          {/* @ts-ignore-next-line */}
          {description.text}
        </p>
      )}
    </div>
  );
}

export default AppFormItemDescription;
