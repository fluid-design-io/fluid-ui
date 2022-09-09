import { Tab as HeadlessTab } from '@headlessui/react';
import { motion } from 'framer-motion';
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
  tabActiveClassName,
  tabClassName,
  tabInactiveClassName,
}: TabListItemProps) => {
  const theme = useTheme().theme.tab;
  return (
    <HeadlessTab
      as={Button}
      innerAs={innerAs}
      shape={shape}
      size={size}
      className={({ selected }) =>
        clsxm(
          theme.tabWrap.base,
          tabClassName,
          selected
            ? [theme.tabWrap.active[weight], tabActiveClassName]
            : [theme.tabWrap.inactive[weight], tabInactiveClassName]
        )
      }
    >
      {({ selected }) => (
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
              }}
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
