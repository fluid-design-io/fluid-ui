import { useFormikContext } from 'formik';
import React from 'react';
import { ButtonComponent, ButtonProps } from '../../../type';
import clsxm from '../../helpers/clsxm';
import { excludeClassName } from '../../helpers/exclude';
import { Button } from '../Button';

const SubmitButton: ButtonComponent = <C extends React.ElementType = 'button'>({
  title,
  slot,
  className,
  children = title,
  ...props
}: {
  title?: string;
  slot?: 'start' | 'end' | undefined;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
} & ButtonProps<C>) => {
  const { handleSubmit, isValid, isSubmitting, dirty } = useFormikContext();
  const theirProps = excludeClassName(props);
  return (
    <Button
      className={clsxm(className)}
      disabled={!(dirty && isValid)}
      isLoading={isSubmitting}
      onClick={() => handleSubmit()}
      type='submit'
      {...theirProps}
    >
      {title || children}
    </Button>
  );
};

export default SubmitButton;
