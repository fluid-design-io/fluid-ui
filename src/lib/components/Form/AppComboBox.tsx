import { Combobox, Transition } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { Fragment, useMemo, useState } from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';

import clsxm from '../../helpers/clsxm';

import {
  ComboBoxComponent,
  ComboBoxProps,
  PolymorphicRef,
} from '../../../type';
import { excludeClassName } from '../../helpers/exclude';
import { useFormValue } from '../../helpers/useFormValue';
import { Button } from '../Button';
import { useTheme } from '../FluidUI/ThemeContext';
import FormItem from './AppFormItem';

const AppComboBox: ComboBoxComponent = React.forwardRef(
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
      inputClassName,
      className,
      placeholder,
      description,
      disabled,
      itemKey,
      ...props
    }: ComboBoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || FormItem;
    const { setFieldTouched, handleChange, errors, touched, values } =
      useFormikContext();
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const { value, label, error } = useFormValue({
      rawName,
      rawLabel,
      values,
      errors,
      touched,
      placeholder,
    });
    const filteredList = useMemo(() => {
      if (query === '') {
        return list;
      }
      return list.filter((item) => {
        const itemValue = itemKey ? item[itemKey] : item;
        return itemValue
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(query.toLowerCase().replace(/\s/g, ''));
      });
    }, [query, list, itemKey]);
    const theme = useTheme().theme.form;
    const theirProps = excludeClassName(props);
    return (
      <Combobox
        as={Component as any}
        className={clsxm('mb-4 last:mb-0', className)}
        defaultValue={value}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange({ target: { type: 'text', name: rawName, value: e } });
        }}
        {...theirProps}
      >
        <Combobox.Label
          className={clsxm(
            'contrast:text-gray-90 text-sm font-medium text-gray-700 dark:text-gray-200',
            props.className
          )}
        >
          {label} {error && `(${error})`}
        </Combobox.Label>

        <FormItem {...{ error, focused, description }}>
          <div className='relative mt-1'>
            <Combobox.Input
              className={clsxm(theme.base, theme.select.button, inputClassName)}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => (!focused ? setFocused(true) : undefined)}
              value={query}
              onBlur={() => {
                setFieldTouched(rawName);
                setFocused(false);
              }}
            />
            <Combobox.Button
              className={clsxm(
                'absolute inset-y-0 right-0 flex items-center pr-2 hocus:opacity-80',
                buttonClassName
              )}
            >
              {sr && <span className='sr-only'>{sr}</span>}
              <HiSelector
                aria-hidden='true'
                className='h-5 w-5 text-gray-400'
              />
            </Combobox.Button>

            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              {list.length > 0 && (
                <Combobox.Options
                  className={clsxm(
                    theme.popover,
                    'absolute overflow-auto mt-2 py-1 sm:text-sm',
                    listClassName
                  )}
                >
                  {filteredList.map((item) => (
                    <Combobox.Option
                      as={Button}
                      innerAs='li'
                      key={`${rawName}-${itemKey ? item[itemKey] : item}`}
                      shape='square'
                      value={item[itemKey]}
                      className={({ active, selected }) =>
                        clsxm(
                          'flex w-full items-center justify-start !border-x-transparent select-none',
                          selected
                            ? 'btn-light-primary'
                            : active
                            ? ['btn-clear-primary', listOptionActiveClassName]
                            : ['btn-clear-stone', listOptionInactiveClassName],

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
                              <HiCheck aria-hidden='true' className='h-5 w-5' />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </Transition>
          </div>
        </FormItem>
      </Combobox>
    );
  }
);
export default AppComboBox;
