import React, { useState } from 'react';

import {
  FluidProvider,
  Button,
  Dialog,
  Form,
  Input,
  PresentModalProps,
  useModal,
} from '../src/lib/components';
import clsxm from '../src/lib/helpers/clsxm';

export default {
  title: 'Components/Modal',
  component: null,
  args: {
    title: 'Title',
    message: 'Message',
    role: 'success',
    autoDismiss: true,
    duration: 3000,
    component: null,
  },
};

const Wrap = ({ className = '', children }) => {
  return (
    <div
      className={clsxm(
        'flex h-full flex-wrap items-center justify-center gap-6 px-4 lg:px-6',
        className
      )}
    >
      {children}
    </div>
  );
};

const NestedModal2 = ({ onConfirm, dismiss }) => {
  const [nestedModal] = useModal(NestedModal1, {
    name: 'Test',
    onConfirm: () => console.log('Confirmed'),
  });
  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Description>
          You have unsaved changes. Are you sure you want to cancel? All unsaved
          changes will be lost.
        </Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={nestedModal} type='button' color='emerald'>
          Nest ME!
        </Button>
        <Button onClick={dismiss} type='button'>
          Close
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

const NestedModal1 = ({ onConfirm, dismiss, ...props }) => {
  const [nestedModal] = useModal(NestedModal2, {
    name: 'Test',
    onConfirm: () => console.log('Confirmed'),
  });
  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Description>
          You have unsaved changes. Are you sure you want to cancel? All unsaved
          changes will be lost.
        </Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={nestedModal} type='button' color='emerald'>
          Nest ME!
        </Button>
        <Button onClick={dismiss} type='button'>
          Close
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

const ConfirmCancelModal = ({ onConfirm, dismiss, ...props }) => {
  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Title>Are you sure?</Dialog.Title>
        <Dialog.Description>
          You have unsaved changes. Are you sure you want to cancel? All unsaved
          changes will be lost.
        </Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={onConfirm} type='button' color='rose'>
          Confirm
        </Button>
        <Button onClick={dismiss} type='button'>
          Close
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

const ConfirmCancelModalWrap = ({ onConfirm, dismiss, onClose, ...props }) => {
  const [presentConfirmModal] = useModal(ConfirmCancelModal, {
    onConfirm: () => dismiss(),
  });
  const [name, setName] = useState<string>('John Doe');
  const canDismiss = name === 'John Doe';
  onClose(canDismiss ? dismiss : presentConfirmModal);
  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Title>My Profile</Dialog.Title>
        <Dialog.Description>
          Enter your profile information below. (Try change the name to
          something else and try to close the modal.)
        </Dialog.Description>
        <Form
          initialValues={{
            name: 'John Doe',
          }}
          onSubmit={() => null}
        >
          <Input
            label='Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={dismiss} type='button' color='sky'>
          Save
        </Button>
        <Button
          onClick={canDismiss ? dismiss : presentConfirmModal}
          type='button'
        >
          Close
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

const SimpleModal = ({ dismiss }) => {
  return (
    <Dialog>
      <Dialog.Header>
        <Dialog.Title>Modal Title</Dialog.Title>
        <Dialog.CloseButton dismiss={dismiss} />
      </Dialog.Header>
      <Dialog.Body>
        <p>Modal Content</p>
      </Dialog.Body>
      {/* <Dialog.Footer>
        <Button onClick={dismiss} type='button'>
          Close
        </Button>
      </Dialog.Footer> */}
    </Dialog>
  );
};

const Template = (args) => {
  return (
    <FluidProvider>
      <Component {...args} />
    </FluidProvider>
  );
};

const Component = ({
  className = '',
  ...args
}: StoryProps & { className?: string }) => {
  const [nestedModal] = useModal(args.children, {
    name: 'Test',
    onConfirm: () => console.log('Confirmed'),
  });
  return (
    <Wrap>
      <Button label='Present Modal' onClick={() => nestedModal()} />
    </Wrap>
  );
};

export const Default = Template.bind({});
export const NestedModal = Template.bind({});
export const ConfirmCancel = Template.bind({});

Default.args = {
  children: SimpleModal,
};

NestedModal.args = {
  children: NestedModal1,
};

ConfirmCancel.args = {
  children: ConfirmCancelModalWrap,
};

NestedModal.storyName = 'Nested Modal';
