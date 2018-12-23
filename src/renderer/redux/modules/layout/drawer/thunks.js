import { contains, equals, findIndex, insert, remove } from 'ramda';
import { setstate, select } from 'redux-modules/general';
import { openDrawers } from 'redux-modules/layout/drawer/paths';
import { routeName } from 'redux-modules/router/paths';

export function updateOpenDrawers(isOpen, side) {
  return (dispatch, getState) => {
    const scene = select(routeName, getState());
    const drawerPath = [...openDrawers, scene];
    const routeDrawers = select(drawerPath, getState()) || [];

    if (isOpen && !contains(side, routeDrawers)) {
      dispatch(setstate(insert(0, side, routeDrawers), drawerPath));
    } else if (!isOpen && contains(side, routeDrawers)) {
      const removeIndex = findIndex(equals(side))(routeDrawers);
      dispatch(setstate(remove(removeIndex, 1, routeDrawers), drawerPath));
    }
  };
}

export default {
  updateOpenDrawers,
};
