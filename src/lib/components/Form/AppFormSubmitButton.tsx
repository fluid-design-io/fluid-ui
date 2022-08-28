import { useFormikContext } from 'formik';
import React from 'react';
import { ButtonComponent, ButtonProps } from '../../../typing';
import { Button } from '../Button';

const SubmitButton: ButtonComponent = <C extends React.ElementType = 'button'>({
  title,
  slot,
  children = title,
  ...props
}: {
  title?: string;
  slot?: 'start' | 'end' | undefined;
  children?: React.ReactNode;
  [key: string]: any;
} & ButtonProps<C>) => {
  const { handleSubmit, isValid, isSubmitting } = useFormikContext();
  return (
    <div className='flex justify-center'>
      {slot === 'end' && <div className='flex-grow' />}
      <Button
        type='submit'
        disabled={!isValid}
        isLoading={isSubmitting}
        onClick={() => handleSubmit()}
        {...props}
      >
        {title || children}
      </Button>
      {slot === 'start' && <div className='flex-grow' />}
    </div>
  );
};

export default SubmitButton;
