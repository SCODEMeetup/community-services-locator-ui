import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import { equals } from 'ramda';

import { concatClasses } from 'redux-modules/general/utils';
import AppBar from 'components/appBar';

import {
  BASIC_INNER_MAIN,
  DISABLE_ALL,
  DISABLE_CONTENT,
  DISABLE_INNER_MAIN,
  NO_LOAD,
} from 'redux-modules/layout/loading/constants';
import { HOME } from 'redux-modules/router/constants';

import ProgressBar from 'react-toolbox/lib/progress_bar';
import Drawer from 'react-toolbox/lib/drawer';

import Toast from 'containers/toast';
import ErrorBoundary from 'containers/errorBoundary';
// import Toast from 'containers/toast';

import scenes from 'scenes';
import DrawerContents from './standardLeftDrawer';

import './layout.scss';

class Layout extends React.Component {
  static defaultProps = {
    route: { name: HOME, params: {} },
  };

  static propTypes = {
    children: PropTypes.object.isRequired,
    getServiceChildren: PropTypes.func.isRequired,
    getServiceLocations: PropTypes.func.isRequired,
    getServices: PropTypes.func.isRequired,
    loadingType: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    openCategory: PropTypes.string.isRequired,
    menu: PropTypes.array.isRequired,
    route: PropTypes.object,
    showLoading: PropTypes.bool.isRequired,
    selectedServices: PropTypes.object.isRequired,
    setstate: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    props.getServices();
  }

  _getView() {
    const viewClassNames = [
      'main-container',
      this.props.loadingType === DISABLE_INNER_MAIN && this.props.showLoading
        ? '-disable'
        : '',
    ];

    return (
      <Flexbox width="100%">
        <ErrorBoundary componentName="Left Drawer">
          <Drawer
            active={this.props.isOpen}
            onOverlayClick={this.props.toggleDrawer}>
            <DrawerContents
              children={this.props.children}
              getServiceLocations={(taxId, showMarkers) =>
                this.props.getServiceLocations(taxId, showMarkers)
              }
              openCategory={this.props.openCategory}
              selectedServices={this.props.selectedServices}
              set={this.props.setstate}
            />
          </Drawer>
        </ErrorBoundary>
        <Flexbox className="app-content" flexDirection="column" flexGrow={1}>
          <Flexbox
            className={concatClasses(viewClassNames)}
            flexDirection="row"
            flexGrow={1}>
            <Flexbox element="main" flexGrow={1}>
              {createElement(scenes[this.props.route.name])}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }

  render() {
    const layoutClasses = [
      'layout',
      equals(this.props.loadingType, DISABLE_ALL) && this.props.showLoading
        ? '-disable'
        : '',
    ];

    return (
      <Flexbox
        className={concatClasses(layoutClasses)}
        flexDirection="column"
        height="100vh">
        <AppBar
          menu={this.props.menu}
          openDrawer={this.props.toggleDrawer}
          getServiceChildren={taxId => this.props.getServiceChildren(taxId)}
          selectedServices={this.props.selectedServices}
          showAppBar
        />
        <ProgressBar
          className={concatClasses([
            equals(this.props.loadingType, DISABLE_INNER_MAIN) ||
            equals(this.props.loadingType, BASIC_INNER_MAIN)
              ? '-main-container-loading'
              : '',
            equals(this.props.loadingType, NO_LOAD) || !this.props.showLoading
              ? '-hide-loader'
              : '',
          ])}
          mode="indeterminate"
          type="linear"
        />
        <Flexbox
          className={concatClasses([
            'layout-content',
            equals(this.props.loadingType, DISABLE_CONTENT) &&
            this.props.showLoading
              ? '-disable'
              : '',
          ])}
          element="section"
          flexDirection="row">
          {this._getView()}
          <Toast />
        </Flexbox>
      </Flexbox>
    );
  }
}

export default Layout;
