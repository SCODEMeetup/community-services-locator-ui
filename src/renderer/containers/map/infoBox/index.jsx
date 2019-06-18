import React from 'react';
import PropTypes from 'prop-types';
import { isNil, replace } from 'ramda';
import Icon from 'components/icon';

import './infoBox.scss';

export default class InfoBox extends React.Component {
  static defaultProps = {
    details: {
      id: 'dummyID',
      address1: 'defaultAddress',
      address2: '',
      zipCode: 'zipCode',
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

  readOutLoud = message => {
    const speech = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();

    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    // eslint-disable-next-line prefer-destructuring
    speech.voice = voices[0];

    window.speechSynthesis.speak(speech);
  };

  render() {
    const { details } = this.props;
    return (
      <div className="info-box">
        <div className="content">
          <h2>{details.name}</h2>
          {this.readOutLoud(details.name)}
          <p>{details.address1}</p>
          <p>{details.address2}</p>
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
        </div>
      </div>
    );
  }
}
