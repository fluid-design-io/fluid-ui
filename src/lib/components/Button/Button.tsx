import React, { ComponentProps, PropsWithChildren } from 'react';
import clsxm from '../../helpers/clsxm';
import { FluidButtonColors, FluidTheme } from '../FluidUI/FluidTheme';

import { useTheme } from '../FluidUI/ThemeContext';

export interface ButtonProps
  extends PropsWithChildren<ComponentProps<'button'>> {
  color?: keyof FluidButtonColors;
  size?: keyof FluidTheme['button']['size'];
  children: React.ReactNode;
}
export const Button = ({ color = 'gray', size, children }: ButtonProps) => {
  const theme = useTheme().theme.button;
  return (
    <button
      className={clsxm(
        theme.base,
        size ? theme.size[size] : 'w-full px-4 py-2 rounded-md',
        theme.color[color].palette
      )}
    >
      {children}
    </button>
  );
};
