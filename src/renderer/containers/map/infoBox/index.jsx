import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';

import './infoBox.scss';

export default class InfoBox extends React.Component {
  static defaultProps = {
    className: null,
  };

  static propTypes = {
    className: PropTypes.string,
  };


  setClassNames = (className) => {
    this.classNames = [
      '-icon-button',
      className,
    ];
  }

  render() {
    return (
      <div className="info-box">
        <Icon icon="information" size="xlg" />
        <div className="content">
          <h3>Food Bank</h3>
          <p>123 South 4th Street</p>
          <p>Columbus, Ohio 43215</p>
          <a className="number">614-111-1234</a>
          <hr />
          <h3>Hours</h3>
          <hr />
          <h3>Services</h3>
          <hr />
        </div>
      </div>
    );
  }
}
