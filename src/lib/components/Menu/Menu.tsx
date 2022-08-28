import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import React, { Fragment, SVGProps, useId } from 'react';

import clsxm from '../../helpers/clsxm';


import { MenuItem } from '.';
import { MenuProps } from '../../../typing';

const isChildNull = (children) => {
  return Boolean(children.type() === null);
};

export const Menu = ({
  sr,
  label,
  header,
  iconStart: IconStart,
  iconEnd: IconEnd,
  badge,
  menus,
  className,
  buttonClassName,
  labelClassName,
  badgeClassName,
  menuClassName,
  menuButtonClassName,
  iconClassName,
  iconStartPosition = 'flex',
  iconEndPosition = 'flex',
  menuPositionX = 'center',
  menuPositionY = 'bottom',
  horizontal = false,
  ...props
}: MenuProps & React.RefAttributes<HTMLDivElement>) => {
  const id = useId();
  const iconDefaultClassName =
    'h-5 w-5 flex-shrink-0 text-primary-400 group-hover:text-primary-500 dark:text-primary-400 dark:group-hover:text-primary-50';
  return (
    <HeadlessMenu
      as='div'
      className={clsxm('relative -ml-px block', className)}
      {...props}
    >
      <HeadlessMenu.Button
        className={clsxm(
          'default-focus-visible group inline-flex items-center justify-center text-sm font-medium text-primary-700 [-webkit-tap-highlight-color:transparent] hover:text-primary-900',
          buttonClassName
        )}
      >
        {sr && <span className='sr-only'>{sr}</span>}
        <div className={clsxm('flex w-full items-center justify-start gap-2')}>
          {IconStart && (
            <IconStart className={clsxm(iconDefaultClassName, iconClassName)} />
          )}
          {iconStartPosition === 'between' && <span className='flex-grow' />}
          {label && (
            <span
              className={clsxm(
                'hover:text-primary-900 dark:text-primary-200 dark:hover:text-primary-50',
                labelClassName
              )}
            >
              {label}
            </span>
          )}
          {iconEndPosition === 'between' && <span className='flex-grow' />}
          {IconEnd && (
            <IconEnd className={clsxm(iconDefaultClassName, iconClassName)} />
          )}
          {badge && (
            <span
              className={clsxm(
                'ml-1.5 rounded bg-primary-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-primary-700',
                badgeClassName
              )}
            >
              {badge}
            </span>
          )}
        </div>
      </HeadlessMenu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <HeadlessMenu.Items
          className={clsxm(
            'absolute z-50 divide-primary-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-primary-700 dark:bg-primary-800 dark:ring-white dark:ring-opacity-5',
            'contrast:divide-primary-700 dark:contrast:divide-primary-200',
            menuPositionX === 'center' && 'left-1/2 mx-auto -translate-x-1/2',
            menuPositionX === 'start' && 'left-0 rtl:right-0',
            menuPositionX === 'end' && 'right-0 rtl:left-0',
            menuPositionY === 'center' && 'top-1/2 mt-auto -translate-y-1/2',
            menuPositionY === 'top' && 'bottom-full mb-2',
            menuPositionY === 'bottom' && 'top-full mt-2',
            !horizontal && 'flex w-max min-w-full flex-col divide-y',
            horizontal && 'flex w-max flex-row divide-x',
            horizontal &&
              menuPositionY === 'center' &&
              menuPositionX === 'start' &&
              'right-full left-auto ml-2 rtl:mr-2',
            horizontal &&
              menuPositionY === 'center' &&
              menuPositionX === 'end' &&
              'left-full right-auto',
            !horizontal &&
              menuPositionY === 'center' &&
              menuPositionX === 'start' &&
              'right-full left-auto mr-2 rtl:ml-2',
            !horizontal &&
              menuPositionY === 'center' &&
              menuPositionX === 'end' &&
              'left-full right-auto ml-2 rtl:mr-2',
            menuClassName
          )}
        >
          {header &&
            (typeof header === 'string' ? (
              <div className='flex items-center justify-between px-4 py-2 text-primary-800 dark:text-primary-100'>
                {header}
              </div>
            ) : (
              header
            ))}
          {props?.children && isChildNull(props.children) ? (
            props.children
          ) : (
            <div
              className={clsxm([
                horizontal ? 'flex flex-row' : 'py-1',
                'contrast:divide-primary-700 dark:contrast:divide-primary-200',
              ])}
            >
              {menus &&
                menus.map(({ ...props }, i) => (
                  <MenuItem key={`${id}.${i}`} {...{ horizontal, ...props }} />
                ))}
            </div>
          )}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};
