import { select, setstate } from 'redux-modules/general';
import { includes, filter, pluck, without } from 'ramda';
import { children, markers, menu } from 'redux-modules/services/paths';
import { requestUrl } from 'redux-modules/general/request';
import { GET } from 'redux-modules/general/constants';

export function getServices(taxId = 10) {
  return dispatch => {
    dispatch(
      requestUrl(
        `https://mofb-api.appspot.com/api/v2/taxonomy/${taxId}/children`,
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
    let uri = `https://mofb-api.appspot.com/api/v2/taxonomy/${taxId}/children`;
    if (taxId === '11') {
      uri = 'https://mofb-api.appspot.com/api/v2/taxonomy/food';
    }
    dispatch(
      requestUrl(uri, GET, {
        successToast: 'successfully grabbed services',
        errorToast: 'failed to fetch services',
      })
    )
      .then(response => {
        const currentChildren = {
          ...select(children, getState()),
          [taxId]: response,
        };

        dispatch(setstate(currentChildren, children));
        return;
      })
      .catch(console.error);
  };
}

export function getSpecificLocations(taxId, agencyId, showMarkers) {
  return (dispatch, getState) => {
    dispatch(
      requestUrl(
        `https://mofb-api.appspot.com/api/v2/location?taxonomyId=${taxId}&agencyId=${agencyId.toString()}`,
        GET,
        {
          successToast: 'successfully grabbed locations',
          errorToast: 'failed to fetch locations',
        }
      )
    )
      .then(response => {
        let currentMarkers = [];
        if (showMarkers) {
          const currentState = pluck('id', select(markers, getState()));
          const data = filter(
            item => !includes(item.id, currentState),
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

export function getServiceLocations(taxId, showMarkers) {
  return dispatch => {
    dispatch(
      requestUrl(
        `https://mofb-api.appspot.com/api/v2/agency?taxonomyId=${taxId}`,
        GET,
        {
          successToast: 'successfully grabbed locations',
          errorToast: 'failed to fetch locations',
        }
      )
    )
      .then(response => {
        const agencyIds = pluck('id', response);
        dispatch(getSpecificLocations(taxId, agencyIds, showMarkers));
        return;
      })
      .catch(console.error);
  };
}

export default {
  getServiceChildren,
  getServiceLocations,
  getSpecificLocations,
  getServices,
};
