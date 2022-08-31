import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import React, { Fragment, useId } from 'react';

import clsxm from '../../helpers/clsxm';

import { Menu } from '.';
import { MenuComponent, MenuProps } from '../../../type';
import { excludes } from '../../helpers/exclude';
import { isChildValid } from '../../helpers/isChildValid';
import { Button } from '../Button';

export const MenuComp: MenuComponent = ({
  header,
  menus,
  className,
  buttonClassName,
  menuClassName,
  menuPositionX = 'center',
  menuPositionY = 'bottom',
  horizontal = false,
  children,
  ...props
}: MenuProps & React.RefAttributes<HTMLDivElement>) => {
  const id = useId();
  const theirProps = excludes(
    [
      'header',
      'menus',
      'className',
      'buttonClassName',
      'menuClassName',
      'menuPositionX',
      'menuPositionY',
      'horizontal',
    ],
    props
  );
  return (
    <HeadlessMenu
      as='div'
      className={clsxm('relative inline-block', className)}
    >
      <HeadlessMenu.Button
        as={Button}
        className={clsxm(
          'default-focus-visible inline-flex items-center justify-center',
          buttonClassName
        )}
        {...theirProps}
      />

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
            [
              'absolute z-50 divide-primary-100 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-primary-700 dark:bg-primary-800 dark:ring-white dark:ring-opacity-5',
              'contrast:divide-primary-700 dark:contrast:divide-primary-200 overflow-hidden',
              menuPositionX === 'center' && 'left-1/2 mx-auto -translate-x-1/2',
              menuPositionX === 'start' &&
                'left-0 rtl:right-auto rtl:left-full',
              menuPositionX === 'end' && 'right-0 rtl:left-auto rtl:right-full',
              menuPositionY === 'center' && 'top-1/2 mt-auto -translate-y-1/2',
              menuPositionY === 'top' && 'bottom-full mb-2',
              menuPositionY === 'bottom' && 'top-full mt-2',
              !horizontal && 'flex w-max min-w-full flex-col divide-y',
              horizontal && 'flex w-max flex-row divide-x',
              horizontal &&
                menuPositionY === 'center' &&
                menuPositionX === 'start' &&
                'right-full left-auto rtl:ml-2 ltr:mr-2',
              horizontal &&
                menuPositionY === 'center' &&
                menuPositionX === 'end' &&
                'left-full right-auto rtl:mr-2 ltr:ml-2',
              !horizontal &&
                menuPositionY === 'center' &&
                menuPositionX === 'start' &&
                'right-full left-auto rtl:ml-2 ltr:mr-2',
              !horizontal &&
                menuPositionY === 'center' &&
                menuPositionX === 'end' &&
                'left-full right-auto rtl:mr-2 ltr:ml-2',
            ],
            menuClassName
          )}
        >
          <Fragment>
            {header &&
              (typeof header === 'string' ? (
                <div className='flex items-center justify-between px-4 py-2 text-primary-800 dark:text-primary-100'>
                  {header}
                </div>
              ) : (
                header
              ))}
            {children && isChildValid(children) ? (
              children
            ) : (
              <div
                className={clsxm([
                  horizontal ? 'flex-row items-stretch px-1' : 'py-1 flex-col',
                  'flex contrast:divide-primary-700 dark:contrast:divide-primary-200',
                ])}
              >
                {menus &&
                  menus.map(({ ...props }, i) => (
                    <Menu.Item
                      key={`${id}.${i}`}
                      {...{ horizontal, ...props }}
                    />
                  ))}
              </div>
            )}
          </Fragment>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};
