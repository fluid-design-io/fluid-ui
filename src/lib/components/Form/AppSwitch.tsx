import { Switch } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { FormProp } from '.';
import clsxm from '../../helpers/clsxm';

function AppSwitch({
  name,
  description,
  placeholder,
  ...props
}: {
  name: string;
  description?: FormProp['description'];
  placeholder?: string;
  [key: string]: any;
}) {
  const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();
  const [focused, setFocused] = useState(false);
  const error = touched[name] ? errors[name] : undefined;
  const label = props?.label ? props.label : placeholder ? placeholder : `${name[0].toUpperCase()}${name.slice(1)}`;
  return (
    <Switch.Group as="div" className={clsxm('mb-4 flex items-center justify-between text-left')}>
      <span className="flex flex-grow flex-col">
        <Switch.Label
          as="span"
          className="text-sm font-medium text-stone-700 dark:text-stone-200 contrast:text-stone-900"
          passive
        >
          {label} {error && `(${error})`}
        </Switch.Label>
      </span>
      <Switch
        checked={values[name]}
        onChange={(e) => handleChange({ target: { type: 'checkbox', name, checked: e } })}
        onFocus={() => (!focused ? setFocused(true) : undefined)}
        onBlur={() => {
          setFieldTouched(name);
          setFocused(false);
        }}
        className={clsxm(
          values[name] ? 'bg-blue-600' : 'bg-stone-200 dark:bg-stone-700',
          'default-focus relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out  focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={clsxm(
            values[name] ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
export default AppSwitch;
