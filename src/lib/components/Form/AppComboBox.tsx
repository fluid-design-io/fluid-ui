import { Combobox, Transition } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { Fragment, useMemo, useState } from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';

import clsxm from '../../helpers/clsxm';

import { FormProp } from '.';
import { useFormValue } from '../../helpers/useFormValue';
import { useTheme } from '../FluidUI/ThemeContext';

function AppComboBox({
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
  return (
    <Combobox
      as='div'
      className='mb-4 last:mb-0'
      defaultValue={value}
      disabled={disabled}
      value={value}
      onChange={(e) => {
        handleChange({ target: { type: 'text', name: rawName, value: e } });
      }}
    >
      <Combobox.Label
        className={clsxm(
          'contrast:text-primary-90 text-sm font-medium text-primary-700 dark:text-primary-200',
          props.className
        )}
      >
        {label} {error && `(${error})`}
      </Combobox.Label>
      <div className='relative mt-1'>
        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => (!focused ? setFocused(true) : undefined)}
          value={query}
          className={clsxm(
            theme.base,
            'py-2 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm'
          )}
          onBlur={() => {
            setFieldTouched(rawName);
            setFocused(false);
          }}
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <HiSelector aria-hidden='true' className='h-5 w-5 text-primary-400' />
        </Combobox.Button>

        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {list.length > 0 && (
            <Combobox.Options className='popover-panel absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 sm:text-sm'>
              {filteredList.map((item) => (
                <Combobox.Option
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
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Transition>
      </div>
    </Combobox>
  );
}
export default AppComboBox;
