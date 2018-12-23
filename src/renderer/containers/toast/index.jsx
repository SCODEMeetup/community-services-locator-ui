import { connect } from 'react-redux';
import { select } from 'redux-modules/general';
import { toast } from 'redux-modules/layout/toast/paths';
import { resetToast } from 'redux-modules/layout/toast/thunks';

import Toast from './toastClass';

const mapStateToProps = state => ({
  toast: select(toast, state),
});

const actions = {
  resetToast,
};

export default connect(
  mapStateToProps,
  actions,
)(Toast);
