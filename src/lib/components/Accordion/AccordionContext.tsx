import { createContext, useContext } from 'react';

export interface AccordionContextProps {
  /**
   * Whether multiple panels can be expanded at the same time.
   * @defaultValue `true`
   */
  multiple?: boolean;
  /**
   * The index of the panel to be expanded by default.
   * @defaultValue `undefined`
   * @remarks
   * If `multiple` is `true`, this prop should be an array of indices.
   * If `multiple` is `false`, this prop should be a single index.
   */
  defaultIndex?: number | number[] | undefined;
  /**
   * The active index of the panel.
   * @defaultValue `undefined`
   * @internal
   * @remarks
   * If `multiple` is `true`, this prop should be an array of indices.
   */
  expandedIndex?: number | number[] | undefined;
  setExpandedIndex?: React.Dispatch<
    React.SetStateAction<number | number[] | undefined>
  >;
  /**
   * On Toggle Callback
   * @internal
   */
  onToggle?: (isOpen: boolean, index: number, event: any) => void;
}

export const AccordionContext = createContext<AccordionContextProps>({
  multiple: false,
  defaultIndex: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onToggle: () => {},
});

export const useAccordionContext = (): AccordionContextProps => {
  return useContext(AccordionContext);
};

export const AccordionContextProvider = AccordionContext.Provider;
