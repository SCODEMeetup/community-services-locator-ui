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
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 39.9611755, lng: -82.99879420000002 }}>
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
  </GoogleMap>
));

class MapClass extends React.Component {
  static propTypes = {
    markers: PropTypes.array,
  };

  static defaultProps = {
    markers: [],
  };

  state = {
    isMarkerShown: false,
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  render() {
    return (
      <MapComponent
        className="map-component"
        isMarkerShown={this.state.isMarkerShown}
        markers={this.props.markers}
      />
    );
  }
}

export default MapClass;
