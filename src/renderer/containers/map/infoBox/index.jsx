import React from 'react';
import PropTypes from 'prop-types';
import { isNil, replace } from 'ramda';
import Icon from 'components/icon';

import './infoBox.scss';

export default class InfoBox extends React.Component {
  static defaultProps = {
    details: {
      id: 'dummyID',
      address1: '',
      address2: '',
      zipCode: '',
      name: 'default Name',
      areaCode: '614',
      phoneNumber: '8689394',
      phoneExtension: null,
      handicapAccessFlag: 'Y',
      hours: '24 hours Mon-Sun HandsOn Information and Referral Hotline',
    },
  };

  static propTypes = {
    details: PropTypes.object,
    // onCloseClick: PropTypes.func.isRequired,
  };

  render() {
    const { details } = this.props;
    const conversion = addr => replace(/ /g, '+', addr);
    const address = `https://www.google.com/maps/place/${conversion(
      details.address1
    )}+${details.zipCode}`;
    const email = {
      cc: 'columbushelper+inactiveLocation@gmail.com',
      to: 'smartcolumbusos@columbus.gov',
      subject: 'Service Location No Longer Active',
      body: `The following service area is no longer active.\n\n\t${
        details.name
      }\n\t${details.address1}\n\t${details.address2}\n\tPhone: ${
        details.areaCode
      }${details.phoneNumber}\n\nDataset: https://discovery.smartcolumbusos.com/dataset/handson_central_ohio/570a8e02_fb0e_4cee_895b_3b32bd740650`,
    };
    return (
      <div className="info-box">
        <div className="content">
          <h2>{details.name}</h2>
          <a href={address} className="address" target="_blank">
            {details.address1}
            <br />
            {details.address2}
          </a> 
          <a
            href={`tel:${replace(/-/g, '', details.areaCode)}${replace(
              /-/g,
              '',
              details.phoneNumber
            )}`}
            className="number">
            {details.areaCode}
            {details.phoneNumber}
          </a>
          {!isNil(details.hours) && (
            <div>
              <hr />
              <h3>Hours</h3>
              <p>{details.hours}</p>
            </div>
          )}
          {!isNil(details.services) && (
            <div>
              <hr />
              <h3>Services</h3>
              <hr />
              <p>{details.services}</p>
            </div>
          )}
          {details.handicapAccessFlag.toLowerCase() === 'y' && (
            <div className="handicap-section">
              <Icon icon="handicap" size="xsm" />
            </div>
          )}
          <div className="feedback-section">
            <a
              className="mail"
              href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${
                email.to
              }&cc=${encodeURIComponent(email.cc)}&su=${email.subject}&body=${encodeURIComponent(email.body)}`}
              target="_blank"
              rel="noopener noreferrer">
              Report Inactive
            </a>
          </div>
        </div>
      </div>
    );
  }
}
