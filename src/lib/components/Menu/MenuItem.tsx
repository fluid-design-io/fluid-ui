/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-console */
import { Menu as HeadlessMenu } from '@headlessui/react';
import React, { Fragment } from 'react';
import {
  MenuItemComponent,
  MenuItemProps,
  PolymorphicRef,
} from '../../../type';

import clsxm from '../../helpers/clsxm';
import { excludeClassName } from '../../helpers/exclude';
import { getUserClassNames } from '../../helpers/getUserClassNames';
import { Button } from '../Button';

export const MenuItem: MenuItemComponent = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      menuButtonClassName,
      horizontal,
      label,
      onClick,
      role,
      className,
      ...props
    }: MenuItemProps<C> & {
      menuButtonClassName?: string;
      horizontal?: boolean;
    },
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || Button;
    const isDefault = Component === Button;
    const inherClassNames = getUserClassNames(className);
    const theirProps = excludeClassName(props);
    if (role === 'separator') {
      return (
        <span
          className={clsxm(
            !horizontal
              ? 'mt-1 border-t border-t-gray-100 pb-1 dark:border-t-gray-700'
              : 'ml-1 border-l border-l-gray-100 pr-1 dark:border-l-gray-700'
          )}
        />
      );
    }
    const getButtonColor = () => {
      switch (role) {
        case 'default':
          return 'gray';
        case 'destructive':
          return 'red';
        case 'info':
          return 'blue';
        case 'success':
          return 'green';
        case 'warning':
          return 'amber';
        default:
          return 'gray';
      }
    };
    return (
      <HeadlessMenu.Item>
        <Component
          onClick={onClick}
          ref={ref}
          shape='square'
          className={clsxm(
            (!role || role === 'default') && [
              'ui-active:bg-gray-100/80 dark:ui-active:bg-gray-700/50',
            ],
            role === 'destructive' && [
              'ui-active:bg-red-100/50 dark:ui-active:bg-red-700/25',
            ],
            role === 'info' && [
              'ui-active:bg-blue-100/50 dark:ui-active:bg-blue-700/25',
            ],
            role === 'success' && [
              'ui-active:bg-green-100/50 dark:ui-active:bg-green-700/25',
            ],
            role === 'warning' && [
              'ui-active:bg-amber-100/50 dark:ui-active:bg-amber-700/25',
            ],
            role === 'primary' && [
              'btn-claer-primary',
              'ui-active:bg-primary-100/50 dark:ui-active:bg-primary-700/25',
            ],
            horizontal && 'flex items-center justify-center h-auto',
            !horizontal && 'flex w-full items-center justify-start',
            menuButtonClassName,
            inherClassNames
          )}
          color={isDefault ? getButtonColor() : undefined}
          weight={isDefault ? 'clear' : undefined}
          {...theirProps}
        >
          {props?.children ? (
            props.children
          ) : (
            <Fragment>
              {label && <span className='flex-shrink-0'>{label}</span>}
            </Fragment>
          )}
        </Component>
      </HeadlessMenu.Item>
    );
  }
);
