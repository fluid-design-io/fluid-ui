import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { IoIosSend } from 'react-icons/io';
import { Button } from '../src/lib/components/Button';
import {
  FluidButtonColors,
  FluidButtonSizes,
  FluidButtonWeights,
} from '../src/lib/components/FluidUI/FluidTheme';
import { ButtonProps } from '../src/type';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    weight: 'normal' as keyof FluidButtonWeights,
    size: 'md' as keyof FluidButtonSizes,
    disabled: false,
  },
} as Meta;

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'gray',
  'slate',
  'zinc',
  'neutral',
  'stone',
];

interface StoryButtonProps extends ButtonProps<'button'> {
  icon?: boolean;
  isLoading?: boolean;
}

const Template: Story<StoryButtonProps> = (args) => {
  return (
    <div className='flex gap-4 flex-wrap'>
      {colors.map((color) => (
        <Button
          key={color}
          color={color as keyof FluidButtonColors}
          className='capitalize'
          {...args}
        >
          {color}
        </Button>
      ))}
      <Button className='btn-primary-100' label='Primary' {...args as any}/>
      <Button className='btn-[wheat]' label='Wheat' {...args as any}/>
      <Button className='btn-light-[wheat]' label='Wheat Light' {...args as any}/>
      <Button className='btn-outline-[wheat]' label='Wheat Outline' {...args as any}/>
      <Button className='btn-clear-[wheat]' label='Wheat Clear' {...args as any}/>
      <Button className='btn-[#F0F0F0]' label='F0F0F0' {...args as any}/>
      <Button className='btn-light-[#F0F0F0]' label='F0F0F0 Light' {...args as any}/>
      <Button className='btn-outline-[#F0F0F0]' label='F0F0F0 Outline' {...args as any}/>
      <Button className='btn-clear-[#F0F0F0]' label='F0F0F0 Clear' {...args as any}/>
      <Button className='btn-clear-gray-700' label='Gray 700' {...args as any}/>
    </div>
  );
};
export const Default = Template.bind({});
export const Normal: Story<StoryButtonProps> = Template.bind({});
Normal.storyName = 'Weight normal';

export const Light: Story<StoryButtonProps> = Template.bind({});
Light.storyName = 'Weight Light';
Light.args = {
  weight: 'light' as keyof FluidButtonWeights,
};

export const Bold: Story<StoryButtonProps> = Template.bind({});
Light.storyName = 'Weight Light';
Light.args = {
  weight: 'bold' as keyof FluidButtonWeights,
};

export const Outline: Story<StoryButtonProps> = Template.bind({});
Outline.storyName = 'Weight Outline';
Outline.args = {
  weight: 'outline' as keyof FluidButtonWeights,
};

export const Clear: Story<StoryButtonProps> = Template.bind({});
Clear.storyName = 'Weight Clear';
Clear.args = {
  weight: 'clear' as keyof FluidButtonWeights,
};
export const Link: Story<StoryButtonProps> = Template.bind({});
Link.storyName = 'Weight Link';
Link.args = {
  weight: 'link' as keyof FluidButtonWeights,
};

export const WithIcon: Story<StoryButtonProps> = Template.bind({});
WithIcon.storyName = 'With Icon';
WithIcon.args = {
  icon: IoIosSend,
};
