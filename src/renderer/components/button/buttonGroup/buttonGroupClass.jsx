import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';
import React from 'react';

import {
  IconMenu,
  MenuItem,
} from 'react-toolbox/lib/menu';
import { Button } from 'react-toolbox/lib/button';

import Icon from 'components/icon';

import { concatClasses, mapIndexed } from 'redux-modules/general/utils';

export default class MarketPanel extends React.Component {
  static defaultProps = {
    actions: [],
    buttonsDisabled: false,
    dropdown: [],
    size: '-small',
  };

  static propTypes = {
    actions: PropTypes.array,
    buttonsDisabled: PropTypes.bool,
    dropdown: PropTypes.array,
    size: PropTypes.string,
  };

  _onClick = (event, item) => {
    event.stopPropagation();

    return item.onClick(item.value);
  }

  _renderButton = (item, i) => (
    <Button
      key={i}
      className="action"
      label={item.label}
      onClick={e => this._onClick(e, item)}
      disabled={this.props.buttonsDisabled}
    />
  )

  _renderMenuItem = (item, i) => (
    <MenuItem
      key={i}
      caption={item.label}
      icon={<Icon icon={item.icon} />}
      onClick={e => this._onClick(e, item)}
      disabled={this.props.buttonsDisabled}
    />
  )

  render() {
    return (
      <Flexbox
        className={concatClasses([
          'button-group',
          this.props.size,
          this.props.buttonsDisabled ? '-disabled' : '',
        ])}
        flexDirection="row"
      >
        {this.props.actions.length > 0 &&
          mapIndexed(this._renderButton, this.props.actions)
        }
        {this.props.dropdown.length > 0 &&
          <IconMenu
            icon={<Icon icon="arrow_down" />}
            position="topRight"
            menuRipple
          >
            {mapIndexed(this._renderMenuItem, this.props.dropdown)}
          </IconMenu>
        }
      </Flexbox>
    );
  }
}
