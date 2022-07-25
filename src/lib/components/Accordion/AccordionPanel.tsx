import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { ComponentProps, FC, PropsWithChildren } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import clsxm from '../../helpers/clsxm';
import { excludeClassName } from '../../helpers/exclude';
import { useTheme } from '../FluidUI/ThemeContext';

export interface AccordionPanelProps
  extends PropsWithChildren<ComponentProps<'div'>> {
  isOpen?: boolean;
  header?: string | React.ReactNode;
  headerIcon?: FC<ComponentProps<'svg'>>;
  arrowIcon?: FC<ComponentProps<'svg'>>;
}

export const AccordionPanel: FC<AccordionPanelProps> = ({
  children,
  header,
  isOpen = false,
  headerIcon: HeaderIcon,
  arrowIcon: ArrowIcon = HiChevronDown,
  ...props
}): JSX.Element => {
  const shouldReduceMotion = useReducedMotion();
  const theirProps = excludeClassName(props);
  const theme = useTheme().theme.accordion.header;

  const ListPanel = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: {
          opacity: 0,
          height: shouldReduceMotion ? 'auto' : 0,
        },
      }}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: shouldReduceMotion ? 0.2 : 0.5,
      }}
      className={`overflow-hidden !mt-0 mx-4`}
    >
      {children}
    </motion.div>
  );

  return (
    <Disclosure
      as="div"
      className={clsxm('space-y-1', props?.className)}
      defaultOpen={isOpen}
      {...theirProps}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            as="button"
            className={clsxm(theme.base, open && theme.open.on)}
            aria-live="assertive"
          >
            {typeof header === 'string' ? (
              <p className="flex items-center gap-2">
                {HeaderIcon && (
                  <HeaderIcon
                    className="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                  />
                )}
                {header}
              </p>
            ) : (
              header
            )}
            <span className={`rtl:block hidden`}>
              <ArrowIcon
                className={clsxm(
                  theme.arrow.base,
                  open ? `ltr:rotate-180 rtl:-rotate-180` : 'rotate-0'
                )}
              />
            </span>
            <span className={`rtl:hidden block`}>
              <ArrowIcon
                className={clsxm(
                  theme.arrow.base,
                  open ? `rotate-180` : 'rotate-0'
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
      )}
    </Disclosure>
  );
};
