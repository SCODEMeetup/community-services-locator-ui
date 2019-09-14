import './appBar.scss';

import { connect } from 'react-redux';

import { select } from 'redux-modules/general';
import { openCategory, openSubCategory } from 'redux-modules/services/paths';

import CustomAppBar from './appBarClass';

const mapStateToProps = state => ({
  openCategory: select(openCategory, state),
  openSubCategory: select(openSubCategory, state),
});

export default connect(
  mapStateToProps,
)(CustomAppBar);
