import { Listbox, Transition } from '@headlessui/react';
import { useFormikContext } from 'formik';
import React, { Fragment, useState } from 'react';
import { HiCheck, HiOutlineX, HiSelector } from 'react-icons/hi';
import { PolymorphicRef, SelectComponent, SelectProps } from '../../../type';

import { AnimatePresence, motion } from 'framer-motion';
import clsxm from '../../helpers/clsxm';
import {
  excludeClassName,
  excludeOnChangeClickBlurFocus,
} from '../../helpers/exclude';
import { useFormValue } from '../../helpers/useFormValue';
import { Button } from '../Button';

import { baseOptionClassName, FormItem } from '.';
import { useTheme } from '../FluidUI/ThemeContext';

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
    }: SelectProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';
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

    const getStringValue = (item: string | Record<string, any> | undefined) => {
      if (typeof item === 'string') {
        return item;
      }
      if (typeof item === 'object') {
        return item[itemKey || 'name' || 'id'];
      }
      return '';
    };
    return (
      <Listbox
        as={Component as any}
        className={clsxm('mb-4 last:mb-0', className)}
        defaultValue={value}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          handleChange({ target: { name: rawName, value: e } });
          userOnChange && userOnChange(e);
        }}
        multiple={!!multiple}
        {...theirProps}
      >
        <Fragment>
          <Listbox.Label
            className={clsxm(
              'contrast:text-gray-90 text-sm font-medium text-gray-700 dark:text-gray-200',
              labelClassName
            )}
          >
            {label}
          </Listbox.Label>
          <FormItem
            {...{ error, descriptionError: error, focused, description }}
          >
            <div className={clsxm(theme.base, 'relative mt-1', itemClassName)}>
              <div
                className={clsxm(
                  multiple && value?.length > 1 && selectedItemsClassName
                )}
              >
                {renderSelectedItem &&
                  multiple &&
                  value?.length > 1 &&
                  value.map((item: any) => (
                    <Fragment
                      key={`${rawName}-${getStringValue(item)}-selected`}
                    >
                      {renderSelectedItem({
                        item,
                        remove: () =>
                          handleChange({
                            target: {
                              name: rawName,
                              value: value.filter(
                                (v: any) => v !== item
                              ) as any,
                            },
                          }),
                      })}
                    </Fragment>
                  ))}
                <AnimatePresence>
                  {!renderSelectedItem && multiple && value?.length > 1 && (
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
                          multiple && value?.length > 1 && 'p-2'
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
                                transition: { duration: 0.35 },
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
              <div className='relative w-full'>
                <Listbox.Button
                  as='button'
                  className={clsxm(
                    theme.select.button,
                    'flex outline-none focus:outline-none',
                    multiple &&
                      value &&
                      value?.length > 1 &&
                      'border-t border-t-gray-200 dark:border-t-gray-700',
                    buttonClassName
                  )}
                  onBlur={() => {
                    setFocused(false);
                    userOnBlur && userOnBlur();
                  }}
                >
                  <div
                    className={clsxm(
                      'flex-1 truncate w-0',
                      !value && 'opacity-40 contrast:opacity-70',
                      multiple &&
                        value?.length === 0 &&
                        'opacity-40 contrast:opacity-70'
                    )}
                  >
                    {multiple
                      ? value?.length > 0
                        ? value.length === 1
                          ? getStringValue(value[0])
                          : `${value.length} selected`
                        : placeholder || 'Select an option'
                      : getStringValue(value) ||
                        placeholder ||
                        'Select an option'}
                  </div>
                  <span
                    className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 
                  rtl:left-0 rtl:right-auto rtl:pr-0 rtl:pl-2'
                  >
                    <HiSelector
                      aria-hidden='true'
                      className='h-5 w-5 text-gray-400'
                    />
                  </span>
                </Listbox.Button>
              </div>
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
                      <Listbox.Option
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
                      </Listbox.Option>
                    )}
                    {rednerOptionItem &&
                      list.map((item, i) => (
                        <Fragment key={`${rawName}-${i}`}>
                          {rednerOptionItem({ item, Option: Listbox.Option })}
                        </Fragment>
                      ))}
                    {!rednerOptionItem &&
                      list.map((item) => (
                        <Listbox.Option
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
