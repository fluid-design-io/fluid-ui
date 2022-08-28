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
  // isCustomColor is to check if the className contains a string starts with 'btn-'
  const isCustomColor = className.includes('btn-');
  return (
    <Component
      className={clsxm(
        theme.base,
        iconOnly ? theme.iconOnly[shape][size] : theme.shape[shape][size],
        !isCustomColor && [
          theme.color[color].base,
          gradient ? theme.color[color].gradient[gradient] : theme.color[color].weight[weight],
        ],
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
      </AnimatePresence>
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
   * @defaultValue `gray`
   *
   * @example
   *
   * You can use custom color by using the class name `btn-custom` once you have defined custom colors in tailwind.config.js
   * ```tsx
   * <Button className="btn-primary" />
   * <Button className="btn-bold-primary" />
   * <Button className="btn-outline-primary" />
   * <Button className="btn-clear-primary" />
   * ```
   *
   * ```js
   *
   * // tailwind.config.js
   * module.exports = {
   *   ...
   *   theme: {
   *     extend: {
   *         colors: {
   *           primary: {
   *             50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
   *             100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
   *             200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
   *             300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
   *             400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
   *             500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
   *             600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
   *             700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
   *             800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
   *             900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
   *           },
   *         }
   *       },
   *     }
   *   }
   * ```
   */
  color?: keyof FluidButtonColors;
  /**
   * sr: screen reader only
   */
  sr?: string | undefined;
  size?: keyof FluidButtonSizes;
  /**
   * wieght: The appearance of the button.
   * @defaultValue `normal`
   *
   * @type {'light' | 'normal' | 'bold' | 'outline' | 'clear' | 'link'}
   */
  weight?: keyof FluidButtonWeights;
  /**
   * Adjust the padding to be the same for all edges
   *
   * @defaultValue `false`
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
