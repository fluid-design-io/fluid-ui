import React, { Fragment, SVGProps, useId } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';

import clsxm from '../../helpers/clsxm';
import { MenuItem } from '.';

export interface MenuRoleProp {
  /**
   * The role of the menu item.
   *
   * `default` - a regular menu item with gray text.
   *
   * `separator` - a separator between menu items. Creates a line based on the orientation.
   *
   * `destructive` - a destructive menu item with red text.
   *
   * `info` - an info menu item with blue text.
   *
   * `success` - a success menu item with green text.
   *
   * `warning` - a warning menu item with amber text.
   *
   * @default 'default'
   */
  role?: 'separator' | 'destructive' | 'default' | 'info' | 'success' | 'warning';
}

export interface MenuItemProp extends MenuRoleProp {
  /**
   * sr: Screen reader text
   */
  sr?: string;
  label?: string;
  onClick?: () => any;
  icon?: JSX.Element | { (props: SVGProps<SVGSVGElement>): JSX.Element };
  [x: string]: any;
}

export interface MenuProps {
  label?: string;
  /**
   * A React component to be used as the icon for the menu item.
   */
  icon?: JSX.Element;
  /**
   * displayed after the label
   * `string
   */
  badge?: string;
  /**
   * Header of the menu, can be either a string or a React component.
   */
  header?: JSX.Element | string;
  /**
   * sr: Screen reader text
   */
  sr?: string;
  /**
   * iconStart: Icon to display on the left of the label
   */
  iconStart?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  /**
   * iconEnd: Icon to display on the right of the label
   */
  iconEnd?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  /**
   * iconStartPosition: Position of the iconStart
   * `flex` (default) or `between`
   * `between` will create a gap between the icon and the label
   */
  iconStartPosition?: 'flex' | 'between';
  /**
   * iconEndPosition: Position of the iconEnd
   * `flex` (default) or `between`
   * `between` will create a gap between the icon and the label
   */
  iconEndPosition?: 'flex' | 'between';
  className?: string;
  /**
   * buttonClassName: Additional class name to apply to the button
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  buttonClassName?: string;
  /**
   * labelClassName: Additinal class name to apply to the label
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  labelClassName?: string;
  /**
   * badgeClassName: Additinal class name to apply to the badge
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  badgeClassName?: string;
  /**
   * menuClassName: Additinal class name to apply to the menu
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  menuClassName?: string;
  /**
   * menuButtonClassName: Additinal class name to apply to the menu button
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  menuButtonClassName?: string;
  /**
   * iconClassName: Additinal class name to apply to the icon
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  iconClassName?: string;
  /**
   * menuPositionX: Horizontal position of the menu
   * `center` (default) or `left` or `right`
   */
  menuPositionX?: 'start' | 'center' | 'end';
  /**
   * menuPositionY: Vertical position of the menu
   * `top` (default) or `bottom`
   */
  menuPositionY?: 'top' | 'center' | 'bottom';
  [x: string]: any;
  /**
   * Make the menu layout horizontal
   * @type {boolean}
   * @default false
   */
  horizontal?: boolean;
  /**
   * menus: Array of menu items
   *
   * Each menu item should be an object with the following properties:
   *
   * `label`: The name of the menu item
   *
   * `href`: `optional` - The URL of the menu item
   *
   * `icon`: `optional` - A React component or a function that returns a React component to be used as the icon for the menu item
   *
   * `role`: `optional` - The role of the menu item
   *
   * `onClick`: `optional` - A function to be called when the menu item is clicked
   *
   * `props`: `optional` - Any additional props to be passed to the menu item
   */
  menus?: MenuItemProp[];
}

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
    <HeadlessMenu as="div" className={clsxm('relative -ml-px block', className)} {...props}>
      <HeadlessMenu.Button
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
      </HeadlessMenu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items
          className={clsxm(
            'absolute z-50 divide-primary-100 dark:divide-primary-700 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-primary-800 dark:ring-white dark:ring-opacity-5',
            'contrast:divide-primary-700 dark:contrast:divide-primary-200',
            menuPositionX === 'center' && 'mx-auto left-1/2 -translate-x-1/2',
            menuPositionX === 'start' && 'left-0 rtl:right-0',
            menuPositionX === 'end' && 'right-0 rtl:left-0',
            menuPositionY === 'center' && 'mt-auto top-1/2 -translate-y-1/2',
            menuPositionY === 'top' && 'bottom-full mb-2',
            menuPositionY === 'bottom' && 'top-full mt-2',
            !horizontal && 'flex flex-col min-w-full w-max divide-y',
            horizontal && 'flex flex-row w-max divide-x',
            horizontal &&
              menuPositionY === 'center' &&
              menuPositionX === 'start' &&
              'right-full left-auto ml-2 rtl:mr-2',
            horizontal && menuPositionY === 'center' && menuPositionX === 'end' && 'left-full right-auto',
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
              <div className="flex items-center justify-between px-4 py-2 text-primary-800 dark:text-primary-100">
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
              {menus && menus.map(({ ...props }, i) => <MenuItem key={`${id}.${i}`} {...{ horizontal, ...props }} />)}
            </div>
          )}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};
