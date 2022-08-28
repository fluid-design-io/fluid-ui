import { useFormikContext } from 'formik';
import React from 'react';

import clsxm from '../../helpers/clsxm';

const SubmitButtonRef = ({
  title = 'Submit',
  slot = 'start',
  innerRef,
  ...props
}: {
  title?: string;
  slot?: 'start' | 'end';
  innerRef?: React.Ref<HTMLButtonElement>;
  [key: string]: any;
}) => {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <div className='flex justify-center'>
      <button
        ref={innerRef}
        className={clsxm(props.className)}
        title={title}
        disabled={!isValid}
        onClick={() => {
          handleSubmit();
        }}
        type='submit'
      >
        {title}
      </button>
    </div>
  );
};

export default SubmitButtonRef;
