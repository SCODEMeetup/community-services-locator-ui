import { connect } from 'react-redux';
import { select } from 'redux-modules/general';
import { getServices } from 'redux-modules/services/thunks';
import { markers } from 'redux-modules/services/paths';
import { toggleDrawer } from 'redux-modules/layout/drawer/thunks';

import Map from './mapClass';
import './map.scss';

const mapStateToProps = state => ({
  markers: select(markers, state),
});

const actions = {
  getServices,
  toggleDrawer,
};

export default connect(
  mapStateToProps,
  actions
)(Map);
