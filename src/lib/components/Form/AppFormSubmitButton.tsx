import React from 'react';
import { useFormikContext } from 'formik';
import { Button, ButtonProps } from '../Button';

function SubmitButton({
  title,
  slot,
  children = title,
  ...props
}: {
  title?: string;
  slot?: 'start' | 'end' | undefined;
  children?: React.ReactNode;
  [key: string]: any;
} & ButtonProps) {
  const { handleSubmit, isValid, isSubmitting } = useFormikContext();
  return (
    <div className="flex justify-center">
      {slot === 'end' && <div className="flex-grow" />}
      <Button
        type="submit"
        disabled={!isValid}
        isLoading={isSubmitting}
        onClick={() => handleSubmit()}
        {...props}
      >
        {title || children}
      </Button>
      {slot === 'start' && <div className="flex-grow" />}
    </div>
  );
}

export default SubmitButton;
