import { Switch } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';

import clsxm from '../../helpers/clsxm';

import { FormItem, FormProp } from '.';
import { excludeOnChangeClickBlurFocus } from '../../helpers/exclude';
import { useFormValue } from '../../helpers/useFormValue';

function AppSwitch({
  name: rawName,
  description,
  placeholder,
  label: rawLabel,
  className,
  activeClassName,
  inactiveClassName,
  labelClassName,
  toggleClassName,
  toggleActiveClassName,
  toggleInactiveClassName,
  ...props
}: {
  name: string;
  description?: FormProp['description'];
  placeholder?: string;
  label?: string;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  labelClassName?: string;
  toggleClassName?: string;
  toggleActiveClassName?: string;
  toggleInactiveClassName?: string;
  [key: string]: any;
}) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
  const [focused, setFocused] = useState(false);
  const { value, error, label } = useFormValue({
    rawName,
    rawLabel,
    values,
    errors,
    touched,
    placeholder,
  });
  const userOnChange = props?.onChange,
    userOnBlur = props?.onBlur,
    userOnFocus = props?.onFocus;
  const cleanedProps = excludeOnChangeClickBlurFocus(props);
  return (
    <Switch.Group
      as={FormItem}
      className={clsxm(
        'flex items-center justify-between text-start last:mb-0 !ring-0',
        className
      )}
      {...{ error, focused, description }}
    >
      <span className='flex flex-grow flex-col'>
        <Switch.Label
          as='span'
          passive
          className={clsxm(
            'text-sm font-medium text-primary-700 dark:text-primary-200 contrast:text-primary-900',
            labelClassName
          )}
        >
          {label} {error && `(${error})`}
        </Switch.Label>
      </span>
      <Switch
        checked={value}
        className={clsxm(
          'default-focus-visible relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          'contrast:contrast-ring focus-ring',
          value
            ? [activeClassName ? activeClassName : 'bg-blue-600']
            : [
                inactiveClassName
                  ? inactiveClassName
                  : 'bg-primary-200 dark:bg-primary-700',
              ]
        )}
        onBlur={() => {
          setFieldTouched(rawName);
          setFocused(false);
          userOnBlur && userOnBlur();
        }}
        onChange={(e) => {
          handleChange({
            target: { type: 'checkbox', name: rawName, checked: e },
          });
          userOnChange && userOnChange(e);
        }}
        onFocus={() => {
          !focused && setFocused(true);
          userOnFocus && userOnFocus();
        }}
        {...cleanedProps}
      >
        <span
          aria-hidden='true'
          className={clsxm(
            value ? 'translate-x-5 rtl:!-translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            'contrast:contrast-ring contrast:ring-inset',
            toggleClassName,
            value ? toggleActiveClassName : toggleInactiveClassName
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
export default AppSwitch;
