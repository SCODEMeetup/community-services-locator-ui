import React from 'react';
import Flexbox from 'flexbox-react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Map from 'components/map';
export default class Home extends React.Component {
  render() {
    return (
      <Flexbox justifyContent="center" width="100%">
        <Map  isMarkerShown/>
      </Flexbox>
    );
  }
}
