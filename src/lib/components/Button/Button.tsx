import React, { ComponentProps, PropsWithChildren } from 'react';
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
  children,
  ...props
}: ButtonProps) => {
  const isLink = typeof href !== 'undefined';
  const Component = isLink ? 'a' : 'button';
  const theme = useTheme().theme.button;

  const theirProps = excludeClassName(props);
  return (
    <Component
      className={clsxm(
        theme.base,
        theme.color[color].base,
        iconOnly ? theme.iconOnly[shape][size] : theme.shape[shape][size],
        gradient ? theme.color[color].gradient[gradient] : theme.color[color].weight[weight],
        props?.className
      )}
      disabled={props?.disabled || isLoading}
      href={href}
      type={isLink ? undefined : 'button'}
      {...theirProps}
    >
      {sr && <span className="sr-only">{sr}</span>}
      {isLoading && <ButtonLoadingComponent {...{ loadingOptions }} />}
      <div
        className={clsxm(
          theme.base,
          isLoading && 'opacity-0',
          loadingOptions?.text && loadingOptions.text.length > 0 && 'px-2'
        )}
      >
        {isLoading
          ? loadingOptions?.text && loadingOptions.text.length > 0
            ? loadingOptions.text
            : children
          : children}
      </div>
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
    <div className={clsxm(theme.loading.base)}>
      <Icon className={theme.loading.animation[loadingOptions.animation]} />
      {loadingOptions?.text && loadingOptions.text.length > 0 && (
        <div className={theme.loading.text}>{loadingOptions.text}</div>
      )}
    </div>
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
   * @type {'light' | 'normal' | 'bold' | 'outline' | 'clear' | 'none'}
   */
  weight?: keyof FluidButtonWeights;
  /**
   * Adjust the padding to be the same for all edges
   *
   * @default false
   */
  iconOnly?: boolean;
  /**
   * isLoading: Whether the button is loading or not.
   * @default false
   * @type {boolean}
   * @memberof ButtonProps
   */
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
