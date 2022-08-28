import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Menu, MenuProps } from '../src/lib/components';
import clsxm from '../src/lib/helpers/clsxm';
import { HiArchive, HiChevronUp, HiCog, HiLogout, HiTrash, HiUser } from 'react-icons/hi';

export default {
  title: 'Components/Menu',
  component: Menu,
  args: {
    label: 'Menu',
    horizontal: true,
    header: 'Header',
  },
} as Meta;

interface StoryButtonProps extends MenuProps {}

const Wrap = ({ className = '', children }) => {
  return (
    <div className={clsxm('flex h-full flex-wrap items-center justify-center gap-6 px-4 lg:px-6', className)}>
      {children}
    </div>
  );
};

const Template: Story<StoryButtonProps> = (args) => {
  return (
    <Wrap className="mt-24">
      <Menu
        buttonClassName="border border-transparent hocus:border-primary-400/30 hocus:bg-primary-400/10 dark:hocus:border-primary-300/30 dark:hocus:bg-primary-500/10 hocus:contrast-bg hocus:contrast-text clickable group flex justify-start items-center rounded-md border border-transparent px-3 py-2 text-sm font-regular text-primary-700 transition-colors hocus:text-primary-800 contrast-more:text-primary-900 dark:text-primary-300/80 dark:hocus:text-primary-100 dark:contrast-more:text-primary-100 w-32"
        label={args.label}
        iconStartPosition={args.iconStartPosition}
        iconEndPosition={args.iconEndPosition}
        menuPositionX={args.menuPositionX}
        menuPositionY={args.menuPositionY}
        iconClassName="w-4 h-4"
        horizontal={args.horizontal}
        header={args.header}
        iconStart={HiUser}
        iconEnd={HiChevronUp}
        menus={[
          {
            label: 'Settings',
            icon: HiCog,
          },
          {
            label: 'Archive',
            icon: HiArchive,
          },
          {
            label: 'Delete',
            icon: HiTrash,
            role: 'destructive',
          },
          {
            role: 'separator',
          },
          {
            label: 'Logout',
            icon: HiLogout,
            role: 'info',
          },
        ]}
      />
    </Wrap>
  );
};
export const Default = Template.bind({});
