import { Listbox, Transition } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { Fragment, useState } from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';

import clsxm from '../../helpers/clsxm';
import { useFormValue } from '../../helpers/useFormValue';

import { useTheme } from '../FluidUI/ThemeContext';
import { FormItem, FormProp, getInputColor, Label } from './';

function AppList({
  name: rawName,
  label: rawLabel,
  list,
  description,
  placeholder,
  disabled,
  itemKey,
  ...props
}: {
  name: string;
  list: any[];
  label?: string;
  description?: FormProp['description'];
  placeholder?: string;
  disabled?: boolean;
  /**
   * The key to use for the item in the list.
   * Users will see this as the value.
   * defaultValue `undefined`
   */
  itemKey?: string;
  [key: string]: any;
}) {
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
      <Listbox
        as='div'
        className='mb-4 last:mb-0'
        defaultValue={value}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange({ target: { type: 'text', name: rawName, value: e } });
        }}
      >
        <Listbox.Label
          className={clsxm(
            'contrast:text-primary-90 text-sm font-medium text-primary-700 dark:text-primary-200',
            props.className
          )}
        >
          {label} {error && `(${error})`}
        </Listbox.Label>
        <div className='relative mt-1'>
          <Listbox.Button
            className={clsxm(
              theme.base,
              'relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm'
            )}
          >
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
              <Listbox.Options className='popover-panel absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 sm:text-sm'>
                {list.map((item, itemIdx) => (
                  <Listbox.Option
                    value={item[itemKey]}
                    className={({ active }) =>
                      clsxm(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active
                          ? 'bg-blue-600 text-white'
                          : 'bg-primary-800 text-primary-900 dark:text-primary-200'
                      )
                    }
                    key={`${rawName}-${itemKey ? item[itemKey] : item}-${
                      item.id
                    }`}
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
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active
                                ? 'text-white'
                                : 'text-blue-600 dark:text-blue-400'
                            )}
                          >
                            <HiCheck aria-hidden='true' className='h-5 w-5' />
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
      </Listbox>
    </FormItem>
  );
}

export default AppList;
