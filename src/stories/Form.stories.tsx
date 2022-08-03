import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '../lib/components/Button';
import * as Yup from 'yup';

import {
  FluidButtonSizes,
  FluidButtonWeights,
} from '../lib/components/FluidUI/FluidTheme';
import {
  ComboBox,
  Form,
  Input,
  SubmitButton,
  SubmitButtonRef,
  Switch,
  Textarea,
} from '../lib/components/Form';
import { HiInformationCircle } from 'react-icons/hi';
import { states } from '../lib/helpers/data';
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

const Template: Story<StoryButtonProps> = args => {
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const initialValues = {
    name: '',
    email: '',
    message: '',
    state: 'California',
    saveResponse: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string().optional(),
    state: Yup.string().required('State is required'),
    saveResponse: Yup.boolean().required('Save response is required'),
  });
  console.log('submitBtnRef', submitBtnRef);
  return (
    <>
      <div className="w-4/5 max-w-lg mx-auto p-4 bg-white dark:bg-stone-900 shadow-lg shadow-gray-400/20 dark:shadow-black/30 rounded-xl">
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
          <h2 className="text-xl font-semibold pb-4 text-gray-700 dark:text-gray-200">
            Contact Us
          </h2>
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
          <SubmitButtonRef ref={submitBtnRef} className="hidden" />
        </Form>
      </div>
      <div>
        <Button
          onClick={() => submitBtnRef.current?.click()}
          shape="pill"
          weight="outline"
          color="green"
        >
          Submit Button Ref
        </Button>
      </div>
    </>
  );
};
export const Default = Template.bind({});
