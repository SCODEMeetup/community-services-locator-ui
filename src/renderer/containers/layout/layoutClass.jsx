import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import { equals } from 'ramda';

import { concatClasses } from 'redux-modules/general/utils';
import { LEFT } from 'redux-modules/layout/drawer/constants';
import AppBar from 'components/appBar';

import {
  BASIC_INNER_MAIN,
  DISABLE_ALL,
  DISABLE_CONTENT,
  DISABLE_INNER_MAIN,
  NO_LOAD,
} from 'redux-modules/layout/loading/constants';
import { LOGIN, SHEET } from 'redux-modules/router/constants';

import ProgressBar from 'react-toolbox/lib/progress_bar';

import Toast from 'containers/toast';
import ErrorBoundary from 'containers/errorBoundary';
import AppDrawer from 'containers/appDrawer';

import scenes from 'scenes';

import './layout.scss';

class Layout extends React.Component {
  static defaultProps = {
    route: { name: LOGIN, params: {} },
  }

  static propTypes = {
    loadingType: PropTypes.string.isRequired,
    openDrawers: PropTypes.object.isRequired,
    route: PropTypes.object,
    showLoading: PropTypes.bool.isRequired,
    sidesByRoute: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const {
      type,
      parent,
    } = props.route.params;
    const routeName = props.route.name;

    this.mainRoute = type === SHEET ? parent : routeName;
    this.bottomSheet = type === SHEET ? routeName : '';
  }

  componentWillUpdate(nextProps) {
    const route = nextProps.route;
    console.log(nextProps);
    const isBottomSheet = route.params.type === SHEET;

    this.mainRoute = isBottomSheet ? this.mainRoute : route.name;
    this.bottomSheet = isBottomSheet ? route.name : '';
  }

  _getView(route, bottomSheet = false) {
    const routeOpenDrawers = this.props.openDrawers[route] || [];
    const routeDrawers = this.props.sidesByRoute[route] || [];

    const viewClassNames = [
      'main-container',
      equals(this.props.loadingType, DISABLE_INNER_MAIN) && this.props.showLoading ? '-disable' : '',
      routeOpenDrawers.length === 2 ? '-two-drawers-open' : '',
      routeOpenDrawers.length === 1 ? '-one-drawer-open' : '',
      routeDrawers.length === 2 ? '-two-drawers' : '',
    ];

    return (
      <Flexbox width="100%" className={bottomSheet ? '-bottom-sheet' : ''}>
        <ErrorBoundary componentName="Left Drawer">
          <AppDrawer
            openDrawers={routeOpenDrawers}
            route={route}
            side={LEFT}
          />
        </ErrorBoundary>
        <Flexbox
          className="app-content"
          flexDirection="column"
          flexGrow={1}
        >
          <Flexbox
            className={concatClasses(viewClassNames)}
            flexDirection="row"
            flexGrow={1}
          >
            <Flexbox
              element="main"
              flexGrow={1}
            >
              {createElement(scenes[route])}
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }

  render() {
    const layoutClasses = [
      'layout',
      equals(this.props.loadingType, DISABLE_ALL) && this.props.showLoading ? '-disable' : '',
    ];

    return (
      <Flexbox
        className={concatClasses(layoutClasses)}
        flexDirection="column"
        height="100vh"
      >
        <AppBar showAppBar>Test</AppBar>
        <ProgressBar
          className={concatClasses([
            this.bottomSheet ? '-bottom-sheet' : '',
            (
              equals(this.props.loadingType, DISABLE_INNER_MAIN) ||
              equals(this.props.loadingType, BASIC_INNER_MAIN)
            ) ? '-main-container-loading' : '',
            (equals(this.props.loadingType, NO_LOAD) || !this.props.showLoading) ? '-hide-loader' : '',
          ])}
          mode="indeterminate"
          type="linear"
        />
        <Flexbox
          className={concatClasses([
            'layout-content',
            equals(this.props.loadingType, DISABLE_CONTENT) && this.props.showLoading ? '-disable' : '',
          ])}
          element="section"
          flexDirection="row"
        >
          {this._getView(this.mainRoute)}
          {this.bottomSheet && this._getView(this.bottomSheet, true)}
          <Toast />
        </Flexbox>
      </Flexbox>
    );
  }
}

export default Layout;
