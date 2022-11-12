import { Tab as HeadlessTab } from '@headlessui/react';
import React from 'react';
import clsxm from '../../helpers/clsxm';
import { useTheme } from '../FluidUI/ThemeContext';

export const TabPanel = ({
  tabPanelClassName = '',
  children,
  ...props
}: {
  tabPanelClassName?: string;
  children: React.ReactNode;
}): React.ReactElement => {
  const theme = useTheme().theme.tab;
  return (
    <HeadlessTab.Panel
      className={clsxm(theme.panel, tabPanelClassName)}
      {...props}
    >
      {children}
    </HeadlessTab.Panel>
  );
};
