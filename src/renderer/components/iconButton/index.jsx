import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, omit } from 'ramda';

import {
  IconButton,
  Tooltip,
} from 'react-toolbox/lib';

import { concatClasses } from 'redux-modules/general/utils';

import './iconButton.scss';

export default class CustomIconButton extends React.Component {
  static defaultProps = {
    className: null,
    color: '',
    size: '',
    tooltip: '',
    tooltipPosition: 'vertical',
  };

  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipPosition: PropTypes.string,
  };

  componentWillMount() {
    this.setClassNames(this.props.className, this.props.color, this.props.size);
  }

  componentWillUpdate(nextProps) {
    this.setClassNames(nextProps.className, this.props.color, this.props.size);
  }

  setClassNames = (className, color, size) => {
    this.classNames = [
      '-icon-button',
      className,
      color,
      size,
    ];
  }

  render() {
    if (isEmpty(this.props.tooltip)) {
      const attributes = omit(['tooltipPosition', 'tooltip'], this.props);
      return (
        <IconButton
          {...attributes}
          className={concatClasses(this.classNames)}
        />
      );
    }

    const TooltipIconButton = Tooltip(IconButton);
    return (<TooltipIconButton {...this.props} className={concatClasses(this.classNames)} />);
  }
}
