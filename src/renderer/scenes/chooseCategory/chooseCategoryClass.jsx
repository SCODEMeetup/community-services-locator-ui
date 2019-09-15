import React from 'react';
import Button from 'components/button';
import { CATEGORY_LABELS } from 'redux-modules/services/constants';

import App, { router } from 'src/renderer';
import { ROUTE_CHOOSE_SUB_CATEGORY } from 'redux-modules/router/constants';
import { openCategory, selectedServices } from 'redux-modules/services/paths';
import { setstate } from 'redux-modules/general';

export default class ChooseCategory extends React.Component {
  componentDidMount() {
    // reset openCategory
    const { store } = App;

    store.dispatch(setstate('', openCategory));
  }

  // eslint-disable-next-line class-methods-use-this
  chooseCategory(id) {
    const { store } = App;

    // reset selected services
    store.dispatch(setstate({}, selectedServices));

    router.navigate(ROUTE_CHOOSE_SUB_CATEGORY, {
      cat: id,
    });
  }

  render() {
    return (
      <div className="choose-category layout-padding bg-black text-white flex flex-center column">
        <h1 className="text-center">
          Hi there! What can I help you find today?
        </h1>
        <div className="flex column no-wrap">
          {Object.keys(CATEGORY_LABELS).map(id => (
            <Button
              key={`cat${id}`}
              onClick={() => this.chooseCategory(id)}
              raised
              className="jumbo bg-primary text-white mb30">
              {CATEGORY_LABELS[id]}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}
