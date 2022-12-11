import { Combobox, Transition } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { Fragment, useMemo, useState } from 'react';
import { HiCheck, HiOutlineX, HiSelector } from 'react-icons/hi';

import clsxm from '../../helpers/clsxm';

import { AnimatePresence, motion } from 'framer-motion';
import { baseOptionClassName } from '.';
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
      inputClassName,
      buttonClassName,
      labelClassName,
      itemClassName,
      listOptionSelectedClassName,
      listOptionActiveClassName,
      listOptionClassName,
      listOptionInactiveClassName,
      selectedItemsClassName,
      className,
      placeholder,
      description,
      disabled,
      disabledKey,
      itemKey,
      hasEmptyOption,
      emptyOptionText,
      emptyOptionValue,
      multiple,
      rednerOptionItem,
      renderSelectedItem,
      ...props
    }: ComboBoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';
    const { setFieldTouched, handleChange, errors, touched, values } =
      useFormikContext();
    const [focused, setFocused] = useState(false);
    const { value, label, error } = useFormValue({
      rawName,
      rawLabel,
      values,
      errors,
      touched,
      placeholder,
    });
    const getStringValue = (item: string | Record<string, any> | undefined) => {
      if (typeof item === 'string') {
        return item;
      }
      if (typeof item === 'object') {
        return item[itemKey || 'name' || 'id'];
      }
      return '';
    };
    const [query, setQuery] = useState(getStringValue(value) || '');
    const filteredList = useMemo(() => {
      if (query === '') {
        return list;
      }
      return list.filter((item) => {
        const itemValue = getStringValue(item);
        return itemValue
          .toLowerCase()
          .replace(/\s/g, '')
          .includes(query.toLowerCase().replace(/\s/g, ''));
      });
    }, [query, list, itemKey]);
    const theme = useTheme().theme.form;

    const userOnChange = props?.onChange,
      userOnBlur = props?.onBlur,
      userOnFocus = props?.onFocus;
    const theirProps = excludeClassName(props);

    return (
      <Combobox
        as={Component as any}
        className={clsxm('mb-4 last:mb-0', className)}
        defaultValue={value}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange({ target: { name: rawName, value: e } });
          userOnChange && userOnChange(e);
          !multiple && setQuery(getStringValue(e));
        }}
        multiple={!!multiple as any}
        {...theirProps}
      >
        <Combobox.Label
          className={clsxm(
            'contrast:text-gray-90 text-sm font-medium text-gray-700 dark:text-gray-200',
            labelClassName
          )}
        >
          {label}
        </Combobox.Label>

        <FormItem {...{ error, descriptionError: error, focused, description }}>
          <div className={clsxm(theme.base, 'relative mt-1', itemClassName)}>
            <div
              className={clsxm(
                multiple && value?.length > 0 && selectedItemsClassName
              )}
            >
              {renderSelectedItem &&
                multiple &&
                value?.length > 0 &&
                value.map((item: any) => (
                  <Fragment key={`${rawName}-${getStringValue(item)}-selected`}>
                    {renderSelectedItem({
                      item,
                      remove: () =>
                        handleChange({
                          target: {
                            name: rawName,
                            value: value.filter((v: any) => v !== item) as any,
                          },
                        }),
                    })}
                  </Fragment>
                ))}
              <AnimatePresence>
                {!renderSelectedItem && multiple && value?.length > 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      type: 'spring',
                      bounce: 0,
                      duration: 0.38,
                    }}
                  >
                    <div
                      className={clsxm(
                        multiple && 'flex flex-wrap gap-2',
                        multiple && value?.length > 0 && 'p-2'
                      )}
                    >
                      <AnimatePresence mode='popLayout'>
                        {value.map((v: any) => (
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.92,
                              filter: 'blur(0px)',
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              filter: 'blur(0px)',
                            }}
                            exit={{
                              opacity: 0,
                              filter: 'blur(5px)',
                              transition: { duration: 0.15, delay: 0.05 },
                            }}
                            transition={{
                              type: 'spring',
                              bounce: 0,
                              duration: 0.25,
                            }}
                            key={`${rawName}-selected-${getStringValue(v)}`}
                            layoutId={`${rawName}-selected-${getStringValue(
                              v
                            )}`}
                          >
                            <Button
                              as={motion.button}
                              weight='light'
                              color='gray'
                              size='xs'
                              label={getStringValue(v)}
                              iconEnd={HiOutlineX}
                              iconClassName='text-gray-400 dark:text-gray-600'
                              onClick={() => {
                                const newValue = value.filter(
                                  (item: any) => item !== v
                                ) as any;
                                handleChange({
                                  target: {
                                    type: 'text',
                                    name: rawName,
                                    value: newValue,
                                  },
                                });
                              }}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className={clsxm(
                'relative w-full',
                multiple &&
                  value &&
                  value?.length > 0 &&
                  'border-t border-t-gray-200 dark:border-t-gray-700'
              )}
            >
              <Combobox.Input
                className={clsxm(
                  'bg-transparent outline-none focus:outline-none',
                  theme.select.button,
                  inputClassName
                )}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => (!focused ? setFocused(true) : undefined)}
                value={query}
                placeholder={placeholder || 'Type to search...'}
                onBlur={() => {
                  setFieldTouched(rawName);
                  setFocused(false);
                }}
              />
              <Combobox.Button
                className={clsxm(
                  'absolute inset-y-0 right-0 flex items-center pr-2 hocus:opacity-80',
                  'rtl:left-0 rtl:right-auto rtl:pr-0 rtl:pl-2',
                  buttonClassName
                )}
                onBlur={() => {
                  setFieldTouched(rawName);
                  setFocused(false);
                }}
              >
                {sr && <span className='sr-only'>{sr}</span>}
                <HiSelector
                  aria-hidden='true'
                  className='h-5 w-5 text-gray-400'
                />
              </Combobox.Button>
            </div>
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
                    multiple && 'top-full',
                    listClassName
                  )}
                  onBlur={() => {
                    setFocused(false);
                    userOnBlur && userOnBlur();
                    // eslint-disable-next-line no-undef
                    setTimeout(() => {
                      setFieldTouched(rawName);
                    }, 300);
                  }}
                  onFocus={() => {
                    setFocused(true);
                    userOnFocus && userOnFocus();
                  }}
                >
                  {hasEmptyOption && (
                    <Combobox.Option
                      as={Button}
                      innerAs='li'
                      key={`${rawName}-empty`}
                      shape='square'
                      value={emptyOptionValue || ''}
                      className={clsxm(baseOptionClassName)}
                    >
                      <span className='block truncate'>
                        {emptyOptionText || 'None'}
                      </span>
                    </Combobox.Option>
                  )}

                  {rednerOptionItem &&
                    list.map((item, i) => (
                      <Fragment key={`${rawName}-${i}`}>
                        {rednerOptionItem({ item, Option: Combobox.Option })}
                      </Fragment>
                    ))}
                  {filteredList.map((item) => (
                    <Combobox.Option
                      as={Button}
                      innerAs='li'
                      key={`${rawName}-${getStringValue(item)}`}
                      shape='square'
                      value={item}
                      className={({ active, selected }) =>
                        clsxm(
                          baseOptionClassName,
                          selected
                            ? [listOptionSelectedClassName]
                            : active
                            ? [listOptionActiveClassName]
                            : [listOptionInactiveClassName],
                          listOptionClassName
                        )
                      }
                      disabled={
                        (disabledKey && item[disabledKey]) ||
                        (typeof multiple === 'number' &&
                          value.length >= multiple &&
                          !value.includes(item))
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={clsxm(
                              'block truncate',
                              selected && 'font-medium'
                            )}
                          >
                            {getStringValue(item)}
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
