

import { connect } from 'react-redux';

import Map from './mapClass';
import './map.scss';

import { toggleDrawer } from 'redux-modules/layout/drawer/thunks';

const actions = { toggleDrawer };

export default connect(
    null,
    actions
)(Map);