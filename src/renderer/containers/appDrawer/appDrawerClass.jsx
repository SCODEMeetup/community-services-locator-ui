import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'components/drawer';

import { LEFT } from 'redux-modules/layout/drawer/constants';

import StandardLeftDrawer from './standardLeftDrawer';

export default class AppDrawer extends React.Component {
  static propTypes = {
    openDrawers: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    updateOpenDrawers: PropTypes.func.isRequired,
  };

  _getDrawer() {
    if (this.props.side === LEFT) {
      return { container: StandardLeftDrawer, open: true };
    }

    switch (this.props.route) {
      default:
        return null;
    }
  }

  render() {
    const drawer = this._getDrawer();
    if (drawer) {
      return (
        <Drawer
          openDefault={drawer.open}
          openDrawers={this.props.openDrawers}
          route={this.props.route}
          side={this.props.side}
          updateOpenDrawers={this.props.updateOpenDrawers}
        >
          {createElement(drawer.container)}
        </Drawer>
      );
    }

    return null;
  }
}
