import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import {
  HiArchive,
  HiChevronDown,
  HiCog,
  HiDownload,
  HiLogout,
  HiTrash,
  HiUser,
} from 'react-icons/hi';
import { Menu } from '../src/lib/components';
import clsxm from '../src/lib/helpers/clsxm';
import { MenuProps } from '../src/type';

export default {
  title: 'Components/Menu',
  component: Menu,
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
    <Wrap className='mt-24'>
      <Menu
        buttonClassName='min-w-32'
        color='indigo'
        header={args.header}
        horizontal={args.horizontal}
        iconClassName='w-4 h-4'
        iconEnd={HiChevronDown}
        iconEndPosition={args.iconEndPosition}
        iconStart={HiUser}
        iconStartPosition={args.iconStartPosition}
        label={args.label}
        menuPositionX={args.menuPositionX}
        menuPositionY={args.menuPositionY}
        weight='clear'
        menus={[
          {
            label: 'Settings',
            icon: HiCog,
          },
          {
            label: 'Archive',
            icon: HiArchive,
            disabled: true,
          },
          {
            label: 'Save',
            icon: HiDownload,
            role: 'success',
            isLoading: true,
            loadingOptions: {
              animation: 'spin-large',
              text: 'Saving...',
            },
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
