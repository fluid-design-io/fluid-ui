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
  tabClassName,
  tabActiveClassName,
  tabInactiveClassName,
  ...props
}: TabListProps): React.ReactElement => {
  const theme = useTheme().theme.tab;
  const layoutId = useId();
  const listClassName = clsxm(
    theme.base,
    theme.shape[shape][size],
    theme.weight[weight],
    className
  );
  // if children is provided, inject layoutId to each TabListItem
  if (children) {
    return (
      <HeadlessTab.List className={listClassName}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TabListItem) {
            const { props: childProps } = child;

            return React.cloneElement(child, {
              layoutId,
              shape: childProps.shape || shape,
              weight: childProps.weight || weight,
              size: childProps.size || size,
              tabClassName: childProps?.tabClassName || tabClassName,
              tabActiveClassName:
                childProps?.tabActiveClassName || tabActiveClassName,
              tabInactiveClassName:
                childProps?.tabInactiveClassName || tabInactiveClassName,
            } as any);
          } else if (React.isValidElement(child)) {
            return child;
          } else {
            return null;
          }
        })}
      </HeadlessTab.List>
    );
  }
  return (
    <HeadlessTab.List className={listClassName}>
      {tabs.map(({ title }, index) => (
        <TabListItem
          {...{
            layoutId,
            title,
            shape,
            weight,
            size,
            tabClassName,
            tabActiveClassName,
            tabInactiveClassName,
            ...props,
          }}
          key={`tab-${layoutId}-${index}`}
        />
      ))}
    </HeadlessTab.List>
  );
};
