type getUserClassNamesProps = (
  className?: string | undefined
) => string[] | Array<string | undefined>;

/* inherClassNames from className, only include the className that starts with 'flex-', 'items-', 'justify-', 'gap-'*/

export const getUserFlexClassNames: getUserClassNamesProps = (
  className?: string | undefined
) =>
  (className && className.split(' ').filter((c) => c.startsWith('flex-'))) ||
  [];
export const getUserItemsClassNames: getUserClassNamesProps = (
  className?: string | undefined
) =>
  (className && className.split(' ').filter((c) => c.startsWith('items-'))) ||
  [];
export const getUserJustifyClassNames: getUserClassNamesProps = (
  className?: string | undefined
) =>
  (className && className.split(' ').filter((c) => c.startsWith('justify-'))) ||
  [];
export const getUserGapClassNames: getUserClassNamesProps = (
  className?: string | undefined
) =>
  (className && className.split(' ').filter((c) => c.startsWith('gap-'))) || [];
export const getUserClassNames: getUserClassNamesProps = (
  className?: string | undefined
) => [
  ...getUserFlexClassNames(className),
  ...getUserItemsClassNames(className),
  ...getUserJustifyClassNames(className),
  ...getUserGapClassNames(className),
];
