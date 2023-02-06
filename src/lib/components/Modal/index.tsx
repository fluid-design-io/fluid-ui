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
  ModalTitle,
  ModalCloseButton,
} from './useModal';

export const Dialog = Object.assign(ModalContainer, {
  Title: ModalTitle,
  Header: ModalHeader,
  Description: ModalDescription,
  Footer: ModalFooter,
  Body: ModalBody,
  CloseButton: ModalCloseButton,
});

Dialog.displayName = 'Dialog';

export { useModal, ModalProvider, ModalProps, PresentModalProps };
