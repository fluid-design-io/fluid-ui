import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import clsxm from '../../helpers/clsxm';

import { FormItem, FormProp, getInputColor, Label } from '.';
import { useFormValue } from '../../helpers/useFormValue';
import { useTheme } from '../FluidUI/ThemeContext';

const Textarea = ({
  name: rawName,
  label: rawLabel,
  placeholder = undefined,
  minRows = 1,
  maxRows = 10,
  description,
  ...props
}: {
  name: string;
  label?: string;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  description?: FormProp['description'];
  [key: string]: any;
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
  const [focused, setFocused] = useState(false);
  const { name, value, error, label } = useFormValue({
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
      <ReactTextareaAutosize
        {...props}
        maxRows={maxRows}
        minRows={minRows}
        name={rawName}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        placeholder={error ? label : undefined}
        rows={minRows}
        value={value}
        className={clsxm(
          theme.base,
          getInputColor({ error, className: props.className }),
          'min-h-[3rem] pb-2'
        )}
        onBlur={() => {
          setFieldTouched(rawName);
          setFocused(false);
        }}
      />
    </FormItem>
  );
};

export default Textarea;
