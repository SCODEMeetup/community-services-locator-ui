import { clone } from 'ramda';
import { actions as routerActions } from 'redux-router5';

import { resetToast } from 'redux-modules/layout/toast/thunks';
import { select, setstate } from 'redux-modules/general';

import { lastMainRoute, lastMainRouteName } from 'redux-modules/router/paths';
import { isBottomSheet } from 'redux-modules/router/utils';
import { LOGIN, SHEET } from 'redux-modules/router/constants';

export function goTo(scene, params = {}) {
  return (dispatch, getState) =>
    new Promise(resolve => {
      const newParams = clone(params);

      dispatch(resetToast());

      if (isBottomSheet(scene)) {
        newParams.type = SHEET;
        newParams.parent = select(lastMainRouteName, getState()) || LOGIN;
        resolve(dispatch(routerActions.navigateTo(scene, newParams)));
      } else {
        dispatch(setstate({ name: scene, params }, lastMainRoute));
        resolve(dispatch(routerActions.navigateTo(scene, newParams)));
      }
    });
}

export function returnFromRoute() {
  return (dispatch, getState) =>
    new Promise(resolve => {
      const lastMainRouteInfo = select(lastMainRoute, getState()) || {
        name: LOGIN,
      };
      resolve(dispatch(goTo(lastMainRouteInfo.name, lastMainRouteInfo.params)));
    });
}

export default {
  goTo,
  returnFromRoute,
};
