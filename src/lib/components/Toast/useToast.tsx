'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import clsxm from '../../helpers/clsxm';
import { Button } from '../Button';
import { useTheme } from '../FluidUI/ThemeContext';

export type PresentProps = {
  /**
   * title - Title of the toast
   * @default ''
   */
  title?: string;
  /**
   * message - Message to display in the toast
   * Note: If component is provided, message will be ignored
   * @default ''
   */
  message?: string;
  /**
   * role - Role of the toast
   * @default 'default'
   */
  role?: 'success' | 'error' | 'info' | 'warning' | 'default' | 'blank';
  id?: string;
  /**
   * autoDismiss - Whether to auto dismiss the toast
   * @default true
   */
  autoDismiss?: boolean;
  /**
   * duration - Duration in milliseconds to auto dismiss the toast
   * @default 4000
   */
  duration?: number;
  /**
   * component - Component to render in the toast
   * @default null
   */
  component?: ({ dismiss }: { dismiss: () => void }) => ReactNode;
  /**
   * dismissIcon - Icon to use for the dismiss button
   * @default XMarkIcon
   */
  dismissIcon?: any;
  /**
   * onDismiss - Callback function to run when the toast is dismissed
   * @default null
   * @param {string} id - ID of the toast
   * @param {string} role - Role of the toast
   */
  onDismiss?: ({ id, role }: { id: string; role: string }) => void;
  /**
   * icon - Icon to render in the toast
   * If not provided, the icon will be based on the role
   * It can be a React component or as a function that returns a React component
   * @default null
   */
  icon?: JSX.Element | ((props: any) => JSX.Element);
  /**
   * dismissClassName - Class name to apply to the dismiss button
   * @default ''
   */
  dismissClassName?: string;
};

export type ToastProps = {
  /**
   * present - Function to present a toast
   * @param {PresentProps} props - Props to pass to the toast
   */
  present: (options: PresentProps) => void;
  /**
   * Dismiss a toast by id
   * @param id the id of the toast to dismiss
   */
  dismiss: (id: string) => void;
};

export const ToastMessage = ({
  className = '',
  as = undefined,
  children,
}: {
  className?: string;
  as?: React.ElementType;
  children: ReactNode;
}) => {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        'mt-1 text-sm text-gray-500 dark:text-gray-300',
        className
      )}
    >
      {children}
    </Component>
  );
};
export const defaultTimeouts: {
  [key in PresentProps['role']]: number;
} = {
  default: 3000,
  success: 2000,
  error: Infinity,
  info: 4000,
  warning: 4000,
  blank: Infinity,
};

const getDefaultIcon = (role: PresentProps['role']) => {
  switch (role) {
    case 'success':
      return (
        <CheckCircleIcon
          className='h-6 w-6 text-green-400'
          aria-hidden='true'
        />
      );
    case 'error':
      return (
        <ExclamationCircleIcon
          className='h-6 w-6 text-red-400'
          aria-hidden='true'
        />
      );
    case 'info':
      return (
        <InformationCircleIcon
          className='h-6 w-6 text-blue-400'
          aria-hidden='true'
        />
      );
    case 'warning':
      return (
        <ExclamationTriangleIcon
          className='h-6 w-6 text-amber-400'
          aria-hidden='true'
        />
      );
    case 'blank':
      return null;
    default:
      return null;
  }
};

export const Toast = forwardRef(
  (
    {
      options,
      dismiss,
      className = '',
      ...props
    }: {
      options: PresentProps;
      dismiss: (id) => void;
      [key: string]: any;
    },
    ref
  ) => {
    const autoDismiss =
      typeof options?.autoDismiss === 'boolean' ? options?.autoDismiss : true;
    const duration =
      options?.duration || defaultTimeouts[options?.role] || 3000;
    const role = options?.role || 'default';
    const DismissIcon = options?.dismissIcon || XMarkIcon;
    const Icon = options?.icon;
    const shouldReduceMotion = useReducedMotion();
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme().theme.toast;
    const defaultIcon = getDefaultIcon(role);
    // if isHovered, don't dismiss
    useEffect(() => {
      if (autoDismiss && !isHovered) {
        const timeout = setTimeout(() => {
          dismiss(options.id);
        }, duration);
        return () => clearTimeout(timeout);
      }
    }, [isHovered]);
    return (
      <>
        <motion.div
          ref={ref as any}
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
            filter: 'blur(0px)',
          }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            y: 0,
            filter: shouldReduceMotion ? 'blur(0px)' : 'blur(16px)',
            transition: {
              duration: 0.4,
            },
          }}
          transition={{
            duration: 0.5,
            type: 'spring',
            bounce: 0.15,
          }}
          className={clsxm(
            'flex w-full flex-col items-center space-y-4 sm:items-end',
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}

          <div
            className={clsxm(
              theme.base,
              theme.role[role],
              role !== 'blank' && theme.before
            )}
          >
            {role !== 'blank' && (
              <div className='p-4 relative z-[1]'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    {!Icon && defaultIcon}
                    {Icon && (
                      <div className='h-6 w-6'>
                        {typeof Icon === 'function' ? (
                          <Icon
                            className='h-6 w-6 text-amber-400'
                            aria-hidden='true'
                          />
                        ) : (
                          Icon
                        )}
                      </div>
                    )}
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    {options?.title && (
                      <p className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                        {options?.title}
                      </p>
                    )}
                    {options?.message && (
                      <ToastMessage>{options?.message}</ToastMessage>
                    )}
                    {options?.component &&
                      options?.component({
                        dismiss: () => dismiss(options.id),
                      })}
                  </div>
                  <div className='ml-4 flex flex-shrink-0'>
                    <Button
                      onClick={() => {
                        dismiss(options.id);
                        options?.onDismiss?.({ id: options.id, role });
                      }}
                      iconOnly
                      icon={DismissIcon}
                      weight='clear'
                      shape='pill'
                      size='xs'
                      className={clsxm('-m-1', options?.dismissClassName)}
                    />
                  </div>
                </div>
              </div>
            )}
            {
              // if role is blank, return the component
              role === 'blank' &&
                options?.component &&
                options?.component({ dismiss: () => dismiss(options.id) })
            }
          </div>
        </motion.div>
      </>
    );
  }
);

export const ToastContext = createContext<ToastProps>(null);

export function ToastProvider({ children }) {
  const toastContainerRef = useRef<HTMLDivElement>(null);
  const [toasts, setToasts] = useState<PresentProps[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const present = (props: PresentProps) => {
    const toastId = Math.random().toString(36).substr(2, 9);
    setToasts([...toasts, { ...props, id: toastId }]);
  };
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  useEffect(() => {
    const toastContainer = toastContainerRef.current;
    if (toastContainer) {
      // scroll to the bottom of the toast container in 300 ms
      toastContainer.scrollTo({
        top: toastContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [toasts.length]);
  const windowExists = typeof window !== 'undefined';
  const theme = useTheme().theme.toast;
  const body = (
    <div
      ref={toastContainerRef}
      aria-atomic='true'
      aria-live='assertive'
      className={clsxm(
        'pointer-events-none fixed inset-0 z-[99] flex flex-col gap-4 overflow-y-auto px-4 py-6 sm:p-6 scrollbar-none',
        theme.position[theme.position['top-right']]
      )}
    >
      <AnimatePresence mode='popLayout'>
        {toasts.map((toast) => (
          <Toast
            key={`toast-${toast.id}`}
            options={toast}
            dismiss={dismissToast}
            layoutId={shouldReduceMotion ? undefined : `toast-${toast.id}`}
          />
        ))}
      </AnimatePresence>
    </div>
  );
  return (
    <ToastContext.Provider value={{ present, dismiss: dismissToast }}>
      {children}
      {/* Global notification live region, render this permanently at the end of the document */}
      {windowExists ? createPortal(body, document.body) : body}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const { present, dismiss } = useContext(ToastContext);
  return [present, dismiss];
}
