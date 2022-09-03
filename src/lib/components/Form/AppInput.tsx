import { useFormikContext } from 'formik';
import React, { useState } from 'react';

import clsxm from '../../helpers/clsxm';
import { useFormValue } from '../../helpers/useFormValue';

import { useTheme } from '../FluidUI/ThemeContext';
import { FormItem, FormProp, getInputColor, Label } from './';
function AppInput({
  name: rawName,
  label: rawLabel,
  placeholder = undefined,
  description,
  ...props
}: {
  name: string;
  label?: string;
  placeholder?: string;
  description?: FormProp['description'];
  [key: string]: any;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
  const [focused, setFocused] = useState(false);
  const { name, value, label, error } = useFormValue({
    rawName,
    rawLabel,
    values,
    errors,
    touched,
    placeholder,
  });

  const theme = useTheme().theme.form;
  return (
    <FormItem {...{ error, focused, description }}>
      <Label {...{ errors, error, focused, label, name, value }} />
      <input
        name={rawName}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        placeholder={error ? label : undefined}
        value={value}
        className={clsxm(
          theme.base,
          getInputColor({ error, className: props.className })
        )}
        onBlur={() => {
          setFieldTouched(rawName);
          setFocused(false);
        }}
        {...props}
      />
    </FormItem>
  );
}

export default AppInput;
