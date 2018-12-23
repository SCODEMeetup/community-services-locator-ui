import { connect } from 'react-redux';

import { select } from 'redux-modules/general';

import { loadingType, showLoading } from 'redux-modules/layout/loading/paths';
import { openDrawers, sidesByRoute } from 'redux-modules/layout/drawer/paths';
import { route } from 'redux-modules/router/paths';

import Layout from './layoutClass';

const mapStateToProps = state => ({
  loadingType: select(loadingType, state),
  openDrawers: select(openDrawers, state),
  route: select(route, state),
  showLoading: select(showLoading, state),
  sidesByRoute: select(sidesByRoute, state),
});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Layout);
