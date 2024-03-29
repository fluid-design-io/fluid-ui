import React from 'react';
import { IoIosSend } from 'react-icons/io';
import { Button } from '../src/lib/components/Button';

import {
  ButtonProps,
  FluidButtonColors,
  FluidButtonSizes,
  FluidButtonWeights,
} from '../src/type';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    weight: 'normal' as keyof FluidButtonWeights,
    size: 'md' as keyof FluidButtonSizes,
    disabled: false,
  },
};

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

const Template = (args) => {
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
      <Button className='btn-primary-100' label='Primary' {...(args as any)} />
      <Button
        className='btn-[wheat]'
        sr='Something'
        label='Wheat'
        {...(args as any)}
      />
      <Button
        className='btn-light-[wheat]'
        label='Wheat Light'
        {...(args as any)}
      />
      <Button
        className='btn-outline-[wheat]'
        label='Wheat Outline'
        {...(args as any)}
      />
      <Button
        className='btn-clear-[wheat]'
        label='Wheat Clear'
        {...(args as any)}
      />
      <Button className='btn-[#FFFFFF]' label='FFFFFF' {...(args as any)} />
      <Button
        className='btn-light-[#FFFFFF]'
        label='FFFFFF Light'
        {...(args as any)}
      />
      <Button
        className='btn-outline-[#FFFFFF]'
        label='FFFFFF Outline'
        {...(args as any)}
      />
      <Button
        className='btn-clear-[#FFFFFF]'
        label='FFFFFF Clear'
        {...(args as any)}
      />
      <Button
        className='btn-clear-gray-700 unde'
        label='Gray 700'
        {...(args as any)}
      />
    </div>
  );
};
export const Default = Template.bind({});
export const Normal = Template.bind({});
Normal.storyName = 'Weight normal';

export const Light = Template.bind({});
Light.storyName = 'Weight Light';
Light.args = {
  weight: 'light' as keyof FluidButtonWeights,
};

export const Bold = Template.bind({});
Light.storyName = 'Weight Light';
Light.args = {
  weight: 'bold' as keyof FluidButtonWeights,
};

export const Outline = Template.bind({});
Outline.storyName = 'Weight Outline';
Outline.args = {
  weight: 'outline' as keyof FluidButtonWeights,
};

export const Clear = Template.bind({});
Clear.storyName = 'Weight Clear';
Clear.args = {
  weight: 'clear' as keyof FluidButtonWeights,
};
export const Link = Template.bind({});
Link.storyName = 'Weight Link';
Link.args = {
  weight: 'link' as keyof FluidButtonWeights,
};

export const WithIcon = Template.bind({});
WithIcon.storyName = 'With Icon';
WithIcon.args = {
  icon: IoIosSend,
};
