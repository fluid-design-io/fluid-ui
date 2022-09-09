import { Tab as HeadlessTab } from '@headlessui/react';
import React, { useId } from 'react';
import { TabListProps } from '../../../type';
import clsxm from '../../helpers/clsxm';
import { useTheme } from '../FluidUI/ThemeContext';
import { TabListItem } from './TabListItem';

export const TabList = ({
  tabs = [],
  shape = 'round',
  weight = 'normal',
  size = 'md',
  className = '',
  children,
  ...props
}: TabListProps) => {
  const theme = useTheme().theme.tab;
  const layoutId = useId();
  // if children is provided, inject layoutId to each TabListItem
  if (children) {
    return (
      <HeadlessTab.List
        className={clsxm(
          theme.base,
          theme.shape[shape][size],
          theme.weight[weight],
          className
        )}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TabListItem) {
            return React.cloneElement(child, {
              layoutId,
            } as any);
          }
          return child;
        })}
      </HeadlessTab.List>
    );
  }
  return (
    <HeadlessTab.List
      className={clsxm(
        theme.base,
        theme.shape[shape][size],
        theme.weight[weight],
        className
      )}
    >
      {tabs.map(({ title }, index) => (
        <TabListItem
          {...{
            layoutId,
            title,
            shape,
            weight,
            size,
            className,
            ...props,
          }}
          key={`tab-${layoutId}-${index}`}
        />
      ))}
    </HeadlessTab.List>
  );
};
