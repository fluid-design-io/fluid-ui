import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: {
  children: React.ReactNode;
} & FormikConfig<FormikValues>) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
