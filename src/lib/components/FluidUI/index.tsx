import React, { FC, HTMLAttributes,useEffect, useMemo } from 'react';
import { DeepPartial } from '../../helpers/deep-partial';
import { mergeDeep } from '../../helpers/mergeDeep';
import windowExists from '../../helpers/window-exists';
import defaultTheme from '../../theme/default';
import { FluidTheme } from './FluidTheme';
import { ThemeContext, useThemeMode } from './ThemeContext';

export interface ThemeProps {
  dark?: boolean;
  theme?: DeepPartial<FluidTheme>;
  usePreferences?: boolean;
}

interface FlowbiteProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: ThemeProps;
}

export const Flowbite: FC<FlowbiteProps> = ({ children, theme = {} }) => {
  const { theme: customTheme = {}, dark, usePreferences = true } = theme;
  const [mode, setMode, toggleMode] = useThemeMode(usePreferences);

  const mergedTheme = mergeDeep(defaultTheme, customTheme) as unknown as FluidTheme;

  useEffect(() => {
    if (dark) {
      if (setMode != null) {
        setMode('dark');
      }

      if (windowExists()) {
        document.documentElement.classList.add('dark');
      }
    }
  }, [dark, setMode]);

  const themeContextValue = useMemo(
    () => ({
      theme: mergedTheme,
      mode,
      toggleMode,
    }),
    [mode, toggleMode, mergedTheme],
  );

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

export type { FluidTheme } from './FluidTheme';