import { setstate, select } from 'redux-modules/general';
import { isOpen } from 'redux-modules/layout/drawer/paths';

export function toggleDrawer() {
  return (dispatch, getState) => {
    const currentState = select(isOpen, getState());

    dispatch(setstate(!currentState, isOpen));
  };
}

export default {
  toggleDrawer,
};
