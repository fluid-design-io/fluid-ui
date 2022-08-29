import { AnimatePresence, motion } from 'framer-motion';
import React, { useId } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrEmptyCircle } from 'react-icons/gr';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

import {
  ButtonComponent,
  ButtonLoadingOptionsAnimation,
  ButtonProps,
  PolymorphicRef,
} from '../../../type';
import clsxm from '../../helpers/clsxm';
import { excludeClassName } from '../../helpers/exclude';
import { getUserClassNames } from '../../helpers/getUserClassNames';
import {
  FluidButtonColors,
  FluidButtonShapes,
  FluidButtonSizes,
  FluidButtonWeights,
} from '../FluidUI/FluidTheme';
import { useTheme } from '../FluidUI/ThemeContext';
import { SpinLarge } from '../Spinner';

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
      className,
      children,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme().theme.button;
    const id = useId();
    const theirProps = excludeClassName(props);
    // isCustomColor is to check if the className contains a string starts with 'btn-'
    const isCustomColor = className && className.includes('btn-');
    const inherClassNames = getUserClassNames(className);
    const themeSize = iconOnly
      ? theme.iconOnly[shape][size]
      : theme.shape[shape][size];
    const Component = as || 'button';
    return (
      <Component
        disabled={props?.disabled || isLoading}
        ref={ref}
        className={clsxm(
          theme.base,
          themeSize,
          !isCustomColor && [
            theme.color[color].base,
            gradient
              ? theme.color[color].gradient[gradient]
              : theme.color[color].weight[weight],
          ],
          className
        )}
        {...theirProps}
      >
        {sr && <span className='sr-only'>{sr}</span>}
        <AnimatePresence mode='sync'>
          {isLoading && (
            <ButtonLoadingComponent
              key={id}
              {...{
                loadingOptions,
                inherClassNames:
                  loadingOptions?.text &&
                  loadingOptions.text.length > 0 &&
                  inherClassNames,
                themeSize,
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.85 : 1 }}
          initial={{ opacity: 1 }}
          className={clsxm(
            'w-full flex gap-2 items-center justify-center',
            inherClassNames
          )}
        >
          {children}
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
  inherClassNames = [],
  themeSize,
}: {
  loadingOptions: {
    animation?: ButtonLoadingOptionsAnimation;
    text?: string;
  };
  inherClassNames: string[];
  themeSize: string;
}) => {
  const theme = useTheme().theme.button;
  const iconOption = {
    spin: AiOutlineLoading3Quarters,
    pulse: HiOutlineDotsHorizontal,
    ping: GrEmptyCircle,
    'spin-large': SpinLarge,
  };
  const Icon = iconOption[loadingOptions.animation];

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={clsxm(theme.loading.base, themeSize, inherClassNames)}
      exit={{ opacity: 0, scale: 0.7 }}
      initial={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.3 }}
    >
      <Icon
        className={clsxm(
          'flex-shrink-0',
          theme.loading.animation[loadingOptions.animation]
        )}
      />
      {loadingOptions?.text && loadingOptions.text.length > 0 && (
        <div className={theme.loading.text}>{loadingOptions.text}</div>
      )}
    </motion.div>
  );
};
