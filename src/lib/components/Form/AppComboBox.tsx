import { Combobox } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { useMemo, useState } from 'react';
import clsxm from '../../helpers/clsxm';

import { HiCheck, HiSelector } from 'react-icons/hi';
import { FormProp } from '.';

function AppComboBox({
  name,
  list,
  description,
  placeholder,
  disabled,
  itemKey,
  ...props
}: {
  name: string;
  list: any[];
  description?: FormProp['description'];
  placeholder?: string;
  disabled?: boolean;
  /**
   * The key to use for the item in the list.
   * Users will see this as the value.
   * @default 'undefined'
   */
  itemKey?: string;
  [key: string]: any;
}) {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const error = touched[name] ? errors[name] : undefined;
  const label = placeholder
    ? placeholder
    : `${name[0].toUpperCase()}${name.slice(1)}`;
  const filteredList = useMemo(() => {
    if (query === '') {
      return list;
    }
    return list.filter(item => {
      const itemValue = itemKey ? item[itemKey] : item;
      return itemValue
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(query.toLowerCase().replace(/\s/g, ''));
    });
  }, [query, list, itemKey]);

  return (
    <Combobox
      as="div"
      value={values[name]}
      defaultValue={values[name]}
      disabled={disabled}
      onChange={e => {
        handleChange({ target: { type: 'text', name, value: e } });
      }}
      className="mb-4"
    >
      <Combobox.Label
        className={clsxm(
          'prefers-contrast:text-gray-90 text-sm font-medium text-gray-700 dark:text-gray-200',
          props.className
        )}
      >
        {label} {error && `(${error})`}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className={clsxm(
            'default-input py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'
          )}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => (!focused ? setFocused(true) : undefined)}
          onBlur={() => {
            setFieldTouched(name);
            setFocused(false);
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {list.length > 0 && (
          <Combobox.Options className="popover-panel absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 sm:text-sm">
            {filteredList.map(item => (
              <Combobox.Option
                key={`${name}-${itemKey ? item[itemKey] : item}-${item.id}`}
                value={item[itemKey]}
                className={({ active }) =>
                  clsxm(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-900 dark:text-gray-200'
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
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active
                            ? 'text-white'
                            : 'text-blue-600 dark:text-blue-400'
                        )}
                      >
                        <HiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
export default AppComboBox;
