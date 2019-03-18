import { connect } from 'react-redux';

import { select, setstate } from 'redux-modules/general';

import { loadingType, showLoading } from 'redux-modules/layout/loading/paths';
import { isOpen } from 'redux-modules/layout/drawer/paths';
import {
  children,
  menu,
  openCategories,
  selectedServices,
} from 'redux-modules/services/paths';
import {
  getServiceChildren,
  getServiceLocations,
} from 'redux-modules/services/thunks';

import { toggleDrawer } from 'redux-modules/layout/drawer/thunks';
import { route } from 'redux-modules/router/paths';

import Layout from './layoutClass';

const mapStateToProps = state => ({
  children: select(children, state),
  loadingType: select(loadingType, state),
  isOpen: select(isOpen, state),
  menu: select(menu, state),
  openCategories: select(openCategories, state),
  route: select(route, state),
  showLoading: select(showLoading, state),
  selectedServices: select(selectedServices, state),
});

const actions = {
  getServiceChildren,
  getServiceLocations,
  toggleDrawer,
  setstate,
};

export default connect(
  mapStateToProps,
  actions
)(Layout);
