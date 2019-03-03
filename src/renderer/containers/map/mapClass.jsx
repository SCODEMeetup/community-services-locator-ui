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
import Icon from 'components/icon';
import IconButton from 'components/iconButton';
import Input from 'react-toolbox/lib/input';
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
    containerElement: <div style={{ height: '98%', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          console.log('places changing');
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props, state) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 39.9611755, lng: -82.99879420000002 }}>
    <div className="search-box">
      <IconButton
        className="filter-icon"
        onClick={() => props.toggleDrawer()}
        icon={<Icon icon="filters" size="sm" />}
      />
      <Input
        className="autocomplete"
        direction="down"
        label=""
        hint="Search services"
        onChange={props.onPlacesChanged()}
        value={state.places}
      />
    </div>
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
                boxStyle: { backgroundColor: `#2A2E43` },
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
    toggleDrawer: PropTypes.func.isRequired,
    getServices: PropTypes.func.isRequired,
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
        toggleDrawer={() => {
          this.props.getServices();
          this.props.toggleDrawer();
        }}
      />
    );
  }
}

export default MapClass;
