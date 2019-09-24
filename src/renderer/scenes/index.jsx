import { ROUTE_CHOOSE_CATEGORY, ROUTE_CHOOSE_SUB_CATEGORY, ROUTE_VIEW_MAP } from 'redux-modules/router/constants';

import ChooseCategoryView from './chooseCategory';
import ChooseSubCategoryView from './chooseSubCategory';
import MapView from './map';

export default {
  [ROUTE_CHOOSE_CATEGORY]: ChooseCategoryView,
  [ROUTE_CHOOSE_SUB_CATEGORY]: ChooseSubCategoryView,
  [ROUTE_VIEW_MAP]: MapView,
};
