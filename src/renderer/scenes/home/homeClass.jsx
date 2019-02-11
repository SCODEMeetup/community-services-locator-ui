import React from 'react';
import Flexbox from 'flexbox-react';
import Map from 'containers/map';

export default class Home extends React.Component {
  render() {
    return (
      <Flexbox justifyContent="center" width="100%">
        <Map isMarkerShown />
      </Flexbox>
    );
  }
}
