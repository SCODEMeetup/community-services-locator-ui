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
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
// const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

// import Autocomplete from 'react-toolbox/lib/autocomplete';

const MapComponent = compose(
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key={api_key}&callback=initMap&libraries=places',
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
          // const places = refs.searchBox.getPlaces();

          // this.setState({
          //   places,
          // });
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
        // source={['Test1','Columbus', 'Chx']}
        value={state.places}
      />
      {/* <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
        className="search-box"
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search services"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox> */}
    </div>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 39.9611755, lng: -82.99879420000002 }}
        onClick={props.onToggleOpen}>
        {props.isOpen && (
          <InfoBox
            options={{
              boxClass: 'info-window',
              boxStyle: { backgroundColor: `#2A2E43` },
              closeBoxMargin: '0',
            }}
            onCloseClick={props.onToggleOpen}>
            <InfoContent />
          </InfoBox>
        )}
      </Marker>
    )}
  </GoogleMap>
));

class MapClass extends React.Component {
  static propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
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

  handleMarkerClick = item => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
    console.log('click', item);
  };

  render() {
    return (
      <MapComponent
        className="map-component"
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        toggleDrawer={this.props.toggleDrawer}
      />
    );
  }
}

export default MapClass;
