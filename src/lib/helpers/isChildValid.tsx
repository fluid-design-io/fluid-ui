import React from 'react';
export const isChildValid = (element) => {
  if (!element) {
    return false;
  }
  return React.isValidElement(element);
};
