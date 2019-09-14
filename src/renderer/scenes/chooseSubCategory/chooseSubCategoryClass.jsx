import React from 'react';
import Button from 'components/button';
import PropTypes from 'prop-types';
import { take } from 'ramda';
import { randomNumberBetween } from 'src/utils';
import { CATEGORY_LABELS } from 'redux-modules/services/constants';
import { router } from 'src/renderer';
import { ROUTE_VIEW_MAP } from 'redux-modules/router/constants';

export default class ChooseCategory extends React.Component {
  static defaultProps = {
    openCategory: null,
    subCategories: {},
  };

  static propTypes = {
    openCategory: PropTypes.string,
    getServiceChildren: PropTypes.func.isRequired,
    subCategories: PropTypes.object,
  };

  state = {
    showMore: false,
  };

  componentDidMount() {
    const route = router.getState();
    const { cat } = route.params;
    if (cat) {
      this.props.getServiceChildren(cat);
    }
  }

  _subCategories() {
    if (this.props.openCategory) {
      const id = this.props.openCategory;

      const subCats = this.props.subCategories;

      if(subCats && subCats[id]){
        return subCats[id];
      }
    }

    return [];
  }

  subCategories() {
    return this.state.showMore
      ? this._subCategories()
      : take(5, this._subCategories());
  }

  toggleAllSubCategories() {
    this.setState(state => ({
      showMore: !state.showMore,
    }));
  }

  chooseSubCategory(id) {
    router.navigate(ROUTE_VIEW_MAP, {
      cat: this.props.openCategory,
      sub: id,
    });
  }

  positivePhrase() {
    const phrases = ['Ok!', 'Awesome!', 'Great!', 'Alrighty!', 'Sweet!'];

    return phrases[randomNumberBetween(0, phrases.length - 1)];
  }

  categoryName() {
    const id = this.props.openCategory;

    if(id && CATEGORY_LABELS[id]){
      return CATEGORY_LABELS[id];
    }

    return '';
  }

  render() {
    return (
      <div className="choose-sub-category layout-padding bg-black text-white flex flex-center column">
        <h1 className="text-center">
          {`${this.positivePhrase()} What type of ${this.categoryName()} would you like to find?`}
        </h1>
        <div className="flex column no-wrap">
          {this.subCategories().map(cat => (
            <Button
              key={cat.id}
              className="jumbo bg-primary text-white wrap-lines mb30"
              raised
              onClick={() => this.chooseSubCategory(cat.id)}>
              {cat.description}
            </Button>
          ))}
          <Button
            className="jumbo bg-dark text-white"
            onClick={() => this.toggleAllSubCategories()}>
            Show {this.state.showMore ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
    );
  }
}
