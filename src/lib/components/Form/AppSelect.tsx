import { Listbox, Transition } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { Fragment, useState } from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { PolymorphicRef, SelectComponent, SelectProps } from '../../../type';

import clsxm from '../../helpers/clsxm';
import {
  excludeClassName,
  excludeOnChangeClickBlurFocus,
} from '../../helpers/exclude';
import { useFormValue } from '../../helpers/useFormValue';
import { Button } from '../Button';

import { useTheme } from '../FluidUI/ThemeContext';
import { FormItem } from '.';

const AppSelect: SelectComponent = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as,
      sr,
      name: rawName,
      label: rawLabel,
      list,
      listClassName,
      buttonClassName,
      labelClassName,
      listOptionActiveClassName,
      listOptionClassName,
      listOptionInactiveClassName,
      className,
      placeholder,
      description,
      disabled,
      itemKey,
      ...props
    }: SelectProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || FormItem;
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
    const userOnChange = props?.onChange,
      userOnBlur = props?.onBlur,
      userOnFocus = props?.onFocus;
    const cleanedProps = excludeOnChangeClickBlurFocus(props);

    const theme = useTheme().theme.form;
    const theirProps = excludeClassName(cleanedProps);
    return (
      <Listbox
        as={Component as any}
        className={clsxm('mb-4 last:mb-0', className)}
        defaultValue={value}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange({ target: { type: 'text', name: rawName, value: e } });
          userOnChange && userOnChange(e);
        }}
        {...theirProps}
      >
        <Fragment>
          <Listbox.Label
            className={clsxm(
              'contrast:text-primary-90 text-sm font-medium text-primary-700 dark:text-primary-200',
              labelClassName
            )}
          >
            {label} {error && `(${error})`}
          </Listbox.Label>
          <FormItem {...{ error, focused, description }}>
            <div className='relative mt-1'>
              <Listbox.Button
                onFocus={() => {
                  setFocused(true);
                  userOnFocus && userOnFocus();
                }}
                className={clsxm(
                  theme.base,
                  theme.select.button,
                  buttonClassName
                )}
                onBlur={() => {
                  setFocused(false);
                  setFieldTouched(rawName);
                  userOnBlur && userOnBlur();
                }}
              >
                {sr && <span className='sr-only'>{sr}</span>}
                <span className='block truncate'>{value}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <HiSelector
                    aria-hidden='true'
                    className='h-5 w-5 text-gray-400'
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                {list.length > 0 && (
                  <Listbox.Options
                    className={clsxm(
                      theme.popover,
                      'absolute overflow-auto mt-2 py-1 sm:text-sm',
                      listClassName
                    )}
                  >
                    {list.map((item, itemIdx) => (
                      <Listbox.Option
                        as={Button}
                        innerAs='li'
                        key={`${rawName}-${itemKey ? item[itemKey] : item}`}
                        shape='square'
                        value={item[itemKey]}
                        className={({ active, selected }) =>
                          clsxm(
                            'flex w-full items-center justify-start !border-x-transparent select-none',
                            selected
                              ? 'btn-light-blue'
                              : active
                              ? ['btn-clear-blue', listOptionActiveClassName]
                              : [
                                  'btn-clear-stone',
                                  listOptionInactiveClassName,
                                ],

                            listOptionClassName
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={clsxm(
                                'block truncate',
                                selected && 'font-semibold'
                              )}
                            >
                              {item[itemKey]}
                            </span>

                            {selected && (
                              <span
                                className={clsxm(
                                  'absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-4'
                                )}
                              >
                                <HiCheck
                                  aria-hidden='true'
                                  className='h-5 w-5'
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </Transition>
            </div>
          </FormItem>
        </Fragment>
      </Listbox>
    );
  }
);

export default AppSelect;
