import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from 'components/icon';

import './empty.scss';

export default class CustomChip extends React.Component {
  static defaultProps = {
    children: 'Nothing to see here',
    icon: 'unknown',
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    icon: PropTypes.string,
  };

  render() {
    return (
      <Flexbox
        alignItems="center"
        className="empty"
        flexDirection="column"
        justifyContent="center"
        width="100%"
      >
        <Flexbox
          alignItems="center"
          className="empty-icon"
          flexDirection="column"
          justifyContent="center"
        >
          <Icon icon={this.props.icon} size="xlg" />
        </Flexbox>
        <div className="empty-description">
          {this.props.children}
        </div>
      </Flexbox>
    );
  }
}
