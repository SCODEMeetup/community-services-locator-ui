import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';

import './infoBox.scss';

export default class InfoBox extends React.Component {
  static defaultProps = {
    className: null,
    details: {
      id: '36100',
      address1: '7356 E. MAIN STREET',
      address2: '',
      zipCode: '43068',
      name: 'REYNOLDSBURG HELPING HANDS, INC.',
      areaCode: '614',
      phoneNumber: '8689394',
      phoneExtension: null,
      handicapAccessFlag: 'Y',
      hours: '24 hours Mon-Sun HandsOn Information and Referral Hotline'
    }
  };

  static propTypes = {
    className: PropTypes.string,
    details: PropTypes.object,
  };


  setClassNames = (className) => {
    this.classNames = [
      '-icon-button',
      className,
    ];
  }

  render() {
    const { details } = this.props;
    return (
      <div className="info-box">
        <div className="content">
          <h3>{details.name}</h3>
          <p>{details.address1}</p>
          <p>{details.address2}</p>
          <a className="number">{details.areaCode}{details.phoneNumber}</a>
          <hr />
          { !isNil(details.hours) &&
            <div>
              <h3>Hours</h3>
              <hr />
              <p>{details.hours}</p>
            </div>
          }
          { !isNil(details.services) &&
            <div>
              <h3>Services</h3>
              <hr />
              <p>{details.services}</p>
            </div>
          }
        </div>
      </div>
    );
  }
}
