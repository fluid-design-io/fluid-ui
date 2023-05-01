import React from 'react';
import * as Yup from 'yup';

import { useRef, useState } from '@storybook/addons';
import { motion } from 'framer-motion';
import {
  HiChevronDown,
  HiInformationCircle,
  HiPencil,
  HiTrash,
} from 'react-icons/hi';
import { Button, Menu } from '../src/lib/components';

import {
  ComboBox,
  Form,
  Input,
  Select,
  SubmitButton,
  SubmitButtonRef,
  Switch,
  Textarea,
} from '../src/lib/components/Form';
import { states } from '../src/lib/helpers/data';
import { ButtonProps, FluidButtonSizes, FluidButtonWeights } from '../src/type';

export default {
  title: 'Components/Form',
  component: Button,
  args: {
    weight: 'normal' as keyof FluidButtonWeights,
    size: 'md' as keyof FluidButtonSizes,
    disabled: false,
  },
};
const Template = (args) => {
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<any>(null);
  const initialValues = {
    name: '',
    email: '',
    message: '',
    state: states[3],
    multiple: [states[0], states[1]],
    saveResponse: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string().optional(),
    state: Yup.object().required('State is required'),
    multiple: Yup.array().required('Multiple is required'),
    saveResponse: Yup.boolean().required('Save response is required'),
  });
  return (
    <>
      <div className='mx-auto mt-12 w-4/5 max-w-lg rounded-xl bg-white p-4 shadow-lg shadow-gray-400/20 dark:bg-gray-900 dark:shadow-black/30'>
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
          <h2 className='pb-4 text-xl font-semibold text-gray-700 contrast:bg-amber-300 dark:text-gray-200'>
            Contact Us
          </h2>
          <div className='relative mb-4 flex justify-between'>
            <div />
            <Menu
              buttonClassName='btn-light-[aqua]'
              iconEnd={HiChevronDown}
              iconStart={HiInformationCircle}
              label={'Actions'}
              menuPositionX='end'
              menuPositionY='bottom'
              size='xs'
              header={
                <p className='truncate py-3 px-3.5'>
                  <span className='mb-0.5 block text-xs text-gray-500 dark:text-gray-400'>
                    Signed in as
                  </span>
                  <span className='font-semibold text-gray-700 dark:text-gray-300'>
                    Guest user
                  </span>
                </p>
              }
              menus={[
                {
                  label: 'Edit',
                  iconStart: HiPencil,
                  role: 'info',
                  onClick: () => console.log('edit'),
                },
                {
                  role: 'separator',
                },
                {
                  label: 'Delete',
                  role: 'destructive',
                  iconStart: HiTrash,
                  onClick: () => console.log('delete'),
                },
              ]}
            />
          </div>
          <Input label='Name' name='name' type='text' />
          <Input label='Email' name='email' type='email' />
          <Textarea
            label='Message'
            name='message'
            description={{
              text: 'Please be as detailed as possible.',
              icon: HiInformationCircle,
            }}
          />
          <ComboBox itemKey='name' list={states} name='state' />
          <Select itemKey='name' list={states} name='state' />
          <Select itemKey='name' list={states} name='multiple' multiple />
          <Switch label='Save Response' name='saveResponse' />
          <SubmitButton slot='end' title='Submit' />
          <SubmitButtonRef className='hidden' innerRef={submitBtnRef} />
        </Form>
      </div>
      <div>
        <Button
          color='green'
          data-tooltip-top='some more information'
          onClick={(e) => submitBtnRef.current?.click()}
          shape='pill'
          weight='outline'
        >
          Submit Button Ref
        </Button>
      </div>
      <div className='flex w-full flex-row items-center justify-center'>
        <Button className='btn-clear-primary'>Submit Button Ref</Button>
        <Button
          animate={{ y: 0 }}
          as={motion.a}
          className='btn-clear-amber'
          color='amber'
          iconOnly
          initial={{ y: -10 }}
          shape='pill'
          weight='clear'
        >
          <HiTrash />
        </Button>
      </div>
      <div className='w-full relative h-32 contrast:bg-blue-400'>
        <div className='absolute inset-0 bg-grid-blue-500/20 [background-position:10px] dark:bg-grid-indigo-400'>
          <Button
            as='div'
            className='hocus:backdrop-blur-2xl backdrop-blur-none'
            color='red'
            data-tooltip-bottom='Hi there! How are you doing?'
            iconOnly
            shape='pill'
            weight='clear'
          >
            <HiTrash />
          </Button>
          <Button
            data-tooltip-bottom='Hi there! How are you doing?'
            iconOnly
            shape='pill'
            weight='clear'
            className='btn-yellow'
            icon={HiTrash}
            sr='Delete'
          />
        </div>
      </div>
    </>
  );
};
export const Default = Template.bind({});
