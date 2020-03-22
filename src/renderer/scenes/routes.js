import {
  ROUTE_CHOOSE_CATEGORY,
  ROUTE_CHOOSE_SUB_CATEGORY,
  ROUTE_VIEW_MAP,
} from 'redux-modules/router/constants';

export default [
  { name: ROUTE_CHOOSE_CATEGORY, path: '/' },
  { name: ROUTE_CHOOSE_SUB_CATEGORY, path: '/:cat' },
  { name: ROUTE_VIEW_MAP, path: '/:cat?:sub' },
];
