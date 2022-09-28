import { Meta, Story } from '@storybook/react/types-6-0';
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
  FluidButtonSizes,
  FluidButtonWeights,
} from '../src/lib/components/FluidUI/FluidTheme';
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
import { ButtonProps } from '../src/type';

export default {
  title: 'Components/Form',
  component: Button,
  args: {
    weight: 'normal' as keyof FluidButtonWeights,
    size: 'md' as keyof FluidButtonSizes,
    disabled: false,
  },
} as Meta;

type StoryButtonProps = ButtonProps<'button'>;

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
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string().optional(),
    state: Yup.string().required('State is required'),
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
              label={'Actions'}
              iconEnd={HiChevronDown}
              iconStart={HiInformationCircle}
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
              buttonClassName='btn-light-[aqua]'
              size='xs'
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
              menuPositionX='end'
              menuPositionY='bottom'
            />
          </div>
          <Input name='name' label='Name' type='text' />
          <Input name='email' label='Email' type='email' />
          <Textarea
            name='message'
            label='Message'
            description={{
              text: 'Please be as detailed as possible.',
              icon: HiInformationCircle,
            }}
          />
          <ComboBox name='state' list={states} itemKey='name' />
          <Select name='state' list={states} itemKey='name' />
          <Switch name='saveResponse' label='Save Response' />
          <SubmitButton title='Submit' slot='end' />
          <SubmitButtonRef innerRef={submitBtnRef} className='hidden' />
        </Form>
      </div>
      <div>
        <Button
          as='a'
          href='#'
          data-tooltip-top='some more information'
          onClick={() => submitBtnRef.current?.click()}
          shape='pill'
          weight='outline'
          color='green'
        >
          Submit Button Ref
        </Button>
      </div>
      <div className='flex w-full flex-row items-center justify-center'>
        <Button className='btn-clear-primary'>Submit Button Ref</Button>
      </div>
      <div className='w-ful relative h-32 contrast:bg-blue-400'>
        <div className='absolute inset-0 bg-grid-blue-500/20 [background-position:10px] dark:bg-grid-indigo-400'>
          <Button
            color='red'
            as='div'
            weight='clear'
            shape='pill'
            iconOnly
            data-tooltip-bottom='Hi there! How are you doing?'
            className='hocus:backdrop-blur-2xl backdrop-blur-none'
          >
            <HiTrash />
          </Button>
          <Button
            color='blue'
            weight='clear'
            shape='pill'
            iconOnly
            data-tooltip-bottom='Hi there! How are you doing?'
          >
            <HiTrash />
          </Button>
          <Button
            as={motion.a}
            color='amber'
            weight='clear'
            shape='pill'
            iconOnly
            initial={{ y: -10 }}
            animate={{ y: 0 }}
          >
            <HiTrash />
          </Button>
        </div>
      </div>
    </>
  );
};
export const Default = Template.bind({});
