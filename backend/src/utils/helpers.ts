import * as R from 'ramda';

// GLOBALLY USED FUNCTIONS
export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);
export const removeNullOrEmptyKeys = (object: any) =>
  R.filter((value: any) => !(isNilOrEmpty(value) || value === -1), object);
export const wait = (time: number) => {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve({});
    }, time);
  });
};
