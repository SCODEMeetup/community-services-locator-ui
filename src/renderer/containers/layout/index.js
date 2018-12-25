import { connect } from 'react-redux';

import { select } from 'redux-modules/general';

import { loadingType, showLoading } from 'redux-modules/layout/loading/paths';
import { isOpen } from 'redux-modules/layout/drawer/paths';
import { toggleDrawer } from 'redux-modules/layout/drawer/thunks';
import { route } from 'redux-modules/router/paths';

import Layout from './layoutClass';

const mapStateToProps = state => ({
  loadingType: select(loadingType, state),
  isOpen: select(isOpen, state),
  route: select(route, state),
  showLoading: select(showLoading, state),
});

const actions = {
  toggleDrawer,
};

export default connect(
  mapStateToProps,
  actions
)(Layout);
