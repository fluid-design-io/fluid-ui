import React, { Dispatch, SetStateAction, SVGProps } from "react";
import { DeepPartial } from "./lib/helpers/deep-partial";

/* ===== Start Fluid Theme ===== */
export type CustomFluidTheme = DeepPartial<FluidTheme>;

export interface FluidTheme {
  accordion: {
    base: string;
    divider: string;
    content: {
      base: string;
    };
    header: {
      arrow: {
        base: string;
        open: FluidBoolean;
      };
      base: string;
      heading: string;
      open: FluidBoolean;
    };
  };
  button: {
    base: string;
    shape: FluidButtonShapes;
    color: FluidButtonColors;
    loading: FulidButtonLoadingOptions;
    iconOnly: FluidButtonShapes;
  };
  form: {
    base: string;
    select: {
      button: string;
    };
    popover: string;
  };
  tab: {
    base: string;
    shape: FluidButtonShapes;
    //@ts-ignore
    weight: Pick<FluidButtonWeights, TabProps["weight"]>;
    tabWrap: {
      base: string;
      //@ts-ignore
      active: Pick<FluidButtonWeights, TabProps["weight"]>;
      //@ts-ignore
      inactive: Pick<FluidButtonWeights, TabProps["weight"]>;
    };
    activeButton: {
      base: string;
      shape: {
        pill: string;
        round: string;
        square: string;
      };
      //@ts-ignore
      weight: Pick<FluidButtonWeights, TabProps["weight"]>;
    };
    panel: string;
  };
}

export interface FluidBoolean {
  off: string;
  on: string;
}

export interface FluidButtonColors {
  red: FluidButtonColorOptions;
  orange: FluidButtonColorOptions;
  amber: FluidButtonColorOptions;
  yellow: FluidButtonColorOptions;
  lime: FluidButtonColorOptions;
  green: FluidButtonColorOptions;
  emerald: FluidButtonColorOptions;
  teal: FluidButtonColorOptions;
  cyan: FluidButtonColorOptions;
  sky: FluidButtonColorOptions;
  blue: FluidButtonColorOptions;
  indigo: FluidButtonColorOptions;
  violet: FluidButtonColorOptions;
  purple: FluidButtonColorOptions;
  fuchsia: FluidButtonColorOptions;
  pink: FluidButtonColorOptions;
  rose: FluidButtonColorOptions;
  gray: FluidButtonColorOptions;
  slate: FluidButtonColorOptions;
  zinc: FluidButtonColorOptions;
  neutral: FluidButtonColorOptions;
  stone: FluidButtonColorOptions;
}

export interface FluidButtonColorOptions {
  weight: FluidButtonWeights;
}

export interface FulidButtonLoadingOptions {
  base: string;
  /**
   * The animation type to use when the button is loading.
   * @defaultValue `spin`
   * Options: `spin`, `pulse`, `ping`
   */
  animation: { [key in ButtonLoadingOptionsAnimation]: string };
  text: string;
}

export interface FluidButtonWeights {
  light: string;
  normal: string;
  bold: string;
  outline: string;
  /**
   * The initial state background color will be transparent.
   * When hovered or focused, it will show a light background color.
   */
  clear: string;
  /**
   * There will be no background color.
   */
  link: string;
}

export interface FluidButtonSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface FluidButtonShapes {
  pill: FluidButtonSizes;
  round: FluidButtonSizes;
  square: FluidButtonSizes;
}

export interface FluidColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  gray: string;
  green: string;
  indigo: string;
  lime: string;
  pink: string;
  red: string;
  teal: string;
  yellow: string;
  dark: string;
  light: string;
  purple: string;
}

export type FluidHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface FluidPositions {
  "bottom-left": string;
  "bottom-right": string;
  "bottom-center": string;
  "top-left": string;
  "top-center": string;
  "top-right": string;
  "center-left": string;
  center: string;
  "center-right": string;
}

export interface FluidSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}

/* ===== End Fluid Theme ===== */

/* ===== Start Polymorphic Props ===== */

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type AsProp<C extends React.ElementType> = {
  as?: C;
  /**
   * innerAs is used to pass a component to a component that is already wrapped in a styled component.
   * @defaultValue `as`
   */
  innerAs?: C;
};

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C>;
};

/* ===== End Polymorphic Props ===== */

/* ===== Start General Props */

export type SRProp = {
  /**
   * This prop is used to hide an element visually, but still make it available to screen readers.
   */
  sr?: string | undefined;
};

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
       *             50: 'rgb(var(--tw-color-gray-50) / <alpha-value>)',
       *             100: 'rgb(var(--tw-color-gray-100) / <alpha-value>)',
       *             200: 'rgb(var(--tw-color-gray-200) / <alpha-value>)',
       *             300: 'rgb(var(--tw-color-gray-300) / <alpha-value>)',
       *             400: 'rgb(var(--tw-color-gray-400) / <alpha-value>)',
       *             500: 'rgb(var(--tw-color-gray-500) / <alpha-value>)',
       *             600: 'rgb(var(--tw-color-gray-600) / <alpha-value>)',
       *             700: 'rgb(var(--tw-color-gray-700) / <alpha-value>)',
       *             800: 'rgb(var(--tw-color-gray-800) / <alpha-value>)',
       *             900: 'rgb(var(--tw-color-gray-900) / <alpha-value>)',
       *           },
       *         }
       *       },
       *     }
       *   }
       * ```
       */
      color?: keyof FluidButtonColors;
      size?: keyof FluidButtonSizes;
      /**
       * wieght: The appearance of the button.
       * @defaultValue `normal`
       *
       * @type {'light' | 'normal' | 'bold' | 'outline' | 'clear' | 'link'}
       */
      weight?: keyof FluidButtonWeights | "normal";
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
  | "spin"
  | "pulse"
  | "ping"
  | "spin-large";

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

export type ButtonComponent = <C extends React.ElementType = "button">(
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
  iconStartPosition?: "flex" | "between";
  /**
   * iconEndPosition: Position of the iconEnd
   * `flex` (default) or `between`
   * `between` will create a gap between the icon and the label
   */
  iconEndPosition?: "flex" | "between";
} & SRProp;

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
   * @defaultValue `start`
   */
  menuPositionX?: "start" | "center" | "end";
  /**
   * menuPositionY: Vertical position of the menu
   * @defaultValue `top`
   */
  menuPositionY?: "top" | "center" | "bottom";
  [x: string]: any;
  /**
   * Whether the menu should be rendered horizontally.
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
  menus?: MenuItemProps<"button">[];
} & ButtonProps<"button"> &
  SRProp;

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
  | "separator"
  | "destructive"
  | "default"
  | "info"
  | "success"
  | "warning"
  | "primary";

export type MenuItemProps<C extends React.ElementType = "button"> =
  PolymorphicComponentPropWithRef<
    C,
    {
      role?: MenuRoleProp;
      label?: string;
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      [x: string]: any;
    } & SRProp
  > &
    ButtonProps<C>;

export type MenuItemComponent = <C extends React.ElementType = "button">(
  props: MenuItemProps<C>
) => React.ReactElement | null;

/* ===== End Menu Props ===== */
/* ===== Start Select & ComboBox Props ===== */

export type DropdownProps = {
  name: string;
  list: DropdownListProps[];
  label?: string;
  labelClassName?: string;
  description?: FormProp["description"];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  selectedItemsClassName?: string;
  /**
   * Whether the dropdown has Empty Option
   * The returned value will be an empty string
   * @defaultValue `false`
   */
  hasEmptyOption?: boolean;
  /**
   * The text to display for the empty option
   * @defaultValue `Select an option`
   */
  emptyOptionText?: string;
  /**
   * The value of the empty option
   * @defaultValue `''`
   */
  emptyOptionValue?: string;
  itemClassName?: string;
  listClassName?: string;
  listOptionSelectedClassName?: string;
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
  /**
   * The key to determine disabled state of the item in the list.
   * @defaultValue `undefined`
   */
  disabledKey?: string;
  /**
   * Whether the dropdown is a multi-select
   * If true, it will be an unlimited multi-select
   * If a number, it will be a limited multi-select
   * @defaultValue `false`
   */
  multiple?: boolean | number;
  /**
   * Custom function to render the option item
   * @param item - The item string or object that is being rendered
   * @param Option - The component to use to render the item
   * The `Option` component exposes the following props:
   * - `active` - Whether the item is active (hovered)
   * - `selected` - Whether the item is selected
   * - `disabled` - Whether the item is disabled
   * You can use these props to style the item
   * @returns The rendered item
   * @example
   * ```jsx
   * <Select
   *  name='food'
   *  itemKey='name'
   *  list={food}
   *  rednerOptionItem={({ item, Option }) => (
   *    <Option
   *      value={item.name}
   *      className={({ active, selected, disabled }) =>
   *        clsxm(
   *          'flex flex-row justify-start items-center gap-2 px-2 py-1',
   *          'bg-white',
   *          active && 'bg-gray-100',
   *          selected && 'bg-blue-200',
   *          disabled && 'bg-gray-200'
   *        )
   *      }
   *      disabled={item.available === false}
   *    >
   *      {({ active, selected, disabled }) => (
   *        <>
   *          <div className='w-4 h-4'>
   *            {selected && '✓'}
   *            {disabled && '🚫'}
   *          </div>
   *          <div className='flex-grow'>{item.name}</div>
   *        </>
   *      )}
   *    </Option>
   * )}
   * />
   * ```
   */
  rednerOptionItem?: ({
    item,
    Option,
  }: {
    item: any;
    Option: any;
  }) => React.ReactNode;
  /**
   * Custom function to render the selected item
   * @param item - The item string or object that is being rendered
   * @param remove - The function to remove the item from the selected list
   * @returns The rendered item
   * @example
   * ```jsx
   * <Select
   *  name='food'
   *  itemKey='name'
   *  list={food}
   *  selectedItemsClassName='flex flex-wrap p-2 gap-2'
   *  renderSelectedItem={({ item, remove }) => (
   *      <button
   *        onClick={remove}
   *        className='flex flex-row justify-start items-center gap-2 px-2 py-1 bg-primary-200 rounded-full'
   *      >
   *        <div className='flex-grow text-sm'>{item.name}</div>
   *        <XMarkIcon className='w-4 h-4' />
   *       </button>
   *     )}
   * />
   * ```
   */
  renderSelectedItem?: ({
    item,
    remove,
  }: {
    item: any;
    remove: () => void;
  }) => React.ReactNode;
  /**
   * If you only want to customize the display value without
   * creating your own option item, you can use this function
   * @param item - The item string or object that is being rendered
   * @param active - Whether the item is active
   * @param selected - Whether the item is selected
   * @param disabled - Whether the item is disabled
   * @returns The rendered string or node
   * @example
   * ```jsx
   * <Select
   *  name='food'
   *  itemKey='name'
   *  list={food}
   *  renderDisplayValue={({ item, active, selected, disabled }) => (
   *  `${item.name} • ${item.calories} ${selected ? '✓' : ''} ${disabled ? '🚫' : ''}`
   * )}
   * />
   * ```
   */
  renderDisplayValue?: ({
    item,
    active,
    selected,
    disabled,
  }: {
    item: any;
    active: boolean;
    selected: boolean;
    disabled: boolean;
  }) => React.ReactNode;
} & SRProp;

/**
 * DropdownListProps can be a string or an object
 *
 * If it is a string, it will be used as the value and the label
 *
 * If it is an object, you need to define the `itemKey` prop, which will be used as the value and the `label` prop, which will be used as the label
 */
export type DropdownListProps = Record<string, any> | string;

export type SelectProps<C extends React.ElementType = "div"> =
  PolymorphicComponentPropWithRef<C, {} & DropdownProps>;

export type SelectComponent = <C extends React.ElementType = "div">(
  props: SelectProps<C>
) => React.ReactElement | null;

export type ComboBoxProps<C extends React.ElementType = "div"> =
  PolymorphicComponentPropWithRef<
    C,
    {
      inputClassName?: string;
    } & DropdownProps
  >;

export type ComboBoxComponent = <C extends React.ElementType = "div">(
  props: ComboBoxProps<C>
) => React.ReactElement | null;

/* ===== End Select & ComboBox Props ===== */
/* ===== Start Form Props ===== */

export interface FormProp {
  description:
    | string
    | React.ReactNode
    | {
        icon?: (props: any) => JSX.Element;
        text: string;
      };
}

/* ===== End Form Props ===== */
/* ===== Start Tab Props ===== */

export type TabItemProps = {
  title:
    | string
    | {
        text?: string;
        iconStart?: React.ReactNode | { (props: any): JSX.Element };
      };
  content: React.ReactNode;
};

export type TabListItemProps<C extends React.ElementType = "div"> =
  PolymorphicComponentPropWithRef<
    C,
    {
      /**
       * The id shared between the tab and the tab panel,
       * This is nessessary for framer motion shared layout
       */
      layoutId?: string;
      /**
       * The title of the tab
       * @defaultValue `undefined`
       */
      title?: TabItemProps["title"];
      shape?: keyof FluidButtonShapes;
      size?: keyof FluidButtonSizes;
      weight?:
        | keyof Pick<FluidButtonWeights, "normal" | "clear" | "light">
        | "normal";
      className?: string;
      tabClassName?: string;
      tabActiveClassName?: string;
      tabInactiveClassName?: string;
      children?: React.ReactNode;
    } & SRProp
  >;

export type TabListProps = {
  tabs?: TabItemProps[];
} & Omit<TabListItemProps, "layoutId">;

export type TabProps<C extends React.ElementType = "div"> =
  PolymorphicComponentPropWithRef<
    C,
    {
      defaultIndex?: number;
      selectedIndex?: number;
      onChange?: (index: number) => void | Dispatch<SetStateAction<number>>;
      vertical?: boolean;
      manual?: boolean;
    } & TabListProps
  >;

export type TabComponent = <C extends React.ElementType = "div">(
  props: TabProps<C>
) => React.ReactElement | null;
