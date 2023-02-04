"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React from "react";
import {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsxm from "../../helpers/clsxm";

export type PresentProps = {
  title: string;
  message?: string;
  role?: "success" | "error" | "info";
  id?: string;
  autoDismiss?: boolean;
  duration?: number;
  component?: ReactNode;
};

export type ToastProps = {
  present: (options: PresentProps) => void;
};

export const ToastMessage = ({
  className = "",
  as = undefined,
  children,
}: {
  className?: string;
  as?: React.ElementType;
  children: ReactNode;
}) => {
  const Component = as || "p";
  return (
    <Component
      className={clsxm(
        "mt-1 text-sm text-gray-500 dark:text-gray-300",
        className
      )}
    >
      {children}
    </Component>
  );
};

export const Toast = forwardRef(
  (
    {
      options,
      dismiss,
      ...props
    }: {
      options: PresentProps;
      dismiss: (id) => void;
      [key: string]: any;
    },
    ref
  ) => {
    const autoDismiss =
      typeof options?.autoDismiss === "boolean" ? options?.autoDismiss : true;
    const duration = options?.duration || 4000;
    const role = options?.role || "success";
    const shouldReduceMotion = useReducedMotion();
    if (autoDismiss) {
      setTimeout(() => {
        dismiss(options.id);
      }, duration);
    }
    return (
      <>
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
            },
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            bounce: 0.15,
          }}
          className='flex w-full flex-col items-center space-y-4 sm:items-end'
          {...props}
        >
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}

          <div className='card-primary pointer-events-auto w-full max-w-sm rounded-md !p-0 shadow-lg dark:shadow-xl'>
            <div className='p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  {role === "success" && (
                    <CheckCircleIcon
                      className='h-6 w-6 text-green-400'
                      aria-hidden='true'
                    />
                  )}
                  {role === "error" && (
                    <ExclamationCircleIcon
                      className='h-6 w-6 text-red-400'
                      aria-hidden='true'
                    />
                  )}
                  {role === "info" && (
                    <InformationCircleIcon
                      className='h-6 w-6 text-blue-400'
                      aria-hidden='true'
                    />
                  )}
                </div>
                <div className='ml-3 w-0 flex-1 pt-0.5'>
                  <p className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                    {options?.title}
                  </p>
                  {options?.message && (
                    <ToastMessage>{options?.message}</ToastMessage>
                  )}
                  {options?.component && options.component}
                </div>
                <div className='ml-4 flex flex-shrink-0'>
                  <button
                    type='button'
                    className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-400 dark:focus:ring-offset-black'
                    onClick={() => {
                      dismiss(options.id);
                    }}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                  </button>
                </div>
              </div>
            </div>
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
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  useEffect(() => {
    const toastContainer = toastContainerRef.current;
    if (toastContainer) {
      // scroll to the bottom of the toast container in 300 ms
      toastContainer.scrollTo({
        top: toastContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [toasts.length]);

  return (
    <ToastContext.Provider value={{ present }}>
      {children}
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        ref={toastContainerRef}
        aria-atomic='true'
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 z-[60] flex flex-col items-end gap-4 overflow-y-auto px-4 py-6 sm:items-start sm:p-6'
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
    </ToastContext.Provider>
  );
}

export function useToast() {
  const { present } = useContext(ToastContext);
  return [present];
}
