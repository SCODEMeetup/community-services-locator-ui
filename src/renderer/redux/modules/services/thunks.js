import { select, setstate } from 'redux-modules/general';
import { includes, filter, pluck, without, uniqBy } from 'ramda';
import {
  children,
  markers,
  menu,
  openCategory,
} from 'redux-modules/services/paths';
import { requestUrl } from 'redux-modules/general/request';
import { GET } from 'redux-modules/general/constants';

const LIMIT = 2000;

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
        return dispatch(setstate(response, menu));
      })
      .catch(console.error);
  };
}

export function getServiceChildren(taxId) {
  return (dispatch, getState) => {
    let uri = `https://mofb-api.appspot.com/api/v2/taxonomy/${taxId}/children`;
    if (taxId === '11') {
      uri = `https://mofb-api.appspot.com/api/v2/taxonomy/food`;
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

        dispatch(setstate(taxId, openCategory));
        return dispatch(setstate(currentChildren, children));
      })
      .catch(console.error);
  };
}

export function getSpecificLocations(taxId, agencyId, showMarkers) {
  return (dispatch, getState) => {
    dispatch(
      requestUrl(
        `https://mofb-api.appspot.com/api/v2/location?taxonomyId=${taxId}&agencyId=${agencyId.toString()}&limit=${LIMIT}`,
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

        return dispatch(
          setstate(uniqBy(item => item.id, currentMarkers), markers)
        );
      })
      .catch(console.error);
  };
}

export function getServiceLocations(taxId, showMarkers) {
  return dispatch => {
    dispatch(
      requestUrl(
        `https://mofb-api.appspot.com/api/v2/agency?taxonomyId=${taxId}&limit=${LIMIT}`,
        GET,
        {
          successToast: 'successfully grabbed locations',
          errorToast: 'failed to fetch locations',
        }
      )
    )
      .then(response => {
        const agencyIds = pluck('id', response);
        return dispatch(getSpecificLocations(taxId, agencyIds, showMarkers));
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
