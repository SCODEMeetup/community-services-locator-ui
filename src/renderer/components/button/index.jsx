import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'ramda';
import { Button } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';

import { concatClasses } from 'redux-modules/general/utils';

import './button.scss';

const TooltipButton = Tooltip(Button);

export default class CustomButton extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    className: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    tooltip: PropTypes.string,
  };

  static defaultProps = {
    children: '',
    className: null,
    color: 'default',
    disabled: false,
    selected: false,
    tooltip: '',
  };

  componentWillMount() {
    this._updateclassVars(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateclassVars(nextProps);
  }

  _updateclassVars = (props) => {
    this.classNames = [
      props.className || '',
      !props.className ? props.color : '',
      !props.className ? 'button' : '',
    ];

    this.filteredProps = omit(['tooltip', 'tooltipPosition', 'disabled'], props);
  }

  render() {
    if (this.props.tooltip) {
      return (
        <TooltipButton
          {...omit(['disabled'], this.props)}
          className={concatClasses([...this.classNames, this.props.selected ? '-selected' : ''])}
          disabled={this.props.disabled}
        >
          {this.props.children}

        </TooltipButton>
      );
    }

    return (
      <Button
        {...this.filteredProps}
        className={concatClasses([...this.classNames, this.props.selected ? '-selected' : ''])}
        disabled={this.props.disabled}
      >
        {this.props.children}

      </Button>
    );
  }
}
