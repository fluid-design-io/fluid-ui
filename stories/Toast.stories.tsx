import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { FluidProvider, Button } from '../src/lib/components';
import { PresentProps, useToast } from '../src/lib/components/Toast/useToast';
import clsxm from '../src/lib/helpers/clsxm';

export default {
  title: 'Components/Toast',
  component: null,
  args: {
    title: 'Title',
    message: 'Message',
    role: 'success',
    autoDismiss: true,
    duration: 3000,
    component: null,
  },
  argTypes: {
    role: {
      control: {
        type: 'select',
        options: ['success', 'error', 'info', 'warning', 'default'],
      },
    },
  },
} as Meta;

type StoryProps = PresentProps;

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

const Component = ({
  className = '',
  ...args
}: StoryProps & { className?: string }) => {
  const [presentToast] = useToast();
  return (
    <Wrap>
      <Button label='Present Toast' onClick={() => presentToast(args)} />
    </Wrap>
  );
};

const Template: Story<StoryProps> = (args) => {
  return (
    <FluidProvider>
      <Component {...args} />
    </FluidProvider>
  );
};

const CustomBodyTemplate: Story<StoryProps> = (args) => {
  return (
    <FluidProvider>
      <Component {...args} />
    </FluidProvider>
  );
};

export const Default = Template.bind({});
export const CustomBody = CustomBodyTemplate.bind({});

CustomBody.args = {
  message: null,
  component: (
    <div className='flex flex-col items-center justify-center gap-4 dark:text-white'>
      <h1 className='text-2xl font-bold'>Custom Body</h1>
      <p className='text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
      </p>
    </div>
  ),
};

CustomBody.storyName = 'Custom Body';
