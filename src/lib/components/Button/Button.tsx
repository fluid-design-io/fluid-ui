import { AnimatePresence, motion } from 'framer-motion';
import React, { useId } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrEmptyCircle } from 'react-icons/gr';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

import clsxm from '@/lib/helpers/clsxm';
import { excludeClassName } from '@/lib/helpers/exclude';

import {
  ButtonComponent,
  ButtonLoadingOptionsAnimation,
  ButtonProps,
  PolymorphicRef,
} from '@/typing';

import {
  FluidButtonColors,
  FluidButtonShapes,
  FluidButtonSizes,
  FluidButtonWeights,
} from '../FluidUI/FluidTheme';
import { useTheme } from '../FluidUI/ThemeContext';

export const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      color = 'gray' as keyof FluidButtonColors,
      size = 'md' as keyof FluidButtonSizes,
      sr = undefined,
      shape = 'round' as keyof FluidButtonShapes,
      weight = 'normal' as keyof FluidButtonWeights,
      iconOnly = false,
      isLoading = false,
      gradient = undefined,
      loadingOptions = undefined,
      children,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme().theme.button;
    const id = useId();
    const className = props?.className || '';
    const theirProps = excludeClassName(props);
    // isCustomColor is to check if the className contains a string starts with 'btn-'
    const isCustomColor = className && className.includes('btn-');
    const Component = as || 'button';
    console.log('🚀 ~ file: Button.tsx ~ line 42 ~ Component', Component);
    return (
      <Component
        ref={ref}
        className={clsxm(
          theme.base,
          iconOnly ? theme.iconOnly[shape][size] : theme.shape[shape][size],
          !isCustomColor && [
            theme.color[color].base,
            gradient
              ? theme.color[color].gradient[gradient]
              : theme.color[color].weight[weight],
          ],
          className
        )}
        disabled={props?.disabled || isLoading}
        {...theirProps}
      >
        {sr && <span className='sr-only'>{sr}</span>}
        <AnimatePresence mode='sync'>
          {isLoading && (
            <ButtonLoadingComponent key={id} {...{ loadingOptions }} />
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.85 : 1 }}
          className={clsxm(
            theme.base,
            loadingOptions?.text && loadingOptions.text.length > 0 && 'px-2'
          )}
        >
          {isLoading
            ? loadingOptions?.text && loadingOptions.text.length > 0
              ? loadingOptions.text
              : children
            : children}
        </motion.div>
      </Component>
    );
  }
);

const ButtonLoadingComponent = ({
  loadingOptions = {
    animation: 'spin',
    text: '',
  },
}: {
  loadingOptions: {
    animation?: ButtonLoadingOptionsAnimation;
    text?: string;
  };
}) => {
  const theme = useTheme().theme.button;
  const iconOption = {
    spin: AiOutlineLoading3Quarters,
    pulse: HiOutlineDotsHorizontal,
    ping: GrEmptyCircle,
  };
  const Icon = iconOption[loadingOptions.animation];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.3 }}
      className={clsxm(theme.loading.base)}
    >
      <Icon className={theme.loading.animation[loadingOptions.animation]} />
      {loadingOptions?.text && loadingOptions.text.length > 0 && (
        <div className={theme.loading.text}>{loadingOptions.text}</div>
      )}
    </motion.div>
  );
};
