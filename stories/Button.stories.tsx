import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '../src/lib/components/Button';
import { FluidButtonColors, FluidButtonSizes, FluidButtonWeights } from '../src/lib/components/FluidUI/FluidTheme';
import { IoIosSend } from 'react-icons/io';


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

interface StoryButtonProps extends Omit<ButtonProps, 'color'> {
  isLoading?: boolean;
}

const Template: Story<StoryButtonProps> = (args) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {colors.map((color) => (
        <Button key={color} color={color as keyof FluidButtonColors} className="capitalize" {...args}>
          {color}
          {args?.icon && <IoIosSend />}
        </Button>
      ))}
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
Bold.storyName = 'Weight Bold';
Bold.args = {
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
  icon: true,
};
