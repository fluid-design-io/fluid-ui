import { Formik, FormikConfig, FormikValues } from 'formik';
import React from 'react';

function AppForm({
  initialValues,
  children,
  ...props
}: {
  children: React.ReactNode;
} & FormikConfig<FormikValues>) {
  return (
    <Formik initialValues={initialValues} {...props}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
