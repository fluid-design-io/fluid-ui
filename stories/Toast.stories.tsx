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
    dismissIcon: null,
    onDismiss: null,
    dismissClassName: '',
    icon: null,
  } as PresentProps,
  argTypes: {
    role: {
      control: {
        type: 'select',
        options: ['success', 'error', 'info', 'warning', 'default', 'blank'],
      },
    },
  },
};

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
      <Button label='Present Toast' onClick={() => presentToast(args as any)} />
    </Wrap>
  );
};

const Template = (args) => {
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
  component: ({ dismiss }) => (
    <div className='flex flex-col items-center justify-center gap-4 dark:text-white p-2'>
      <h3 className='text-2xl font-bold'>Custom Body</h3>
      <p className='text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
      </p>
      <div className='flex justify-between w-full'>
        <div className='flex-grow' />
        <Button
          label='Dismiss'
          onClick={dismiss}
          color='fuchsia'
          weight='clear'
          size='sm'
        />
      </div>
    </div>
  ),
};

CustomBody.storyName = 'Custom Body';
