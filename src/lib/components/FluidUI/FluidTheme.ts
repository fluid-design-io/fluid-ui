import type { DeepPartial } from "../../helpers/deep-partial";
// import type { AlertColors } from "../Alert";
// import type { AvatarSizes } from "../Avatar";
// import type { BadgeColors, BadgeSizes } from "../Badge";
// import type {
//   ButtonColors,
//   ButtonGradientColors,
//   ButtonGradientDuoToneColors,
//   ButtonOutlineColors,
//   ButtonSizes,
// } from "../Button";
// import type { PositionInButtonGroup } from "../Button/ButtonGroup";
// import type { FluidFloatingTheme } from "../Floating";
// import type {
//   HelperColors,
//   LabelColors,
//   SelectColors,
//   SelectSizes,
//   TextareaColors,
//   TextInputColors,
//   TextInputSizes,
// } from "../FormControls";
// import type { ModalPositions, ModalSizes } from "../Modal";
// import type { ProgressColor, ProgressSizes } from "../Progress";
// import type { StarSizes } from "../Rating";
// import type { SidebarCTAColors } from "../Sidebar/SidebarCTA";
// import type { SpinnerColors, SpinnerSizes } from "../Spinner";
// import type { TabStyleItem, TabStyles } from "../Tab";

export type CustomFluidTheme = DeepPartial<FluidTheme>;

export interface FluidTheme {
  accordion: {
    base: string;
    divider: boolean;
    content: {
      base: string;
    };
    header: {
      arrow: {
        base: string;
        open: FluidBoolean;
      };
      base: string;
      heading: string;
      open: FluidBoolean;
    };
  };
  button: {
    base: string;
    size: FluidButtonSizes;
    color: FluidButtonColors;
  };
}

export interface FluidBoolean {
  off: string;
  on: string;
}

export interface FluidStateColors {
  info: string;
  danger: string;
  success: string;
  warning: string;
}

export interface FluidButtonColors {
  gray: FluidButtonColorOptions;
  orange: FluidButtonColorOptions;
  yellow: FluidButtonColorOptions;
  lime: FluidButtonColorOptions;
  green: FluidButtonColorOptions;
  teal: FluidButtonColorOptions;
  sky: FluidButtonColorOptions;
  indigo: FluidButtonColorOptions;
  fuchsia: FluidButtonColorOptions;
  rose: FluidButtonColorOptions;
  red: FluidButtonColorOptions;
}

export interface FluidButtonColorOptions {
  palette: string;
  active: string;
  color: {
    light: string;
    dark: string;
  }
}

export interface FluidButtonSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface FluidColors extends FluidStateColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  gray: string;
  green: string;
  indigo: string;
  lime: string;
  pink: string;
  red: string;
  teal: string;
  yellow: string;
  dark: string;
  light: string;
  purple: string;
}

export interface FluidGradientColors extends Omit<FluidStateColors, "warning"> {
  [key: string]: string;
  cyan: string;
  lime: string;
  pink: string;
  purple: string;
  teal: string;
}

export interface FluidGradientDuoToneColors {
  cyanToBlue: string;
  greenToBlue: string;
  pinkToOrange: string;
  purpleToBlue: string;
  purpleToPink: string;
  redToYellow: string;
  tealToLime: string;
}

export type FluidHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface FluidPositions {
  "bottom-left": string;
  "bottom-right": string;
  "bottom-center": string;
  "top-left": string;
  "top-center": string;
  "top-right": string;
  "center-left": string;
  center: string;
  "center-right": string;
}

export interface FluidSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}
