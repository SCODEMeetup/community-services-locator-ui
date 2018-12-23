import { setstate } from 'redux-modules/general';
import { show, toast } from './paths';

export function showToast(content = null, options = {}) {
  const { buttonText, buttonType, callback, timeout, type } = options;

  return dispatch => {
    dispatch(
      setstate(
        {
          buttonText,
          buttonType,
          content,
          show: true,
          timeout: timeout || 2000,
          type,
          undoData: { callback },
        },
        toast
      )
    );
  };
}

export function resetToast() {
  return dispatch => dispatch(setstate(false, show));
}

export default {
  resetToast,
  showToast,
};
