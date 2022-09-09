import React, { FC, HTMLAttributes, useEffect, useMemo } from 'react';
import { FluidTheme } from '../../../type';

import { DeepPartial } from '../../helpers/deep-partial';
import { mergeDeep } from '../../helpers/mergeDeep';
import windowExists from '../../helpers/window-exists';
import defaultTheme from '../../theme/default';

import { ThemeContext, useThemeMode } from './ThemeContext';

export interface ThemeProps {
  dark?: boolean;
  theme?: DeepPartial<FluidTheme>;
  usePreferences?: boolean;
}

interface FluidUIProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  theme?: ThemeProps;
}

export const FluidUI: FC<FluidUIProps> = ({ children, theme = {} }) => {
  const { theme: customTheme = {}, dark, usePreferences = true } = theme;
  const [mode, setMode, toggleMode] = useThemeMode(usePreferences);

  const mergedTheme = mergeDeep(
    defaultTheme as any,
    customTheme
  ) as unknown as FluidTheme;

  useEffect(() => {
    if (dark) {
      if (setMode != null) {
        setMode('dark');
      }

      if (windowExists()) {
        // eslint-disable-next-line no-undef
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
    [mode, toggleMode, mergedTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
