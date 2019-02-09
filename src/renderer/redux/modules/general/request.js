import { isNil } from 'ramda';
import { showToast } from 'redux-modules/layout/toast/thunks';
import {
  ERROR_TOAST,
  SUCCESS_TOAST,
} from 'redux-modules/layout/toast/constants';
import {
  fetchLoadingCount,
  fetchUrl,
  loadingType,
} from 'redux-modules/layout/loading/paths';
import { BASIC_INNER_MAIN } from 'redux-modules/layout/loading/constants';
import { setstate } from 'redux-modules/general';
import { decrement, increment } from 'redux-modules/general/thunks';
import request from 'request';

function wrapRequest(options) {
  return () =>
    new Promise((resolve, reject) => {
      options.headers = options.headers || {};

      request(options, (err, resp, body) => {
        if (err || isNil(resp)) {
          console.error(
            'error making request - error=',
            err,
            'resp=',
            resp,
            'body=',
            body
          );

          reject(err);
        } else if (resp.statusCode < 200 || resp.statusCode > 299) {
          console.error(
            'error response from request - resp=',
            resp,
            'body=',
            body
          );

          reject(body, resp);
        } else {
          console.debug('success making request - resp=', resp, 'body=', body);
          resolve(body, resp);
        }
      });
    });
}

export function requestUrl(url, method, optional = {}) {
  return dispatch =>
    new Promise((resolve, reject) => {
      const { body, errorToast, loading, successToast, qs } = optional;

      dispatch(setstate(url, fetchUrl));
      dispatch(setstate(loading || BASIC_INNER_MAIN, loadingType));
      dispatch(increment(fetchLoadingCount));

      const options = {
        body,
        json: true,
        method,
        qs,
        uri: url,
      };

      return dispatch(wrapRequest(options))
        .then(response => {
          if (successToast) {
            dispatch(showToast(successToast, { type: SUCCESS_TOAST }));
          }

          dispatch(decrement(fetchLoadingCount));
          resolve(response);
        })
        .catch(error => {
          if (errorToast) {
            dispatch(showToast(errorToast, { type: ERROR_TOAST }));
          } else if (error.message && typeof error.message === 'string') {
            dispatch(showToast(error.message, { type: ERROR_TOAST }));
          } else if (error.title) {
            dispatch(showToast(error.title, { type: ERROR_TOAST }));
          }

          dispatch(decrement(fetchLoadingCount));
          reject(error);
        });
    });
}

export default {
  requestUrl,
};
