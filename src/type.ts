/* ===== Start Polymorphic Props ===== */

import { SVGProps } from 'react';
import {
  FluidButtonColorOptions,
  FluidButtonColors,
  FluidButtonShapes,
  FluidButtonSizes,
  FluidButtonWeights,
} from './lib/components/FluidUI/FluidTheme';

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type AsProp<C extends React.ElementType> = {
  as?: C;
  /**
   * innerAs is used to pass a component to a component that is already wrapped in a styled component.
   * @defaultValue `as`
   */
  innerAs?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<C extends React.ElementType, Props = {}> =
  React.PropsWithChildren<Props & AsProp<C>> &
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C>;
};

/* ===== End Polymorphic Props ===== */

/* ===== Start Button Props ===== */

export type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
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
       * If true, the button will show default `isLoaded` UI after isLoading set back to false.
       * It can be set as an object to customize the text, icon and duration.
       * @defaultValue `false`
       */
      isLoaded?: boolean;
      loadedOptions?: ButtonIsLoadedOptions;
      /**
       * shape: The shape of the button.
       * defaultValue `round`
       * @type {'pill' | 'round' | 'square'}
       */
      shape?: keyof FluidButtonShapes;
      gradient?: keyof FluidButtonColorOptions['gradient'] | undefined;
      /**
       * loadingOptions: The options for the loading animation.
       * @type {ButtonLoadingOptions}
       * @memberof ButtonProps
       */
      loadingOptions?: ButtonLoadingOptions;
      /**
       * Weather to enable button transition.
       * @defaultValue `true`
       */
      buttonTransition?: boolean;
      children?: React.ReactNode;
      // [key: string]: any;
    } & ButtonInnerProp
  >;

export type ButtonLoadingOptionsAnimation =
  | 'spin'
  | 'pulse'
  | 'ping'
  | 'spin-large';

export type ButtonLoadingOptions = {
  animation?: ButtonLoadingOptionsAnimation;
  text?: string;
};

export type ButtonIsLoadedOptions = {
  text?: string | undefined;
  icon?: React.ReactNode | { (props: SVGProps<SVGSVGElement>): JSX.Element };
  /**
   * The duration of the animation.
   * @defaultValue `1500`ms
   */
  duration?: number;
  /**
   * className of the icon & text wrapper
   */
  className?: string;
};

export type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

export type ButtonInnerProp = {
  /**
   * displayed after the label
   * `string` | `number`
   */
  badge?: string | number;
  /**
   * Instead of passing `children` as a prop, you can pass `label` as a prop.
   * This will automatically generate screen reader text for the button.
   */
  label?: string;
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
  icon?: JSX.Element | { (props: SVGProps<SVGSVGElement>): JSX.Element };
  /**
   * iconStart: Icon to display on the left of the label
   */
  iconStart?: JSX.Element | { (props: SVGProps<SVGSVGElement>): JSX.Element };
  /**
   * iconEnd: Icon to display on the right of the label
   */
  iconEnd?: JSX.Element | { (props: SVGProps<SVGSVGElement>): JSX.Element };
  /**
   * iconClassName: Additinal class name to apply to the icon
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  iconClassName?: string;
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
};

/* ===== End Button Props ===== */

/* ===== Start Menu Props ===== */

export type MenuProps = {
  /**
   * A React component to be used as the icon for the menu item.
   */
  icon?: JSX.Element;
  /**
   * Header of the menu, can be either a string or a React component.
   */
  header?: JSX.Element | string;
  /**
   * sr: Screen reader text
   */
  sr?: string;
  className?: string;
  /**
   * buttonClassName: Additional class name to apply to the button
   * This will override the default class name if the custom class name conflicts with an existing class name
   */
  buttonClassName?: string;
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
   * @defaultValue `false`
   */
  horizontal?: boolean;
  /**
   * menus: Array of menu items
   *
   * Each menu item should be an object with the following properties:
   *
   * `label`: `optional` - The name of the menu item
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
   *
   * @example
   *
   * An example of a menu item:
   *
   * ```jsx
   * import { Menu } from '@fluid-design/fluid-ui';
   * import {
   *   BellIcon,
   *   CogIcon,
   *   ArrowRightOnRectangleIcon,
   *   UserIcon,
   * } from '@heroicons/react/24/outline';
   * function Example() {
   *   return (
   *     <Menu
   *       label={'Settings'}
   *       color='gray'
   *       weight='clear'
   *       iconStart={CogIcon}
   *       iconEndPosition='between'
   *       menuPositionY='bottom'
   *       header='Hi, User'
   *       className='absolute right-4 top-4'
   *       menus={[
   *         {
   *           label: 'Profile',
   *           icon: UserIcon,
   *         },
   *         {
   *           label: 'Notifications',
   *           role: 'info',
   *           icon: BellIcon,
   *         },
   *         {
   *           role: 'separator',
   *         },
   *         {
   *           label: 'Logout',
   *           role: 'destructive',
   *           icon: <ArrowRightOnRectangleIcon className='w-4 h-4' />,
   *           isLoading: true,
   *           disabled: true,
   *           loadingOptions: {
   *             animation: 'spin-large',
   *           },
   *           onClick: (e) => {
   *             e.preventDefault();
   *           },
   *         },
   *       ]}
   *     />
   *   );
   * }
   * ```
   */
  menus?: MenuItemProps<'button'>[];
} & ButtonProps<'button'>;

export type MenuComponent = (props: MenuProps) => React.ReactElement | null;

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
 * @defaultValue `default`
 */
export type MenuRoleProp =
  | 'separator'
  | 'destructive'
  | 'default'
  | 'info'
  | 'success'
  | 'warning';

export type MenuItemProps<C extends React.ElementType = 'button'> =
  PolymorphicComponentPropWithRef<
    C,
    {
      /**
       * sr: Screen reader text
       */
      sr?: string;
      role?: MenuRoleProp;
      label?: string;
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      [x: string]: any;
    }
  > &
    ButtonProps<C>;

export type MenuItemComponent = <C extends React.ElementType = 'button'>(
  props: MenuItemProps<C>
) => React.ReactElement | null;

/* ===== End Menu Props ===== */
/* ===== Start Select & ComboBox Props ===== */

export type DropdownProps = {
  /**
   * Screen reader text
   */
  sr?: string;
  name: string;
  list: DropdownListProps[];
  label?: string;
  labelClassName?: string;
  description?: FormProp['description'];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  listOptionClassName?: string;
  listOptionActiveClassName?: string;
  listOptionInactiveClassName?: string;
  /**
   * The key to use for the item in the list.
   *
   * Users will see this as the value.
   * @defaultValue `undefined`
   */
  itemKey?: string;
};

/**
 * DropdownListProps can be a string or an object
 *
 * If it is a string, it will be used as the value and the label
 *
 * If it is an object, you need to define the `itemKey` prop, which will be used as the value and the `label` prop, which will be used as the label
 */
export type DropdownListProps =
  | {
      id?: string;
      [x: string]: string | number | boolean | undefined;
    }
  | string;

export type SelectProps<C extends React.ElementType = 'div'> =
  PolymorphicComponentPropWithRef<C, {} & DropdownProps>;

export type SelectComponent = <C extends React.ElementType = 'div'>(
  props: SelectProps<C>
) => React.ReactElement | null;

export type ComboBoxProps<C extends React.ElementType = 'div'> =
  PolymorphicComponentPropWithRef<
    C,
    {
      inputClassName?: string;
    } & DropdownProps
  >;

export type ComboBoxComponent = <C extends React.ElementType = 'div'>(
  props: ComboBoxProps<C>
) => React.ReactElement | null;

/* ===== End Select & ComboBox Props ===== */
/* ===== Start Form Props ===== */

export interface FormProp {
  description:
    | string
    | React.ReactNode
    | {
        icon?: (props) => JSX.Element;
        text: string;
      };
}

/* ===== End Form Props ===== */
