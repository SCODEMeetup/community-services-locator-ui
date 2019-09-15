import React from 'react';
import Button from 'components/button';
import PropTypes from 'prop-types';
import { take } from 'ramda';
import { randomNumberBetween } from 'src/utils';
import { CATEGORY_LABELS } from 'redux-modules/services/constants';
import { router, store } from 'src/renderer';
import { ROUTE_VIEW_MAP } from 'redux-modules/router/constants';
import { setstate } from 'redux-modules/general';
import { markers, selectedServices } from 'redux-modules/services/paths';

const SHOW_ITEMS_COUNT = 5;

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

      if (subCats && subCats[id]) {
        return subCats[id].sort(
          (cat1, cat2) => parseInt(cat1.level, 10) - parseInt(cat2.level, 10)
        );
      }
    }

    return [];
  }

  subCategories() {
    return this.state.showMore
      ? this._subCategories()
      : take(SHOW_ITEMS_COUNT, this._subCategories());
  }

  showMoreButton() {
    return this._subCategories().length > SHOW_ITEMS_COUNT;
  }

  toggleAllSubCategories() {
    this.setState(state => ({
      showMore: !state.showMore,
    }));
  }

  chooseSubCategory(id) {
    // clear old markers and selected services
    store.dispatch(
      setstate(
        {
          [this.props.openCategory]: {
            [id]: true,
          },
        },
        selectedServices
      )
    );
    store.dispatch(setstate([], markers));

    // open the map
    router.navigate(ROUTE_VIEW_MAP, {
      cat: this.props.openCategory,
      sub: id,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  positivePhrase() {
    const phrases = ['Ok!', 'Awesome!', 'Great!', 'Alrighty!', 'Sweet!'];

    return phrases[randomNumberBetween(0, phrases.length - 1)];
  }

  categoryName() {
    const id = this.props.openCategory;

    if (id && CATEGORY_LABELS[id]) {
      return CATEGORY_LABELS[id];
    }

    return '';
  }

  _renderMoreButton() {
    if (this.showMoreButton()) {
      return (
        <Button
          className="jumbo bg-dark text-white"
          onClick={() => this.toggleAllSubCategories()}>
          Show {this.state.showMore ? 'Less' : 'More'}
        </Button>
      );
    }

    return null;
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
          {this._renderMoreButton()}
        </div>
      </div>
    );
  }
}
