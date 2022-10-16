import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Tab } from '../src/lib/components';
import clsxm from '../src/lib/helpers/clsxm';
import { MenuProps } from '../src/type';

export default {
  title: 'Components/Tab',
  component: Tab,
  args: {
    label: 'Profile',
    horizontal: false,
    header: 'User',
  },
} as Meta;

type StoryButtonProps = MenuProps;

const Wrap = ({ className = '', children }) => {
  return (
    <div
      className={clsxm(
        'flex h-full flex-wrap items-center justify-center gap-6 px-4 lg:px-6',
        className
      )}
    >
      {children}
    </div>
  );
};

const Template: Story<StoryButtonProps> = (args) => {
  return (
    <Wrap>
      <Tab />
    </Wrap>
  );
};
const Template2: Story<StoryButtonProps> = (args) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  return (
    <Wrap>
      <Tab
        selectedIndex={activeTabIndex}
        onChange={setActiveTabIndex as any}
        shape='square'
        size='xl'
        tabClassName='hi-there-how-are-you-doing????? !bg-sky-300'
      >
        <Tab.List>
          <Tab.ListItem tabClassName='hi-there-how-are-you-doing????? !bg-blue-300'>
            Tab 1
          </Tab.ListItem>
          <Tab.ListItem>Tab 2</Tab.ListItem>
          <Tab.ListItem>Tab 3</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel tabPanelClassName='bg-red-500'>
            <div className='p-4'>Tab 1</div>
          </Tab.Panel>
          <Tab.Panel tabPanelClassName='bg-green-500'>
            <div className='p-4'>Tab 2</div>
          </Tab.Panel>
          <Tab.Panel tabPanelClassName='bg-blue-500'>
            <div className='p-4'>Tab 3</div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </Wrap>
  );
};
export const Default = Template.bind({});
export const AsComponent = Template2.bind({});
AsComponent.storyName = 'As Component';
