import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import Button from 'components/button';
import Icon from 'components/icon';
import routes from 'scenes/routes';

import { equals } from 'ramda';

export default class StandardLeftDrawer extends React.Component {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
    routeName: PropTypes.string.isRequired,
  };

  _createNavButton = (route) => {
    if (route.icon) {
      this.navButtons.push(
        <Button
          color="navigation"
          icon={<Icon icon={route.icon} size="sm" />}
          key={route.name}
          label={route.name}
          onClick={() => this.props.goTo(route.name)}
          selected={equals(route.name, this.props.routeName)}
        />,
      );
    }
  }

  render() {
    this.navButtons = [];
    routes.forEach(route => this._createNavButton(route));
    return (
      <Flexbox flexDirection="column">
        { this.navButtons }
      </Flexbox>
    );
  }
}
