import { getSingleValue } from './getSingleValue';

export const useFormValue = ({
  rawName,
  values,
  errors,
  touched,
  placeholder = '',
  rawLabel = '',
}) => {
  const names = rawName.split('.');
  const error = getSingleValue(names, touched)
    ? getSingleValue(names, errors)
    : undefined;
  const name = names[names.length - 1];
  const value = getSingleValue(names, values);
  const label = rawLabel
    ? rawLabel
    : placeholder
    ? placeholder
    : `${name[0].toUpperCase()}${name.slice(1)}`;
  return { name, names, value, error, label };
};
