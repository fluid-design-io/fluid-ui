import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '../src/lib/components/Button';
import * as Yup from 'yup';

import { FluidButtonSizes, FluidButtonWeights } from '../src/lib/components/FluidUI/FluidTheme';
import {
  ComboBox,
  Form,
  Input,
  Menu,
  SubmitButton,
  SubmitButtonRef,
  Switch,
  Textarea,
} from '../src/lib/components/Form';
import { HiChevronDown, HiInformationCircle, HiPencil, HiTrash } from 'react-icons/hi';
import { states } from '../src/lib/helpers/data';
import { useRef, useState } from '@storybook/addons';

export default {
  title: 'Components/Form',
  component: Button,
  args: {
    weight: 'normal' as keyof FluidButtonWeights,
    size: 'md' as keyof FluidButtonSizes,
    disabled: false,
  },
} as Meta;

interface StoryButtonProps extends Omit<ButtonProps, 'color'> {}

const Template: Story<StoryButtonProps> = (args) => {
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<any>(null);
  const initialValues = {
    name: '',
    email: '',
    message: '',
    state: 'California',
    saveResponse: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().optional(),
    state: Yup.string().required('State is required'),
    saveResponse: Yup.boolean().required('Save response is required'),
  });
  return (
    <>
      <div className="mx-auto mt-12 w-4/5 max-w-lg rounded-xl bg-white p-4 shadow-lg shadow-primary-400/20 dark:bg-stone-900 dark:shadow-black/30">
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setIsSubmitted(values);
              setSubmitting(false);
              resetForm();
            }, 2000);
          }}
        >
          {isSubmitted && (
            <div>
              <h1>Thank you for your submission!</h1>
            </div>
          )}
          <h2 className="pb-4 text-xl font-semibold text-primary-700 contrast:bg-amber-300 dark:text-primary-200">
            Contact Us
          </h2>
          <div className="relative mb-4 flex justify-between">
            <div />
            <Menu
              label={'Actions'}
              iconEnd={HiChevronDown}
              iconStart={HiInformationCircle}
              header={
                <p className="truncate py-3 px-3.5">
                  <span className="mb-0.5 block text-xs text-primary-500 dark:text-primary-400">Signed in as</span>
                  <span className="font-semibold text-primary-700 dark:text-primary-300">Guest user</span>
                </p>
              }
              buttonClassName="!ring-offset-2 ring-offset-primary-50 dark:ring-offset-primary-800 rounded-md"
              menus={[
                {
                  label: 'Edit',
                  icon: HiPencil,
                  role: 'info',
                  onClick: () => console.log('edit'),
                },
                {
                  role: 'separator',
                },
                {
                  label: 'Delete',
                  role: 'destructive',
                  icon: HiTrash,
                  onClick: () => console.log('delete'),
                },
              ]}
              menuPositionX="end"
              menuPositionY="bottom"
            />
          </div>
          <Input name="name" label="Name" type="text" />
          <Input name="email" label="Email" type="email" />
          <Textarea
            name="message"
            label="Message"
            description={{
              text: 'Please be as detailed as possible.',
              icon: HiInformationCircle,
            }}
          />
          <ComboBox name="state" list={states} itemKey="name" />
          <Switch name="saveResponse" label="Save Response" />
          <SubmitButton title="Submit" slot="end" />
          <SubmitButtonRef innerRef={submitBtnRef} className="hidden" />
        </Form>
      </div>
      <div>
        <Button
          data-tooltip-top="some more information"
          onClick={() => submitBtnRef.current?.click()}
          shape="pill"
          weight="outline"
          color="green"
        >
          Submit Button Ref
        </Button>
      </div>
      <div className="relative h-32 w-full bg-lime-300 contrast:bg-blue-400">
        <div className="absolute inset-0 bg-grid-blue-500/20 [background-position:10px] dark:bg-grid-indigo-400">
          <button className="px-4 py-2 btn-orange" data-tooltip-bottom="Hi there! How are you doing?">
            Let see
          </button>
        </div>
      </div>
    </>
  );
};
export const Default = Template.bind({});
