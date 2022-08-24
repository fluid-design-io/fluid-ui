import { SVGProps } from 'react';

export { default as ComboBox } from './AppComboBox';
export { default as Form } from './AppForm';
export { default as FormItem } from './AppFormItem';
export { default as FormItemDescription } from './AppFormItemDescription';
export { default as SubmitButton } from './AppFormSubmitButton';
export { default as SubmitButtonRef } from './AppFormSubmitButtonRef';
export { default as Input } from './AppInput';
export { default as Label } from './AppLabel';
export { default as Menu } from './AppMenu';
export { default as Switch } from './AppSwitch';
export { default as Textarea } from './AppTextarea';
export { getInputColor } from '../../helpers/styleGenerator/inputColor';

export interface FormProp {
  description:
    | string
    | React.ReactNode
    | {
        icon?: (props) => JSX.Element;
        text: string;
      };
}
export interface DashboardNavProps {
  children?: {
    isCurrent: boolean;
    name: string;
    href: string;
  }[];
  name: string;
  href: string;
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  isCurrent?: boolean;
  count?: number;
  isOpen?: boolean;
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
   * Header of the menu
   */
  header?: JSX.Element;
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
   * menus: Array of menu items
   * Each menu item should be an object with the following properties:
   * `label`: The name of the menu item
   * `href`: `optional` - The URL of the menu item
   * `icon`: `optional` - A React component or a function that returns a React component to be used as the icon for the menu item
   * `role`: `optional` - The role of the menu item
   * `onClick`: `optional` - A function to be called when the menu item is clicked
   * `props`: `optional` - Any additional props to be passed to the menu item
   */
  menus: {
    /**
     * sr: Screen reader text
     */
    sr?: string;
    label?: string;
    onClick?: () => any;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element | JSX.Element;
    role?: 'separator' | 'destructive' | 'default' | 'info' | 'success' | 'warning';
    [x: string]: any;
  }[];
}
export interface PopoverProps {
  // Either provide a label or icon
  label?: string;
  icon?: JSX.Element;
  badge?: string;
  header?: JSX.Element;
  menus: {
    label: string;
    onClick: () => void | Promise<boolean | void>;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
}
