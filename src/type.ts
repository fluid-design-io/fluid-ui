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
      loadingOptions?: {
        animation?: ButtonLoadingOptionsAnimation;
        text?: string;
      };
      children?: React.ReactNode;
      // [key: string]: any;
    }
  >;

export type ButtonLoadingOptionsAnimation =
  | 'spin'
  | 'pulse'
  | 'ping'
  | 'spin-large';

export type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

/* ===== End Button Props ===== */

/* ===== Start Menu Props ===== */

export type MenuProps = {
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
   * @defaultValue `false`
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
  menus?: MenuItemProps[];
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

export type MenuItemProps = {
  /**
   * sr: Screen reader text
   */
  sr?: string;
  role?: MenuRoleProp;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: JSX.Element | { (props: SVGProps<SVGSVGElement>): JSX.Element };
  [x: string]: any;
};

export type MenuItemComponentProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, MenuItemProps>;

export type MenuItemComponent = <C extends React.ElementType = 'button'>(
  props: MenuItemComponentProps<C>
) => React.ReactElement | null;
