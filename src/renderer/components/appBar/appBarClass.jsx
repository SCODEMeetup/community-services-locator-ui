import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Icon from 'components/icon';
import Button from 'components/button';

import { concatClasses } from 'redux-modules/general/utils';

export default class CustomAppBar extends React.Component {
  static defaultProps = {
    children: '',
    menu: [],
    openDrawer: () => {},
    getServiceChildren: () => {},
    tall: false,
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    getServiceChildren: PropTypes.func,
    menu: PropTypes.array,
    openDrawer: PropTypes.func,
    showAppBar: PropTypes.bool.isRequired,
    tall: PropTypes.bool,
  };

  _renderCategories = () => {
    const categories = [];
    const { getServiceChildren, menu, openDrawer } = this.props;

    if (menu.length > 0) {
      menu.forEach(item => {
        // eslint-disable-next-line react/button-has-type
        categories.push(
          <Button
            key={item.id}
            color="white"
            onClick={() => {
              console.log('id', item);
              getServiceChildren(item.id);
              openDrawer();
            }}
          >
            {item.description}
          </Button>
        );
      });
    }
    return categories;
  };

  render() {
    const classNames = [
      'appBar',
      !this.props.showAppBar ? '-hide' : '',
      this.props.tall ? '-tall' : '',
    ];

    return (
      <AppBar className={concatClasses(classNames)} flat>
        <Icon icon="logo" size="xlg" />
        <div className="spacer" />
        {this._renderCategories()}
      </AppBar>
    );
  }
}
