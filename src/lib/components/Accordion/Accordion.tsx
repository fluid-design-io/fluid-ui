import type {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import clsxm from "../../helpers/clsxm";
import { useTheme } from "../FluidUI/ThemeContext";
import type { AccordionPanelProps } from "./AccordionPanel";

export interface AccordionProps
  extends PropsWithChildren<ComponentProps<"div">> {
  /**
   * Divider between panels.
   * @default false
   */
  divider?: boolean;
  children:
    | ReactElement<AccordionPanelProps>
    | ReactElement<AccordionPanelProps>[];
}

export const Accordion: FC<AccordionProps> = ({
  children,
  divider,
  ...props
}): JSX.Element => {
  const theme = useTheme().theme.accordion;
  return (
    <div
      className={clsxm(theme.base, divider && theme.divider, props?.className)}
    >
      {children}
    </div>
  );
};
