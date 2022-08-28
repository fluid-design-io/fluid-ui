/* Source from flowbite-react */
import { PropsWithChildren } from 'react';

export interface ExcludeProps {
  key: string;
  source: Record<string, unknown>;
}

export const excludeClassName = (props: PropsWithChildren<object>): object => {
  return exclude({
    key: 'className',
    source: props,
  });
};

export const excludeOnChange = (props: PropsWithChildren<object>): object => {
  return exclude({
    key: 'onChange',
    source: props,
  });
};

export const excludeOnClick = (props: PropsWithChildren<object>): object => {
  return exclude({
    key: 'onClick',
    source: props,
  });
};

export const excludeOnBlur = (props: PropsWithChildren<object>): object => {
  return exclude({
    key: 'onBlur',
    source: props,
  });
};

export const excludeOnFocus = (props: PropsWithChildren<object>): object => {
  return exclude({
    key: 'onFocus',
    source: props,
  });
};
// a function that excludes onChange, onClick, onBlur, and onFocus from props
export const excludeOnChangeClickBlurFocus = (
  props: PropsWithChildren<object>
): object => {
  return excludes(['onChange', 'onClick', 'onBlur', 'onFocus'], props);
};

const exclude = ({ key, source }: ExcludeProps): object => {
  delete source[key];
  return source;
};

const excludes = (
  keys: string[],
  source: Record<string, unknown>
): Record<string, unknown> => {
  keys.forEach((key) => {
    delete source[key];
  });
  return source;
};

export default exclude;
