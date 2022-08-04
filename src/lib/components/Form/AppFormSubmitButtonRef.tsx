import { useFormikContext } from "formik";
import React from "react";
import clsxm from "../../helpers/clsxm";

const SubmitButtonRef = React.forwardRef(
  (
    {
      title = "Submit",
      slot = "start",
      ...props
    }: {
      title?: string;
      slot?: "start" | "end";
      [key: string]: any;
    },
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const { handleSubmit, isValid } = useFormikContext();
    return (
      <div className="flex justify-center">
        <button
          ref={ref}
          className={clsxm(props.className)}
          title={title}
          disabled={!isValid}
          onClick={() => {
            console.log("submit");
            handleSubmit();
          }}
          type="submit"
        >
          {title}
        </button>
      </div>
    );
  }
);

export default SubmitButtonRef;
