/* eslint-disable no-undef */
import { Tab as HeadlessTab } from '@headlessui/react';
import { LayoutGroup, MotionConfig } from 'framer-motion';
import React, { useId } from 'react';
import { PolymorphicRef, TabComponent, TabProps } from '../../../type';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';
import { TabPanels } from './TabPanels';

export const TabGroup: TabComponent = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as,
      tabs,
      shape = 'round',
      weight = 'normal',
      size = 'md',
      className,
      innerAs = as,
      children,
      tabClassName,
      tabActiveClassName,
      tabInactiveClassName,
      tabPanelClassName,
      ...props
    }: TabProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const id = useId();
    const tabClassNames = {
      tabClassName,
      tabActiveClassName,
      tabInactiveClassName,
    };
    // eslint-disable-next-line no-console
    if (children) {
      return (
        <HeadlessTab.Group {...(props as any)}>
          <MotionConfig reducedMotion='user'>
            <LayoutGroup>
              {React.Children.map(children, (child) => {
                // if child is typeof TabList, inject the props
                if (React.isValidElement(child) && child.type === TabList) {
                  return React.cloneElement(child, {
                    ...tabClassNames,
                    shape,
                    weight,
                    size,
                  } as any);
                }
                // if child is typeof TabPanels, inject the props
                else if (
                  React.isValidElement(child) &&
                  child.type === TabPanels
                ) {
                  return React.cloneElement(child, {
                    tabPanelClassName,
                  } as any);
                } else if (React.isValidElement(child)) {
                  return child;
                } else {
                  return null;
                }
              })}
            </LayoutGroup>
          </MotionConfig>
        </HeadlessTab.Group>
      );
    }
    return (
      <HeadlessTab.Group {...(props as any)}>
        <MotionConfig reducedMotion='user'>
          <LayoutGroup>
            <TabList
              {...{
                as,
                tabs,
                shape,
                weight,
                size,
                className,
                innerAs,
                children,
                ...tabClassNames,
              }}
            />
            <TabPanels className={tabPanelClassName}>
              {tabs &&
                tabs.length > 0 &&
                tabs.map(({ content }, idx) => (
                  <TabPanel
                    {...{ tabPanelClassName }}
                    key={`tab-panel-${id}-${idx}`}
                  >
                    {content}
                  </TabPanel>
                ))}
            </TabPanels>
          </LayoutGroup>
        </MotionConfig>
      </HeadlessTab.Group>
    );
  }
);
