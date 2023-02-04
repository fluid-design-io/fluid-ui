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
        className={clsxm(props.className)}
        disabled={!isValid}
        ref={innerRef}
        title={title}
        type='submit'
        onClick={() => {
          handleSubmit();
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default SubmitButtonRef;
