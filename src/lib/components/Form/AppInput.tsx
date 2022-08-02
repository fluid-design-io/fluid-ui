import { useFormikContext } from 'formik';
import React, { useState } from 'react';

import { FormItem, FormProp, Label, getInputColor } from './';
function AppInput({
  name,
  placeholder = undefined,
  description,
  ...props
}: {
  name: string;
  placeholder?: string;
  description?: FormProp['description'];
  [key: string]: any;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();
  const [focused, setFocused] = useState(false);
  const error = touched[name] ? errors[name] : undefined;
  const label = placeholder
    ? placeholder
    : `${name[0].toUpperCase()}${name.slice(1)}`;
  return (
    <FormItem {...{ error, focused, description }}>
      <Label
        {...{ errors, error, focused, label, name, value: values[name] }}
      />
      <input
        className={getInputColor({ error, className: props.className })}
        value={values[name]}
        placeholder={error ? label : undefined}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFieldTouched(name);
          setFocused(false);
        }}
        name={name}
        {...props}
      />
    </FormItem>
  );
}

export default AppInput;
