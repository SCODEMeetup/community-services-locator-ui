import { connect } from 'react-redux';
import { select } from 'redux-modules/general';

import { goTo } from 'redux-modules/router/thunks';
import { routeName } from 'redux-modules/router/paths';

import StandardLeftDrawer from './standardLeftDrawerClass';

const mapStateToProps = state => ({
  routeName: select(routeName, state),
});

const actions = {
  goTo,
};

export default connect(
  mapStateToProps,
  actions,
)(StandardLeftDrawer);
