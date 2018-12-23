import { connect } from 'react-redux';
import { updateOpenDrawers } from 'redux-modules/layout/drawer/thunks';
import AppDrawer from './appDrawerClass';

import './appDrawer.scss';

const actions = {
  updateOpenDrawers,
};

export default connect(
  null,
  actions,
)(AppDrawer);
