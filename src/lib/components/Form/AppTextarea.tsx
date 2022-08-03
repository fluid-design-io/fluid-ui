import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { FormItem, FormProp, Label, getInputColor } from '.';
import clsxm from '../../helpers/clsxm';
import { useTheme } from '../FluidUI/ThemeContext';
function Textarea({
  name,
  minRows = 1,
  maxRows = 10,
  description,
  ...props
}: {
  name: string;
  minRows?: number;
  maxRows?: number;
  description?: FormProp['description'];
  [key: string]: any;
}) {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();
  const [focused, setFocused] = useState(false);
  const error = touched[name] ? errors[name] : undefined;
  const label = `${name[0].toUpperCase()}${name.slice(1)}`;

  const theme = useTheme().theme.form;
  return (
    <FormItem {...{ error, focused, description }}>
      <Label
        {...{ errors, error, focused, label, name, value: values[name] }}
      />
      <ReactTextareaAutosize
        {...props}
        rows={minRows}
        minRows={minRows}
        maxRows={maxRows}
        className={clsxm(
          theme.base,
          getInputColor({ error, className: props.className }),
          'pb-2 min-h-[3rem]'
        )}
        value={values[name]}
        placeholder={error ? label : undefined}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFieldTouched(name);
          setFocused(false);
        }}
        name={name}
      />
    </FormItem>
  );
}

export default Textarea;
