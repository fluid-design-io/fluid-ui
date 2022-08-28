import { Menu as HeadlessMenu } from '@headlessui/react';
import React from 'react';

import clsxm from '@/lib/helpers/clsxm';

import {
  MenuItemComponent,
  MenuItemProps,
  PolymorphicComponentProp,
} from '@/typing';

export const MenuItem: MenuItemComponent = <
  C extends React.ElementType = 'button'
>({
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
  href,
  ...props
}: {
  menuButtonClassName?: string;
  horizontal?: boolean;
} & PolymorphicComponentProp<C, MenuItemProps> & // based on href is defined or not, the HTML tag is different
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => {
  const Component = href ? 'a' : 'button';
  return (
    <HeadlessMenu.Item key={`menu-${label}`}>
      {({ active }) =>
        role === 'separator' ? (
          <div
            className={clsxm(
              !horizontal
                ? 'mt-1 border-t border-t-primary-100 pb-1 dark:border-t-primary-700'
                : 'ml-1 border-l border-l-primary-100 pr-1 dark:border-l-primary-700'
            )}
          />
        ) : (
          <Component
            onClick={onClick}
            className={clsxm(
              ((!role && active) || (role === 'default' && active)) &&
                'bg-primary-100 text-primary-900 dark:bg-black/20 dark:text-white',
              (!role || role === 'default') &&
                'text-primary-700 dark:text-primary-200',
              role === 'destructive' &&
                active &&
                'bg-red-100 dark:bg-red-700/20',
              role === 'destructive' && 'text-red-600 dark:text-red-300',
              role === 'info' && active && 'bg-blue-100 dark:bg-blue-700/20',
              role === 'info' && 'text-blue-600 dark:text-blue-300',
              role === 'success' &&
                active &&
                'bg-green-100 dark:bg-green-700/20',
              role === 'success' && 'text-green-600 dark:text-green-300',
              horizontal && 'flex items-center justify-center',
              !horizontal && 'flex w-full items-center justify-start',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'px-4 py-2 text-left text-sm rtl:text-right',
              'flex flex-shrink-0 gap-2',
              'hocus:contrast-bg hocus:contrast-text',
              menuButtonClassName
            )}
            {...props}
          >
            {Icon && (
              <span className='rtl:hidden'>
                {typeof Icon === 'function' ? (
                  <Icon className='h-4 w-4' />
                ) : (
                  Icon
                )}
              </span>
            )}
            <span className='flex-shrink-0'>{label}</span>
            {Icon && (
              <span className='hidden rtl:block'>
                {typeof Icon === 'function' ? (
                  <Icon className='h-4 w-4' />
                ) : (
                  Icon
                )}
              </span>
            )}
          </Component>
        )
      }
    </HeadlessMenu.Item>
  );
};
