import { select, setstate } from 'redux-modules/general';
import { includes, filter, pluck, without, uniqBy } from 'ramda';
import {
  children,
  markers,
  menu,
  openCategory,
  openSubCategory,
} from 'redux-modules/services/paths';
import { requestUrl } from 'redux-modules/general/request';
import { GET } from 'redux-modules/general/constants';
import { API_URL } from 'redux-modules/services/constants';
import { CATEGORY_LABELS } from 'redux-modules/services/constants';

const LIMIT = 2000;

export function getServices(taxId = 10) {
  return dispatch =>
    dispatch(
      requestUrl(`${API_URL}/taxonomy/${taxId}/children`, GET, {
        successToast: 'successfully grabbed services',
        errorToast: 'failed to fetch services',
      })
    )
      .then(response => dispatch(setstate(response, menu)))
      .catch(console.error);
}

export function getAllServiceChildren() {
  return dispatch => {
    Object.keys(CATEGORY_LABELS).forEach(taxId => {
      dispatch(getServiceChildren(taxId));
    });
  };
}

export function getServiceChildren(taxId) {
  return (dispatch, getState) => {
    // check if the children have already been retrieved first
    let currentChildren = { ...select(children, getState()) };

    if (currentChildren[taxId] && currentChildren[taxId].length) {
      dispatch(setstate(taxId, openCategory));
      return Promise.resolve(currentChildren[taxId]);
    }

    const uri = `${API_URL}/taxonomy/${taxId}/children`;

    return dispatch(
      requestUrl(uri, GET, {
        successToast: 'successfully grabbed services',
        errorToast: 'failed to fetch services',
      })
    )
      .then(response => {
        // add the child services to the current children
        currentChildren = {
          ...currentChildren,
          [taxId]: response,
        };

        dispatch(setstate(taxId, openCategory));
        return dispatch(setstate(currentChildren, children));
      })
      .catch(console.error);
  };
}

export function getSpecificLocations(taxId, showMarkers) {
  return (dispatch, getState) =>
    dispatch(
      requestUrl(`${API_URL}/location`, GET, {
        qs: {
          taxonomyId: taxId,
          limit: LIMIT,
        },
        successToast: 'successfully grabbed locations',
        errorToast: 'failed to fetch locations',
      })
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
        dispatch(setstate(taxId, openSubCategory));
        return dispatch(
          setstate(uniqBy(item => item.id, currentMarkers), markers)
        );
      })
      .catch(console.error);
}

export function getServiceLocations(taxId, showMarkers) {
  return dispatch =>
    dispatch(getSpecificLocations(taxId, showMarkers)).catch(console.error);
}

export default {
  getServiceChildren,
  getServiceLocations,
  getSpecificLocations,
  getServices,
};
