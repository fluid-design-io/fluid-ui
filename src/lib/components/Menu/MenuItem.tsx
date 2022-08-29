/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-console */
import { Menu as HeadlessMenu } from '@headlessui/react';
import React, { Fragment } from 'react';
import {
  MenuItemComponent,
  MenuItemProps,
  PolymorphicComponentPropWithRef,
} from '../../../type';

import clsxm from '../../helpers/clsxm';
import { excludeClassName } from '../../helpers/exclude';
import { getUserClassNames } from '../../helpers/getUserClassNames';
import { Button } from '../Button';

const isChildNull = (element: MenuItemProps['icon']) => {
  if (!element) {
    return false;
  }
  return React.isValidElement(element);
};

export const MenuItem: MenuItemComponent = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      menuButtonClassName,
      horizontal,
      sr,
      label,
      onClick,
      icon: Icon,
      role,
      iconStart,
      iconEnd,
      iconStartPosition,
      iconEndPosition,
      className,
      ...props
    }:
      | {
          menuButtonClassName?: string;
          horizontal?: boolean;
        } & PolymorphicComponentPropWithRef<C, MenuItemProps>,
    ref
  ) => {
    const Component = as || Button;
    const inherClassNames = getUserClassNames(className);
    const theirProps = excludeClassName(props);
    if (role === 'separator') {
      return (
        <span
          className={clsxm(
            !horizontal
              ? 'mt-1 border-t border-t-primary-100 pb-1 dark:border-t-primary-700'
              : 'ml-1 border-l border-l-primary-100 pr-1 dark:border-l-primary-700'
          )}
        />
      );
    }
    return (
      <HeadlessMenu.Item>
        {({ active, disabled }) => (
          <Component
            onClick={onClick}
            ref={ref}
            shape='square'
            className={clsxm(
              (!role || role === 'default') && 'btn-clear-gray',
              role === 'destructive' && 'btn-clear-red',
              role === 'info' && 'btn-clear-blue',
              role === 'success' && 'btn-clear-green',
              horizontal &&
                'flex items-center justify-center !border-y-transparent h-auto',
              !horizontal &&
                'flex w-full items-center justify-start !border-x-transparent',
              menuButtonClassName,
              inherClassNames
            )}
            {...theirProps}
          >
            {props?.children ? (
              props.children
            ) : (
              <Fragment>
                {Icon && (
                  <span className='rtl:hidden'>
                    {/* @ts-ignore */}
                    {isChildNull(Icon) ? Icon : <Icon className='w-4 h-4' />}
                  </span>
                )}
                {label && <span className='flex-shrink-0'>{label}</span>}
                {Icon && (
                  <span className='hidden rtl:block'>
                    {/* @ts-ignore */}
                    {isChildNull(Icon) ? Icon : <Icon className='w-4 h-4' />}
                  </span>
                )}
              </Fragment>
            )}
          </Component>
        )}
      </HeadlessMenu.Item>
    );
  }
);
