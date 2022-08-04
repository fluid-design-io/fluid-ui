import React, { ComponentProps, PropsWithChildren } from "react";
import clsxm from "../../helpers/clsxm";
import {
  FluidButtonColorOptions,
  FluidButtonColors,
  FluidButtonShapes,
  FluidButtonSizes,
  FluidButtonWeights,
  FulidButtonLoadingOptions,
} from "../FluidUI/FluidTheme";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrEmptyCircle } from "react-icons/gr";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { useTheme } from "../FluidUI/ThemeContext";
import { excludeClassName } from "../../helpers/exclude";

export interface ButtonProps extends PropsWithChildren<ComponentProps<"button">> {
  color?: keyof FluidButtonColors;
  size?: keyof FluidButtonSizes;
  weight?: keyof FluidButtonWeights;
  isLoading?: boolean;
  shape?: keyof FluidButtonShapes;
  gradient?: keyof FluidButtonColorOptions["gradient"] | undefined;
  loadingOptions?: {
    animation?: keyof FulidButtonLoadingOptions["animation"];
    text?: string;
  };
  children?: React.ReactNode;
  [key: string]: any;
}
export const Button = ({
  color = "gray",
  size = "md",
  shape = "round",
  weight = "normal",
  isLoading = false,
  gradient = undefined,
  loadingOptions = {
    animation: "spin",
    text: "",
  },
  href = undefined,
  children,
  ...props
}: ButtonProps) => {
  const isLink = typeof href !== "undefined";
  const Component = isLink ? "a" : "button";
  const theme = useTheme().theme.button;

  const theirProps = excludeClassName(props);
  return (
    <Component
      className={clsxm(
        theme.base,
        theme.color[color].base,
        theme.shape[shape][size],
        gradient ? theme.color[color].gradient[gradient] : theme.color[color].weight[weight],
        props?.className
      )}
      disabled={props?.disabled || isLoading}
      href={href}
      type={isLink ? undefined : "button"}
      {...theirProps}
    >
      {isLoading && <ButtonLoadingComponent {...{ loadingOptions }} />}
      <div className={clsxm(theme.base, isLoading && "opacity-0", loadingOptions.text.length > 0 && "px-2")}>
        {isLoading ? (loadingOptions.text.length > 0 ? loadingOptions.text : children) : children}
      </div>
    </Component>
  );
};

const ButtonLoadingComponent = ({
  loadingOptions,
}: {
  loadingOptions: {
    animation?: keyof FulidButtonLoadingOptions["animation"];
    text?: string;
  };
}) => {
  const theme = useTheme().theme.button;
  const iconOption = {
    spin: AiOutlineLoading3Quarters,
    pulse: HiOutlineDotsHorizontal,
    ping: GrEmptyCircle,
  };
  const Icon = iconOption[loadingOptions.animation];

  return (
    <div className={clsxm(theme.loading.base)}>
      <Icon className={theme.loading.animation[loadingOptions.animation]} />
      {loadingOptions.text.length > 0 && <div className={theme.loading.text}>{loadingOptions.text}</div>}
    </div>
  );
};
