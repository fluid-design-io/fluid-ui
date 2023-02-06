import { Tab as HeadlessTab } from '@headlessui/react';
import { motion, useReducedMotion } from 'framer-motion';
import React, { Fragment } from 'react';
import { TabListItemProps } from '../../../type';
import clsxm from '../../helpers/clsxm';
import { Button } from '../Button';
import { useTheme } from '../FluidUI/ThemeContext';

export const TabListItem = ({
  layoutId,
  as,
  title,
  shape = 'round',
  weight = 'normal',
  size = 'md',
  innerAs = as,
  children,
  tabClassName,
  tabActiveClassName,
  tabInactiveClassName,
}: TabListItemProps): React.ReactElement => {
  const theme = useTheme().theme.tab;
  const shouldReduceMotion = useReducedMotion();
  const buttonProps = innerAs
    ? {}
    : {
        shape,
        weight,
        size,
      };
  return (
    <HeadlessTab
      as={innerAs || Button}
      className={({ selected }): string =>
        clsxm(
          'flex-1',
          [theme.tabWrap.base, tabClassName],
          selected
            ? [theme.tabWrap.active[weight], tabActiveClassName]
            : [theme.tabWrap.inactive[weight], tabInactiveClassName]
        )
      }
      {...buttonProps}
    >
      {({ selected }: { selected: boolean }): React.ReactElement => (
        <Fragment>
          {selected && (
            <motion.div
              layoutId={`tab-bar-${layoutId}`}
              tabIndex={-1}
              className={clsxm(
                theme.activeButton.base,
                theme.activeButton.weight[weight]
              )}
              initial={{
                borderRadius: theme.activeButton.shape[shape],
                opacity: shouldReduceMotion ? 0 : 1,
              }}
              animate={{
                opacity: shouldReduceMotion ? 1 : 1,
              }}
              exit={{
                opacity: shouldReduceMotion ? 1 : 0,
              }}
              aria-hidden='true'
            />
          )}
          <span className='z-[1]'>
            {children
              ? children
              : typeof title === 'string'
              ? title
              : title.text}
          </span>
        </Fragment>
      )}
    </HeadlessTab>
  );
};
