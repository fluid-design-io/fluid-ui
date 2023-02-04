import React from 'react';
import { ModalProvider } from './Modal/useModal';

export const FluidProvider = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
