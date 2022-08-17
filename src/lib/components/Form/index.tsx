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
  icon?: JSX.Element;
  badge?: string;
  header?: JSX.Element;
  menus: {
    label?: string;
    onClick?: () => void | Promise<boolean | void>;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    role?: 'separator' | 'destructive' | 'default' | 'info' | 'success' | 'warning';
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
