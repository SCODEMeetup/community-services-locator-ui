import React from 'react';
import Flexbox from 'flexbox-react';
import Map from 'containers/map';
import { router, store } from 'src/renderer';
import PropTypes from 'prop-types';
import {
  openCategory,
  openSubCategory,
  selectedServices,
} from 'redux-modules/services/paths';
import { setstate, select } from 'redux-modules/general';

export default class Home extends React.Component {
  static propTypes = {
    getServiceLocations: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const route = router.getState();
    const { cat, sub } = route.params;
    if (cat) {
      // set the store open category
      store.dispatch(setstate(cat, openCategory));

      if (sub) {
        // set the store open subcategory
        store.dispatch(setstate(sub, openSubCategory));

        const currentServices = select(selectedServices, store.getState());

        const selectedSubs = currentServices[cat];

        // if we dont have any selected sub categories in the store
        // we need to set the subcategory manually
        // this only happens if the url is accessed directly
        if (!selectedSubs || !selectedSubs[sub]) {
          store.dispatch(
            setstate(
              {
                [cat]: {
                  [sub]: true,
                },
              },
              selectedServices
            )
          );
        }

        this.props.getServiceLocations(sub, true);
      }
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
