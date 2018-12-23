import { contains } from 'ramda';

import { TEST_BOTTOM_SHEET } from 'redux-modules/router/constants';

export function isBottomSheet(scene) {
  return contains(scene, [TEST_BOTTOM_SHEET]);
}

export default {
  isBottomSheet,
};
