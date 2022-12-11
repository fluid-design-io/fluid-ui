import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { ComponentProps, FC, PropsWithChildren, useRef } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import clsxm from '../../helpers/clsxm';

import { excludeClassName } from '../../helpers/exclude';
import { useTheme } from '../FluidUI/ThemeContext';
import { useAccordionContext } from './AccordionContext';

export interface AccordionPanelProps
  extends PropsWithChildren<ComponentProps<'div'>> {
  /**
   * The panel header.
   * @defaultValue `undefined`
   */
  header?: string | React.ReactNode;
  iconStart?: FC<ComponentProps<'svg'>>;
  iconEnd?: FC<ComponentProps<'svg'>>;
  /**
   * The inherited index of the panel to be expanded.
   * @defaultValue `undefined`
   * @internal
   * @remarks
   * This prop is used internally to expand a panel when the `panelIndex` prop is set.
   */
  panelIndex?: number | undefined;
}

export const AccordionPanel: FC<AccordionPanelProps> = ({
  children,
  header,
  iconStart: HeaderIcon,
  iconEnd: ArrowIcon = HiChevronDown,
  panelIndex,
  ...props
}): JSX.Element => {
  const { defaultIndex, multiple, expandedIndex, onToggle } =
    useAccordionContext();
  const shouldReduceMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const theirProps = excludeClassName(props);
  const theme = useTheme().theme.accordion.header;

  const ListPanel = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      animate='open'
      className='overflow-hidden !mt-0 mx-4'
      exit='collapsed'
      initial='collapsed'
      transition={{
        type: 'spring',
        bounce: 0,
        duration: shouldReduceMotion ? 0.2 : 0.5,
      }}
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: {
          opacity: 0,
          height: shouldReduceMotion ? 'auto' : 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
  const isExpanded =
    typeof defaultIndex === 'number'
      ? defaultIndex === panelIndex
      : Array.isArray(defaultIndex)
      ? defaultIndex.includes(panelIndex)
      : undefined;
  return (
    <Disclosure
      as='div'
      className={clsxm('space-y-1', props?.className)}
      defaultOpen={isExpanded}
      {...theirProps}
    >
      {({ open, close }) => {
        if (!multiple && expandedIndex !== panelIndex && open) {
          close();
        }
        return (
          <>
            <Disclosure.Button
              aria-live='assertive'
              as='button'
              className={clsxm(theme.base, open && theme.open.on)}
              ref={buttonRef}
              onClick={(e) => {
                onToggle(open, panelIndex, e);
              }}
              onTouchEnd={(e) => {
                onToggle(open, panelIndex, e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onToggle(open, panelIndex, e);
                }
              }}
            >
              {typeof header === 'string' ? (
                <p className='flex items-center gap-2'>
                  {HeaderIcon && (
                    <HeaderIcon
                      aria-hidden='true'
                      className='flex-shrink-0 w-4 h-4'
                    />
                  )}
                  {header}
                </p>
              ) : (
                header
              )}
              <span className='rtl:block hidden'>
                <ArrowIcon
                  className={clsxm(
                    theme.arrow.base,
                    open ? theme.arrow.open.on : theme.arrow.open.off
                  )}
                />
              </span>
              <span className='rtl:hidden block'>
                <ArrowIcon
                  className={clsxm(
                    theme.arrow.base,
                    open ? theme.arrow.open.on : theme.arrow.open.off
                  )}
                />
              </span>
            </Disclosure.Button>
            <AnimatePresence>
              {open && (
                <Disclosure.Panel as={ListPanel} static>
                  {children}
                </Disclosure.Panel>
              )}
            </AnimatePresence>
          </>
        );
      }}
    </Disclosure>
  );
};
