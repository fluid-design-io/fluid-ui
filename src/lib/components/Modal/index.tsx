import {
  ModalBody,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  useModal,
  ModalProps,
  PresentModalProps,
  ModalProvider,
} from "./useModal";

export const Dialog = Object.assign(ModalContainer, {
  Title: ModalHeader,
  Description: ModalDescription,
  Footer: ModalFooter,
  Body: ModalBody,
});

Dialog.displayName = "Dialog";

export { useModal, ModalProvider, ModalProps, PresentModalProps };
