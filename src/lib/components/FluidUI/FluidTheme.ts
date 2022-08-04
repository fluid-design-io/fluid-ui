import { DeepPartial } from "../../helpers/deep-partial";
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
    divider: string;
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
    shape: FluidButtonShapes;
    color: FluidButtonColors;
    loading: FulidButtonLoadingOptions;
  };
  form: {
    base: string;
  };
}

export interface FluidBoolean {
  off: string;
  on: string;
}

export interface FluidButtonColors {
  red: FluidButtonColorOptions;
  orange: FluidButtonColorOptions;
  amber: FluidButtonColorOptions;
  yellow: FluidButtonColorOptions;
  lime: FluidButtonColorOptions;
  green: FluidButtonColorOptions;
  emerald: FluidButtonColorOptions;
  teal: FluidButtonColorOptions;
  cyan: FluidButtonColorOptions;
  sky: FluidButtonColorOptions;
  blue: FluidButtonColorOptions;
  indigo: FluidButtonColorOptions;
  violet: FluidButtonColorOptions;
  purple: FluidButtonColorOptions;
  fuchsia: FluidButtonColorOptions;
  pink: FluidButtonColorOptions;
  rose: FluidButtonColorOptions;
  gray: FluidButtonColorOptions;
  slate: FluidButtonColorOptions;
  zinc: FluidButtonColorOptions;
  neutral: FluidButtonColorOptions;
  stone: FluidButtonColorOptions;
}

export interface FluidButtonColorOptions {
  base: string;
  weight: FluidButtonWeights;
  gradient: {
    linear: string;
    clay: string;
  };
}

export interface FulidButtonLoadingOptions {
  base: string;
  /**
   * The animation type to use when the button is loading.
   * @default "spin"
   * Options: "spin", "pulse", "ping"
   */
  animation: {
    spin: string;
    pulse: string;
    ping: string;
  };
  text: string;
}

export interface FluidButtonWeights {
  light: string;
  normal: string;
  bold: string;
  outline: string;
  none: string;
}

export interface FluidButtonSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface FluidButtonShapes {
  pill: FluidButtonSizes;
  round: FluidButtonSizes;
  square: FluidButtonSizes;
}

export interface FluidColors {
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
