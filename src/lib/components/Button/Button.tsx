/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { AnimatePresence, motion } from "framer-motion";
import React, {
  Fragment,
  isValidElement,
  useEffect,
  useId,
  useState,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrEmptyCircle } from "react-icons/gr";
import { HiCheckCircle, HiOutlineDotsHorizontal } from "react-icons/hi";

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
} from "../../../type";
import clsxm from "../../helpers/clsxm";
import { excludeClassName } from "../../helpers/exclude";
import { getUserClassNames } from "../../helpers/getUserClassNames";
import { isChildValid } from "../../helpers/isChildValid";
import { useTheme } from "../FluidUI/ThemeContext";
import { SpinLarge } from "../Spinner";

export const Button: ButtonComponent = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      as,
      innerAs = as,
      color = "gray" as keyof FluidButtonColors,
      size = "md" as keyof FluidButtonSizes,
      sr = undefined,
      shape = "round" as keyof FluidButtonShapes,
      weight = "normal" as keyof FluidButtonWeights,
      iconOnly = false,
      isLoading = false,
      isLoaded = false,
      loadedOptions = undefined,
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
      iconStartPosition = "flex",
      iconEndPosition = "flex",
      buttonTransition = true,
      children,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const [isLoadedTriggered, setIsLoadedTriggered] = useState(false);
    const theme = useTheme().theme.button;
    const id = useId();
    const theirProps = excludeClassName(props) as any;
    // isCustomColor is to check if the className contains a string starts with 'btn-'
    const isCustomColor = className && className.includes("btn-");
    // customColorType is to check if the className contains a string starts with 'btn-' and before the next '-'
    const customColorType = () => {
      if (isCustomColor) {
        // default color means there's only 1 "-"
        const isDefaultColor =
          className && className.split("btn-")[1].split("-").length === 1;
        if (isDefaultColor) {
          return "default";
        }
        return className && className.split("btn-")[1].split("-")[0];
      } else {
        return null;
      }
    };
    const inherClassNames = getUserClassNames(className);
    const themeSize = iconOnly
      ? theme.iconOnly[shape][size]
      : theme.shape[shape][size];
    const Component = innerAs || "button";
    const isLoadedDuration =
      typeof isLoaded === "object" ? loadedOptions?.duration || 1500 : 1500;
    const isButtonTextHidden = isLoading || (isLoaded && isLoadedTriggered);
    const componentTypeProp = as
      ? props?.type
        ? props.type
        : undefined
      : "button";
    if (componentTypeProp) theirProps["type"] = componentTypeProp;
    useEffect(() => {
      if (!!isLoaded && !isLoadedTriggered) {
        setIsLoadedTriggered(true);
        // eslint-disable-next-line no-undef
        setTimeout(() => {
          setIsLoadedTriggered(false);
        }, isLoadedDuration);
      }
    }, [isLoaded]);
    const releaseEffect = (
      e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
    ) => {
      if (
        weight === "light" ||
        weight === "clear" ||
        customColorType() === "clear" ||
        customColorType() === "light"
      ) {
        // add a className "pressed" to the button, remove it after 200ms
        const button = e.currentTarget;
        button.classList.add("pressed");
        // eslint-disable-next-line no-undef
        setTimeout(() => {
          button.classList.remove("pressed");
        }, 150);
      }
    };
    return (
      <Component
        disabled={props?.disabled || isLoading}
        onMouseUp={releaseEffect}
        onTouchEnd={releaseEffect}
        ref={ref}
        className={clsxm(
          theme.base,
          themeSize,
          !isCustomColor && theme.color[color].weight[weight],
          !buttonTransition && "transition-none",
          className
        )}
        aria-label={sr || label}
        aria-busy={isLoading}
        {...theirProps}
      >
        <Fragment>
          {sr && <span className='sr-only'>{sr}</span>}
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
              "w-full flex gap-2 items-center justify-center",
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
                    className={clsxm("flex-shrink-0 w-4 h-4", iconClassName)}
                  />
                ))}
              {iconStartPosition === "between" && (
                <span className='flex-grow' />
              )}
              {label && !iconOnly && (
                <span className={clsxm(labelClassName)}>{label}</span>
              )}
              {children && children}
              {iconEndPosition === "between" && <span className='flex-grow' />}
              {IconEnd &&
                (isChildValid(IconEnd) ? (
                  IconEnd
                ) : (
                  /* @ts-ignore */
                  <IconEnd
                    className={clsxm("flex-shrink-0 w-4 h-4", iconClassName)}
                  />
                ))}
              {Icon &&
                (isChildValid(Icon) ? (
                  Icon
                ) : (
                  /* @ts-ignore */
                  <Icon
                    className={clsxm("flex-shrink-0 w-4 h-4", iconClassName)}
                  />
                ))}
              {badge && (
                <span
                  className={clsxm(
                    "rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700",
                    badgeClassName
                  )}
                >
                  {badge}
                </span>
              )}
            </>
          </motion.div>
        </Fragment>
      </Component>
    );
  }
);

const ButtonOverlayWrap = ({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) => (
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
    animation: "spin",
    text: "",
  },
  inherClassNames = [],
  themeSize,
}: {
  loadingOptions?: {
    animation?: ButtonLoadingOptionsAnimation;
    text?: string;
  };
  inherClassNames: any;
  themeSize: string;
}) => {
  const theme = useTheme().theme.button;
  const iconOption = {
    spin: AiOutlineLoading3Quarters,
    pulse: HiOutlineDotsHorizontal,
    ping: GrEmptyCircle,
    "spin-large": SpinLarge,
  };
  const Icon = iconOption[loadingOptions.animation || "spin"];

  return (
    <ButtonOverlayWrap
      className={clsxm(theme.loading.base, themeSize, inherClassNames)}
    >
      <Icon
        className={clsxm(
          "flex-shrink-0",
          theme.loading.animation[loadingOptions.animation || "spin"]
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
  loadedOptions?: ButtonIsLoadedOptions;
  inherClassNames: any;
  themeSize: string;
}) => {
  const theme = useTheme().theme.button;
  const text: ButtonIsLoadedOptions["text"] = loadedOptions?.text;
  const className: ButtonIsLoadedOptions["className"] =
    loadedOptions?.className;
  let Icon: ButtonIsLoadedOptions["icon"] = HiCheckCircle;
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
      {isValidElement(Icon) ? (
        Icon
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <Icon className={clsxm("flex-shrink-0")} />
      )}
      {text && <div className={theme.loading.text}>{text}</div>}
    </ButtonOverlayWrap>
  );
};
