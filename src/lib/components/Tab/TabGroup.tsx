import { Tab as HeadlessTab } from '@headlessui/react';
import React, { useId } from 'react';
import { PolymorphicRef, TabComponent, TabProps } from '../../../type';
import { useTheme } from '../FluidUI/ThemeContext';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';
import { TabPanels } from './TabPanels';

const testTabs = [
  {
    title: 'For You Content',
    content: <p>Here's the for you</p>,
  },
  {
    title: 'Recent',
    content: <p>Here's the content</p>,
  },
  {
    title: {
      text: 'Popular',
      iconStart: (
        <svg
          aria-hidden='true'
          className='h-5 w-5 text-gray-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        />
      ),
    },
    content: <p>Here's the content for Popular</p>,
  },
];
export const TabGroup: TabComponent = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as,
      tabs = testTabs,
      shape = 'round',
      weight = 'normal',
      size = 'md',
      className,
      innerAs = as,
      children,
      tabActiveClassName,
      tabClassName,
      tabInactiveClassName,
      tabPanelClassName,
    }: TabProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme().theme.tab;
    const id = useId();
    if (children) {
      return <HeadlessTab.Group>{children}</HeadlessTab.Group>;
    }
    return (
      <HeadlessTab.Group>
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
            tabActiveClassName,
            tabClassName,
            tabInactiveClassName,
          }}
        />
        <TabPanels className={tabPanelClassName}>
          {tabs.map(({ content }, idx) => (
            <TabPanel {...{ tabPanelClassName }} key={`tab-panel-${id}-${idx}`}>
              {content}
            </TabPanel>
          ))}
        </TabPanels>
      </HeadlessTab.Group>
    );
  }
);
