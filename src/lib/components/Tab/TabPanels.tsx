import { Tab as HeadlessTab } from '@headlessui/react';
import React, { useId } from 'react';
import clsxm from '../../helpers/clsxm';

export const TabPanels = ({ className = '', children }) => {
  const id = useId();
  return (
    <HeadlessTab.Panels className={clsxm('mt-2 w-full', className)}>
      {React.Children.map(children, (child, index) => {
        // add a key to each child
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            key: `${id}-${index}`,
          });
        }
        return child;
      })}
    </HeadlessTab.Panels>
  );
};
