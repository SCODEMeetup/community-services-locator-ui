import { select, setstate } from 'redux-modules/general';
import { includes, filter, pluck, without } from 'ramda';
import { children, markers, menu } from 'redux-modules/services/paths';
import { requestUrl } from 'redux-modules/general/request';
import { GET } from 'redux-modules/general/constants';

export function getServices(taxId = 10) {
  return dispatch => {
    dispatch(
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

export function getServiceLocations(taxId, showMarkers) {
  return (dispatch, getState) => {
    dispatch(
      requestUrl(
        `https://mofb-api.appspot.com/api/v1/agency?taxonomyId=${taxId}`,
        GET,
        {
          successToast: 'successfully grabbed agencies',
          errorToast: 'failed to fetch agencies',
        }
      )
    )
      .then(response => {
        let currentMarkers = [];
        if (showMarkers) {
          const currentState = pluck('TAXON_ID', select(markers, getState()));
          const data = filter(
            item => !includes(item.TAXON_ID, currentState),
            response
          );
          currentMarkers = [...select(markers, getState()), ...data];
        } else {
          currentMarkers = without(response, select(markers, getState()));
        }

        dispatch(setstate(currentMarkers, markers));
        return;
      })
      .catch(console.error);
  };
}

export default {
  getServiceChildren,
  getServiceLocations,
  getServices,
};
