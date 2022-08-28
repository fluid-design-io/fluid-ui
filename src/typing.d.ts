/* ===== Start Polymorphic Props ===== */

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

export type ButtonLoadingOptionsAnimation = 'spin' | 'pulse' | 'ping';

export type ButtonComponent = <C extends React.ElementType = 'button'>(
  props: ButtonProps<C>
) => React.ReactElement | null;

/* ===== End Button Props ===== */

/* ===== Start Menu Props ===== */

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
  onClick?: () => any;
  icon?: JSX.Element | { (props: SVGProps<SVGSVGElement>): JSX.Element };
  [x: string]: any;
};

export type MenuItemComponent = <C extends React.ElementType = 'button'>(
  props: MenuItemProps<C>
) => React.ReactElement | null;
