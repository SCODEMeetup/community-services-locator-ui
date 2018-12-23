import { connect } from 'react-redux';
import { showToast } from 'redux-modules/layout/toast/thunks';

import ErrorBoundary from './errorBoundaryClass';

const actions = {
  showToast,
};

export default connect(
  null,
  actions,
)(ErrorBoundary);
