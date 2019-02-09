import { connect } from 'react-redux';
import { getServices } from 'redux-modules/services/thunks';
import { toggleDrawer } from 'redux-modules/layout/drawer/thunks';

import Map from './mapClass';
import './map.scss';


const actions = {
  getServices,
  toggleDrawer,
};

export default connect(
  null,
  actions
)(Map);
