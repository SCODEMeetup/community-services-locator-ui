import {
  addIndex,
  apply,
  compose,
  filter,
  fromPairs,
  join,
  isEmpty,
  isNil,
  map,
  pipe,
  reject,
  toPairs,
} from 'ramda';

export const concatClasses = compose(
  join(' '),
  reject(isEmpty)
);

export const filterWithKeys = (pred, obj) =>
  pipe(
    toPairs,
    filter(apply(pred)),
    fromPairs
  )(obj);

export const hasValue = val => !(isEmpty(val) || isNil(val));

export const mapIndexed = addIndex(map);

export const normalizeApiUrl = url => {
  const win = typeof window === 'undefined' ? global.window : window;
  return url && url.startsWith('/')
    ? `${win.location.origin}${process.env.REACT_APP_API_BASE_PATH}${url}`
    : url;
};

export default {
  concatClasses,
  filterWithKeys,
  hasValue,
  mapIndexed,
  normalizeApiUrl,
};
