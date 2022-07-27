import React, { ComponentProps, PropsWithChildren } from 'react';
import clsxm from '../../helpers/clsxm';
import {
  FluidButtonColors,
  FluidButtonSizes,
  FluidButtonWeights,
  FulidButtonLoadingOptions,
} from '../FluidUI/FluidTheme';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrEmptyCircle } from 'react-icons/gr';

import { useTheme } from '../FluidUI/ThemeContext';

export interface ButtonProps
  extends PropsWithChildren<ComponentProps<'button'>> {
  color?: keyof FluidButtonColors;
  size?: keyof FluidButtonSizes;
  weight?: keyof FluidButtonWeights;
  isLoading?: boolean;
  loadingOptions?: {
    animation?: keyof FulidButtonLoadingOptions['animation'];
    text?: string;
  };
  children: React.ReactNode;
  [key: string]: any;
}
export const Button = ({
  color = 'gray',
  size = 'md',
  weight = 'normal',
  isLoading = false,
  loadingOptions = {
    animation: 'spin',
    text: 'Loading...',
  },
  children,
  ...props
}: ButtonProps) => {
  const theme = useTheme().theme.button;
  return (
    <button
      className={clsxm(
        theme.base,
        theme.color[color].base,
        size ? theme.size[size] : theme.size.md,
        weight
          ? theme.color[color].weight[weight]
          : theme.color[color].weight.light,
        props?.className
      )}
      disabled={props?.disabled || isLoading}
    >
      {isLoading ? (
        <ButtonLoadingComponent {...{ loadingOptions }} />
      ) : (
        children
      )}
    </button>
  );
};

const ButtonLoadingComponent = ({
  loadingOptions,
}: {
  loadingOptions: {
    animation?: keyof FulidButtonLoadingOptions['animation'];
    text?: string;
  };
}) => {
  const theme = useTheme().theme.button;

  if (loadingOptions.animation === 'spin') {
    return (
      <div className={clsxm(theme.loading.animation.spin)}>
        <AiOutlineLoading3Quarters className={theme.loading.base} />
      </div>
    );
  } else if (loadingOptions.animation === 'pulse') {
    return (
      <div className={clsxm(theme.loading.animation.pulse)}>
        <GrEmptyCircle className={theme.loading.base} />
      </div>
    );
  } else {
    return null;
  }
};
