import './map.scss';

import { connect } from 'react-redux';

import { getServiceLocations } from 'redux-modules/services/thunks';

import MapViewClass from './mapClass';

const actions = {
  getServiceLocations,
};

export default connect(
  null,
  actions
)(MapViewClass);
