import React, {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactElement,
  useId,
  useState,
} from "react";

import clsxm from "../../helpers/clsxm";
import { useTheme } from "../FluidUI/ThemeContext";
import {
  AccordionContextProps,
  AccordionContextProvider,
} from "./AccordionContext";
import { AccordionPanelProps } from "./AccordionPanel";

export interface AccordionProps
  extends PropsWithChildren<ComponentProps<"div">> {
  /**
   * Divider between panels.
   * @defaultValue `false`
   */
  divider?: boolean;
  children:
    | ReactElement<AccordionPanelProps>
    | ReactElement<AccordionPanelProps>[];
}

export const AccordionComponent: FC<AccordionProps & AccordionContextProps> = ({
  children,
  divider,
  multiple,
  defaultIndex,
  ...props
}): JSX.Element => {
  const theme = useTheme().theme.accordion;
  const id = useId();
  const [expandedIndex, setExpandedIndex] = useState<
    number | number[] | undefined
  >(defaultIndex);
  const onToggle = (isOpen: boolean, index: number, event: any) => {
    if (!multiple) {
      if (isOpen) {
        setExpandedIndex(undefined);
      } else {
        setExpandedIndex(index);
      }
    }
  };
  return (
    <AccordionContextProvider
      value={{
        multiple,
        defaultIndex,
        expandedIndex,
        setExpandedIndex,
        onToggle,
      }}
    >
      <div
        className={clsxm(
          theme.base,
          divider && theme.divider,
          props?.className
        )}
      >
        {React.Children.map(children, (child, index) => {
          // add a key to each child
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: `${id}-${index}`,
              panelIndex: index,
            } as any);
          }
          return child;
        })}
      </div>
    </AccordionContextProvider>
  );
};
