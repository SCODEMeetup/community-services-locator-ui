import React from 'react';
import Flexbox from 'flexbox-react';
import Map from 'containers/map';
import { router } from 'src/renderer';
import PropTypes from 'prop-types';

export default class Home extends React.Component {
  static propTypes = {
    getServiceLocations: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const route = router.getState();
    const { sub } = route.params;
    if (sub) {
      this.props.getServiceLocations(sub, true);
    }
  }

  render() {
    return (
      <Flexbox justifyContent="center" width="100%">
        <Map isMarkerShown />
      </Flexbox>
    );
  }
}
