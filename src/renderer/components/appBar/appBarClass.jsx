import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox/lib/app_bar';

import { concatClasses } from 'redux-modules/general/utils';

export default class CustomAppBar extends React.Component {
  static defaultProps = {
    children: '',
    tall: false,
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    showAppBar: PropTypes.bool.isRequired,
    tall: PropTypes.bool,
  };

  render() {
    const classNames = [
      'appBar',
      !this.props.showAppBar ? '-hide' : '',
      this.props.tall ? '-tall' : '',
    ];

    return (
      <AppBar
        className={concatClasses(classNames)}
        flat
      >{this.props.children}</AppBar>
    );
  }
}
