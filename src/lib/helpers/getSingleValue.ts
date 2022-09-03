export const getSingleValue = (names: string[], values: any) => {
  if (values === undefined) {
    return undefined;
  }
  if (names.length === 1) {
    return values[names[0]];
  }
  return getSingleValue(names.slice(1), values[names[0]]);
};
