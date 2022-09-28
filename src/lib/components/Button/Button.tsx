/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useId, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrEmptyCircle } from 'react-icons/gr';
import { HiCheckCircle, HiOutlineDotsHorizontal } from 'react-icons/hi';

import {
  ButtonComponent,
  ButtonIsLoadedOptions,
  ButtonLoadingOptionsAnimation,
  ButtonProps,
  FluidButtonColors,
  FluidButtonShapes,
  FluidButtonSizes,
  FluidButtonWeights,
  PolymorphicRef,
} from '../../../type';
import clsxm from '../../helpers/clsxm';
import { excludeClassName } from '../../helpers/exclude';
import { getUserClassNames } from '../../helpers/getUserClassNames';
import { isChildValid } from '../../helpers/isChildValid';
import { useTheme } from '../FluidUI/ThemeContext';
import { SpinLarge } from '../Spinner';

export const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      innerAs = as,
      color = 'gray' as keyof FluidButtonColors,
      size = 'md' as keyof FluidButtonSizes,
      sr = undefined,
      shape = 'round' as keyof FluidButtonShapes,
      weight = 'normal' as keyof FluidButtonWeights,
      iconOnly = false,
      isLoading = false,
      isLoaded = false,
      loadedOptions = undefined,
      gradient = undefined,
      loadingOptions = undefined,
      icon: Icon,
      iconStart: IconStart,
      iconEnd: IconEnd,
      className,
      badge,
      label,
      labelClassName,
      badgeClassName,
      iconClassName,
      iconStartPosition = 'flex',
      iconEndPosition = 'flex',
      buttonTransition = true,
      children,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const [isLoadedTriggered, setIsLoadedTriggered] = useState(false);
    const theme = useTheme().theme.button;
    const id = useId();
    const theirProps = excludeClassName(props);
    // isCustomColor is to check if the className contains a string starts with 'btn-'
    const isCustomColor = className && className.includes('btn-');
    const inherClassNames = getUserClassNames(className);
    const themeSize = iconOnly
      ? theme.iconOnly[shape][size]
      : theme.shape[shape][size];
    const Component = innerAs || 'button';
    const isLoadedDuration =
      typeof isLoaded === 'object' ? loadedOptions.duration || 1500 : 1500;
    const isButtonTextHidden = isLoading || (isLoaded && isLoadedTriggered);
    useEffect(() => {
      if (!!isLoaded && !isLoadedTriggered) {
        setIsLoadedTriggered(true);
        // eslint-disable-next-line no-undef
        setTimeout(() => {
          setIsLoadedTriggered(false);
        }, isLoadedDuration);
      }
    }, [isLoaded]);
    return (
      <Component
        disabled={props?.disabled || isLoading}
        ref={ref}
        className={clsxm(
          theme.base,
          themeSize,
          !isCustomColor && [
            theme.color[color].base,
            gradient
              ? theme.color[color].gradient[gradient]
              : theme.color[color].weight[weight],
          ],
          !buttonTransition && 'transition-none',
          className
        )}
        type={props?.type || 'button'}
        {...theirProps}
      >
        {sr && <span className='sr-only'>{sr}</span>}
        {!sr && label && <span className='sr-only'>{label}</span>}
        <AnimatePresence mode='sync'>
          {isLoading && (
            <ButtonLoadingComponent
              key={id}
              {...{
                loadingOptions,
                inherClassNames:
                  loadingOptions?.text &&
                  loadingOptions.text.length > 0 &&
                  inherClassNames,
                themeSize,
              }}
            />
          )}
          {!isLoading && isLoaded && isLoadedTriggered && (
            <ButtonLoadedComponent
              key={`${id}-loaded`}
              {...{
                isLoaded,
                loadedOptions,
                inherClassNames:
                  loadedOptions?.text &&
                  loadedOptions.text.length > 0 &&
                  inherClassNames,
                themeSize,
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: isButtonTextHidden ? 0 : 1,
            scale: isButtonTextHidden ? 0.85 : 1,
          }}
          className={clsxm(
            'w-full flex gap-2 items-center justify-center',
            inherClassNames
          )}
        >
          <>
            {IconStart &&
              (isChildValid(IconStart) ? (
                IconStart
              ) : (
                /* @ts-ignore */
                <IconStart
                  className={clsxm('flex-shrink-0 w-4 h-4', iconClassName)}
                />
              ))}
            {iconStartPosition === 'between' && <span className='flex-grow' />}
            {label && !iconOnly && (
              <span className={clsxm(labelClassName)}>{label}</span>
            )}
            {children && children}
            {iconEndPosition === 'between' && <span className='flex-grow' />}
            {IconEnd &&
              (isChildValid(IconEnd) ? (
                IconEnd
              ) : (
                /* @ts-ignore */
                <IconEnd
                  className={clsxm('flex-shrink-0 w-4 h-4', iconClassName)}
                />
              ))}
            {Icon &&
              (isChildValid(Icon) ? (
                Icon
              ) : (
                /* @ts-ignore */
                <Icon
                  className={clsxm('flex-shrink-0 w-4 h-4', iconClassName)}
                />
              ))}
            {badge && (
              <span
                className={clsxm(
                  'rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700',
                  badgeClassName
                )}
              >
                {badge}
              </span>
            )}
          </>
        </motion.div>
      </Component>
    );
  }
);

const ButtonOverlayWrap = ({ children, className }) => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    className={clsxm(className)}
    exit={{ opacity: 0, scale: 0.7 }}
    initial={{ opacity: 0, scale: 0.7 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const ButtonLoadingComponent = ({
  loadingOptions = {
    animation: 'spin',
    text: '',
  },
  inherClassNames = [],
  themeSize,
}: {
  loadingOptions: {
    animation?: ButtonLoadingOptionsAnimation;
    text?: string;
  };
  inherClassNames: string[];
  themeSize: string;
}) => {
  const theme = useTheme().theme.button;
  const iconOption = {
    spin: AiOutlineLoading3Quarters,
    pulse: HiOutlineDotsHorizontal,
    ping: GrEmptyCircle,
    'spin-large': SpinLarge,
  };
  const Icon = iconOption[loadingOptions.animation];

  return (
    <ButtonOverlayWrap
      className={clsxm(theme.loading.base, themeSize, inherClassNames)}
    >
      <Icon
        className={clsxm(
          'flex-shrink-0',
          theme.loading.animation[loadingOptions.animation]
        )}
      />
      {loadingOptions?.text && loadingOptions.text.length > 0 && (
        <div className={theme.loading.text}>{loadingOptions.text}</div>
      )}
    </ButtonOverlayWrap>
  );
};

const ButtonLoadedComponent = ({
  isLoaded = false,
  loadedOptions = undefined,
  inherClassNames = [],
  themeSize,
}: {
  isLoaded: boolean;
  loadedOptions: ButtonIsLoadedOptions;
  inherClassNames: string[];
  themeSize: string;
}) => {
  const theme = useTheme().theme.button;
  const text: ButtonIsLoadedOptions['text'] = loadedOptions?.text;
  const className: ButtonIsLoadedOptions['className'] =
    loadedOptions?.className;
  let Icon: ButtonIsLoadedOptions['icon'] = HiCheckCircle;
  if (loadedOptions?.icon) {
    Icon = loadedOptions.icon;
  }

  return (
    <ButtonOverlayWrap
      className={clsxm(
        theme.loading.base,
        themeSize,
        inherClassNames,
        className
      )}
    >
      {isChildValid(Icon) ? (
        Icon
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <Icon className={clsxm('flex-shrink-0')} />
      )}
      {text && <div className={theme.loading.text}>{text}</div>}
    </ButtonOverlayWrap>
  );
};
