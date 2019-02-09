import { select, setstate } from 'redux-modules/general';
import { includes, filter, pluck } from 'ramda';
import { children, menu } from 'redux-modules/services/paths';
import { requestUrl } from 'redux-modules/general/request';
import { GET } from 'redux-modules/general/constants';

export function getServices(taxId = 10) {
  return dispatch => {
    dispatch(
      // requestUrl(`https://mofb-api.appspot.com/api/v1/taxonomy/10/children`, GET, {
      requestUrl(
        `https://mofb-api.appspot.com/api/v1/taxonomy/${taxId}/children`,
        GET,
        {
          successToast: 'successfully grabbed services',
          errorToast: 'failed to fetch services',
        }
      )
    )
      .then(response => {
        dispatch(setstate(response, menu));
        return;
      })
      .catch(console.error);
  };
}

export function getServiceChildren(taxId) {
  return (dispatch, getState) => {
    dispatch(
      // requestUrl(`https://mofb-api.appspot.com/api/v1/taxonomy/10/children`, GET, {
      requestUrl(
        `https://mofb-api.appspot.com/api/v1/taxonomy/${taxId}/children`,
        GET,
        {
          successToast: 'successfully grabbed services',
          errorToast: 'failed to fetch services',
        }
      )
    )
      .then(response => {
        const currentState = pluck('TAXON_ID', select(children, getState()));
        const data = filter(
          item => !includes(item.TAXON_ID, currentState),
          response
        );
        const currentChildren = [...select(children, getState()), ...data];

        dispatch(setstate(currentChildren, children));
        return;
      })
      .catch(console.error);
  };
}

export default {
  getServices,
};
