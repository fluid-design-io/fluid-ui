import { SVGProps } from 'react';

export { getInputColor } from '../../helpers/styleGenerator/inputColor';
export { default as ComboBox } from './AppComboBox';
export { default as Form } from './AppForm';
export { default as FormItem } from './AppFormItem';
export { default as FormItemDescription } from './AppFormItemDescription';
export { default as SubmitButton } from './AppFormSubmitButton';
export { default as SubmitButtonRef } from './AppFormSubmitButtonRef';
export { default as Input } from './AppInput';
export { default as Label } from './AppLabel';
export { default as Select } from './AppSelect';
export { default as Switch } from './AppSwitch';
export { default as Textarea } from './AppTextarea';

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

export const baseOptionClassName = [
  'flex w-full items-center justify-start !border-x-transparent select-none',
  'ui-selected:btn-light-primary dark:ui-selected:btn-bold-primary',
  'ui-not-selected:ui-active:btn-light-primary/70',
  'dark:ui-not-selected:ui-active:btn-bold-primary/70',
  'ui-disabled:opacity-50 contrast:ui-disabled:opacity-70',
];
