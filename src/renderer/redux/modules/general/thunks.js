import { setstate, select } from 'redux-modules/general';

// generic method that can be used updating a timestamp at a given path
export function stamp(path) {
  return dispatch => {
    const timestamp = new Date();
    dispatch(setstate(timestamp, path));
  };
}

/*
 * generic method that can be used to increment a value at a given path
 */
export function increment(path) {
  return (dispatch, getState) => {
    const number = select(path, getState()) || 0;
    dispatch(setstate(number + 1, path));
  };
}

/*
 * generic method that can be used to decrement a value at a given path
 */
export function decrement(path) {
  return (dispatch, getState) => {
    const number = select(path, getState()) || 0;
    dispatch(setstate(number - 1, path));
  };
}
