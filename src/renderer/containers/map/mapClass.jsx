import React from 'react';
import PropTypes from 'prop-types';

import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import InfoContent from './infoBox';

const MapComponent = compose(
  withStateHandlers(
    () => ({
      isOpen: null,
      mapCenter: {
        lat: 39.9611755,
        lng: -82.99879420000002,
      },
      showCenterMarker: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => id => ({
        isOpen: id,
      }),
    }
  ),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      process.env.MAP_KEY
    }&callback=initMap&libraries=places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      this.setState({
        places: [],
        onPlacesChanged: () => {
          console.log('places changing');
        },
      });
    },
    componentDidMount() {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const position = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            this.setState({
              mapCenter: position,
              showCenterMarker: true,
            });
          },
          err => console.error('Could not get current location', err)
        );
      }
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={14} defaultCenter={props.mapCenter}>
    {props.isMarkerShown &&
      props.markers.map(marker => (
        <Marker
          position={{
            lat: parseFloat(marker.lat),
            lng: parseFloat(marker.long),
          }}
          onClick={() => props.onToggleOpen(marker.id)}
          key={marker.id}>
          {props.isOpen === marker.id && (
            <InfoBox
              options={{
                boxClass: 'info-window',
                boxStyle: { backgroundColor: `#707070` },
                closeBoxMargin: '0',
              }}
              onCloseClick={() => props.onToggleOpen(null)}>
              <InfoContent details={marker} />
            </InfoBox>
          )}
        </Marker>
      ))}
    {props.showCenterMarker && (
      <Marker
        position={props.mapCenter}
        icon={{ url: '/location-icon.svg', labelOrigin: { x: 10, y: -10 } }}
        label="My Location"
      />
    )}
  </GoogleMap>
));

class MapClass extends React.Component {
  static propTypes = {
    markers: PropTypes.array,
  };

  static defaultProps = {
    markers: [],
  };

  render() {
    return (
      <MapComponent
        className="map-component"
        isMarkerShown
        markers={this.props.markers}
      />
    );
  }
}

export default MapClass;
