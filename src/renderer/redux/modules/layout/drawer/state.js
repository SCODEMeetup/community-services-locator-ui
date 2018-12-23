import { LOGIN, SEDOKU } from 'redux-modules/router/constants';
import { LEFT } from 'redux-modules/layout/drawer/constants';

export default {
  openDrawers: {},
  sidesByRoute: {
    [LOGIN]: [LEFT],
    [SEDOKU]: [LEFT],
  },
};
