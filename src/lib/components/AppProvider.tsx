import React from "react";
import { ModalProvider } from "./Modal/useModal";

export const AppProvider = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};
