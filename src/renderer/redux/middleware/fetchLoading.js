import { equals } from 'ramda';
import {
  fetchLoadingCount,
  loadingType,
  showLoading,
} from 'redux-modules/layout/loading/paths';
import { BASIC_LOADING } from 'redux-modules/layout/loading/constants';
import { setstate } from 'redux-modules/general';

export default ({ dispatch }) => next => action => {
  if (action.type === '@@Set' && equals(action.meta, fetchLoadingCount)) {
    const currentLoadingFetches = action.payload;

    if (currentLoadingFetches > 0) {
      // enable loading
      dispatch(setstate(true, showLoading));
    } else {
      // reset loading state to defaults
      dispatch(setstate(false, showLoading));
      dispatch(setstate(BASIC_LOADING, loadingType));
    }
  }
  return next(action);
};
