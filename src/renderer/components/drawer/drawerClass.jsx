import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';
import React from 'react';
import {
  contains,
  equals,
} from 'ramda';

import Icon from 'components/icon';
import { concatClasses } from 'redux-modules/general/utils';
import {
  LEFT,
  RIGHT,
} from 'redux-modules/layout/drawer/constants';

import './drawer.scss';

export default class CustomDrawer extends React.Component {
  static defaultProps = {
    children: '',
    openDefault: false,
    route: '',
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    openDefault: PropTypes.bool,
    openDrawers: PropTypes.array.isRequired,
    route: PropTypes.string,
    side: PropTypes.string.isRequired,
    updateOpenDrawers: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.openDefault,
    };
    this.props.updateOpenDrawers(props.openDefault, this.props.side);
    this.contentName = null;
    this.classNames = [
      'inline-drawer -togglable ',
      props.side === LEFT ? '-left' : '',
      props.side === RIGHT ? '-right' : '',
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (!equals(nextProps.route, this.props.route)) {
      this.props.updateOpenDrawers(nextProps.openDefault, nextProps.side);
      this.setState({ open: nextProps.openDefault });
    } else if (this.state.open && !contains(nextProps.side, nextProps.openDrawers)) {
      this.setState({ open: false });
    } else if (!this.state.open && contains(nextProps.side, nextProps.openDrawers)) {
      this.setState({ open: true });
    }

    this.classNames = [
      'inline-drawer -togglable ',
      nextProps.side === LEFT ? '-left' : '',
      nextProps.side === RIGHT ? '-right' : '',
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equals(this.state.open, nextState.open) ||
      !equals(this.props.route, nextProps.route) ||
      !equals(this.props.side, nextProps.side);
  }

  _toggleDrawer(dynamicName = null) {
    const status = (
      !dynamicName ||
      !this.contentName ||
      equals(dynamicName, this.contentName)
    ) ? !this.state.open : (!equals(dynamicName, this.contentName) && !this.state.open)
        ? true : this.state.open;

    this.props.updateOpenDrawers(status, this.props.side, dynamicName);

    if (dynamicName) {
      this.contentName = dynamicName;
    }
  }

  render() {
    const {
      children,
      side,
    } = this.props;

    const classNames = [
      ...this.classNames,
      this.state.open ? '-open' : '',
    ];

    return (
      <Flexbox className={concatClasses(classNames)}>
        { side === RIGHT &&
          <Flexbox
            className="toggle"
            flexDirection="column"
            justifyContent="center"
            onClick={() => this._toggleDrawer(null)}
          >
            <Icon icon="arrow_left" className={this.state.open ? 'rotate_180' : ''} size="sm" />
          </Flexbox>
        }
        <Flexbox className="content" flexDirection="column" flexGrow={1}>
          {children}
        </Flexbox>
        { side === LEFT &&
          <Flexbox
            className="toggle"
            flexDirection="column"
            justifyContent="center"
            onClick={() => this._toggleDrawer(null)}
          >
            <Icon icon="arrow_right" className={this.state.open ? 'rotate_180' : ''} size="sm" />
          </Flexbox>
        }
      </Flexbox>
    );
  }
}
