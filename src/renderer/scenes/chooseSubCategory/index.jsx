import './chooseSubCategory.scss';

import { connect } from 'react-redux';

import { select } from 'redux-modules/general';
import { children, openCategory } from 'redux-modules/services/paths';
import { getServiceChildren } from 'redux-modules/services/thunks';
import ChooseSubCategory from './chooseSubCategoryClass';

const mapStateToProps = state => ({
  openCategory: select(openCategory, state),
  subCategories: select(children, state),
});

const actions = {
  getServiceChildren,
};

export default connect(
  mapStateToProps,
  actions
)(ChooseSubCategory);
