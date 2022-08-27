import React, { ComponentProps, PropsWithChildren, useId } from 'react';
import clsxm from '../../helpers/clsxm';
import {
  FluidButtonColorOptions,
  FluidButtonColors,
  FluidButtonShapes,
  FluidButtonSizes,
  FluidButtonWeights,
  FulidButtonLoadingOptions,
} from '../FluidUI/FluidTheme';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrEmptyCircle } from 'react-icons/gr';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

import { useTheme } from '../FluidUI/ThemeContext';
import { excludeClassName } from '../../helpers/exclude';
import { AnimatePresence, motion } from 'framer-motion';

export const Button = ({
  color = 'gray',
  size = 'md',
  sr = undefined,
  shape = 'round',
  weight = 'normal',
  iconOnly = false,
  isLoading = false,
  gradient = undefined,
  loadingOptions = {
    animation: 'spin',
    text: '',
  },
  href = undefined,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const isLink = typeof href !== 'undefined';
  const Component = isLink ? 'a' : 'button';
  const theme = useTheme().theme.button;
  const id = useId();
  const theirProps = excludeClassName(props);
  return (
    <Component
      className={clsxm(
        theme.base,
        theme.color[color].base,
        iconOnly ? theme.iconOnly[shape][size] : theme.shape[shape][size],
        gradient ? theme.color[color].gradient[gradient] : theme.color[color].weight[weight],
        className
      )}
      disabled={props?.disabled || isLoading}
      href={href}
      type={isLink ? undefined : 'button'}
      {...theirProps}
    >
      {sr && <span className="sr-only">{sr}</span>}
      <AnimatePresence mode="sync">
        {isLoading && <ButtonLoadingComponent key={id} {...{ loadingOptions }} />}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.85 : 1 }}
          className={clsxm(theme.base, loadingOptions?.text && loadingOptions.text.length > 0 && 'px-2')}
        >
          {isLoading
            ? loadingOptions?.text && loadingOptions.text.length > 0
              ? loadingOptions.text
              : children
            : children}
        </motion.div>
      </AnimatePresence>
    </Component>
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

export interface ButtonProps extends PropsWithChildren<ComponentProps<'button'>> {
  /**
   * The color of the button.
   * @default 'gray'
   * @type {FluidButtonColorOptions}
   */
  color?: keyof FluidButtonColors;
  /**
   * sr: screen reader only
   */
  sr?: string | undefined;
  size?: keyof FluidButtonSizes;
  /**
   * wieght: The appearance of the button.
   * @default 'normal'
   *
   * @type {'light' | 'normal' | 'bold' | 'outline' | 'clear' | 'link'}
   */
  weight?: keyof FluidButtonWeights;
  /**
   * Adjust the padding to be the same for all edges
   *
   * @default false
   */
  iconOnly?: boolean;
  isLoading?: boolean;
  /**
   * shape: The shape of the button.
   * @default 'round'
   * @type {'pill' | 'round' | 'square'}
   */
  shape?: keyof FluidButtonShapes;
  gradient?: keyof FluidButtonColorOptions['gradient'] | undefined;
  /**
   * loadingOptions: The options for the loading animation.
   * @type {FulidButtonLoadingOptions}
   * @memberof ButtonProps
   */
  loadingOptions?: {
    animation?: keyof FulidButtonLoadingOptions['animation'];
    text?: string;
  };
  children?: React.ReactNode;
  [key: string]: any;
}
