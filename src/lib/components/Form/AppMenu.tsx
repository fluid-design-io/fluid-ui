import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { MenuProps } from '.';
import clsxm from '../../helpers/clsxm';

function AppMenu({
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
  iconClassName,
  iconStartPosition = 'flex',
  iconEndPosition = 'flex',
  menuPositionX = 'center',
  menuPositionY = 'bottom',
  ...props
}: MenuProps & React.HTMLAttributes<HTMLDivElement>) {
  const iconDefaultClassName =
    'h-5 w-5 flex-shrink-0 text-primary-400 group-hover:text-primary-500 dark:text-primary-400 dark:group-hover:text-primary-50';
  return (
    <Menu as="div" className={clsxm('relative -ml-px block', className)} {...props}>
      <Menu.Button
        className={clsxm(
          'default-focus-visible group inline-flex items-center justify-center text-sm font-medium text-primary-700 hover:text-primary-900 [-webkit-tap-highlight-color:transparent]',
          buttonClassName
        )}
      >
        {sr && <span className="sr-only">{sr}</span>}
        <div className={clsxm('flex justify-start items-center w-full gap-2')}>
          {IconStart && <IconStart className={clsxm(iconDefaultClassName, iconClassName)} />}
          {iconStartPosition === 'between' && <span className="flex-grow" />}
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
          {iconEndPosition === 'between' && <span className="flex-grow" />}
          {IconEnd && <IconEnd className={clsxm(iconDefaultClassName, iconClassName)} />}
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
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsxm(
            'absolute z-50 min-w-full w-min divide-y divide-primary-100 dark:divide-primary-700 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-primary-800 dark:ring-white dark:ring-opacity-5',
            menuPositionX === 'center' && 'mx-auto left-1/2 -translate-x-1/2',
            menuPositionX === 'start' && 'left-0 rtl:right-0',
            menuPositionX === 'end' && 'right-0 rtl:left-0',
            menuPositionY === 'center' && 'mt-auto top-0 bottom-0',
            menuPositionY === 'top' && 'bottom-full mb-2',
            menuPositionY === 'bottom' && 'top-full mt-2',
            menuClassName
          )}
        >
          {header && header}
          <div className="py-1">
            {menus.map(({ icon: Icon, label, onClick, role, ...props }) => (
              <Menu.Item key={`menu-${label}`}>
                {({ active }) =>
                  role === 'separator' ? (
                    <div className="mt-1 border-t border-t-primary-100 pb-1 dark:border-t-primary-700" />
                  ) : (
                    <button
                      onClick={onClick}
                      className={clsxm([
                        ((!role && active) || (role === 'default' && active)) &&
                          'bg-primary-100 text-primary-900 dark:bg-black/20 dark:text-white',
                        (!role || role === 'default') && 'text-primary-700 dark:text-primary-200',
                        role === 'destructive' && active && 'bg-red-100 dark:bg-red-700/20',
                        role === 'destructive' && 'text-red-600 dark:text-red-300',
                        role === 'info' && active && 'bg-blue-100 dark:bg-blue-700/20',
                        role === 'info' && 'text-blue-600 dark:text-blue-300',
                        role === 'success' && active && 'bg-green-100 dark:bg-green-700/20',
                        role === 'success' && 'text-green-600 dark:text-green-300',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'block w-full px-4 py-2 text-left text-sm rtl:text-right',
                        'flex items-center justify-start gap-2',
                      ])}
                      {...props}
                    >
                      <span className="rtl:hidden">
                        {typeof Icon === 'function' ? <Icon className="h-4 w-4" /> : Icon}
                      </span>
                      <span>{label}</span>
                      <span className="hidden rtl:block">
                        {typeof Icon === 'function' ? <Icon className="h-4 w-4" /> : Icon}
                      </span>
                    </button>
                  )
                }
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
export default AppMenu;
