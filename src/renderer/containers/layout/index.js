import { connect } from 'react-redux';

import { select, setstate } from 'redux-modules/general';

import { loadingType, showLoading } from 'redux-modules/layout/loading/paths';
import { isOpen } from 'redux-modules/layout/drawer/paths';
import {
  children,
  openCategory,
  openSubCategory,
  selectedServices,
} from 'redux-modules/services/paths';
import {
  getAllServiceChildren,
  getServiceLocations,
  getServices,
} from 'redux-modules/services/thunks';

import { toggleDrawer } from 'redux-modules/layout/drawer/thunks';
import { route } from 'redux-modules/router/paths';

import Layout from './layoutClass';

const mapStateToProps = state => ({
  children: select(children, state),
  loadingType: select(loadingType, state),
  isOpen: select(isOpen, state),
  openCategory: select(openCategory, state),
  openSubCategory: select(openSubCategory, state),
  route: select(route, state),
  showLoading: select(showLoading, state),
  selectedServices: select(selectedServices, state),
});

const actions = {
  getServices,
  getAllServiceChildren,
  getServiceLocations,
  toggleDrawer,
  setstate,
};

export default connect(
  mapStateToProps,
  actions
)(Layout);
