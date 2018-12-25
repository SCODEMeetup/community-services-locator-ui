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
import { HOME, SHEET } from 'redux-modules/router/constants';

import ProgressBar from 'react-toolbox/lib/progress_bar';
import Drawer from 'react-toolbox/lib/drawer';

import Toast from 'containers/toast';
import ErrorBoundary from 'containers/errorBoundary';

import scenes from 'scenes';

import './layout.scss';

class Layout extends React.Component {
  static defaultProps = {
    route: { name: HOME, params: {} },
  }

  static propTypes = {
    loadingType: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    route: PropTypes.object,
    showLoading: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
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
    const isBottomSheet = route.params.type === SHEET;

    this.mainRoute = isBottomSheet ? this.mainRoute : route.name;
    this.bottomSheet = isBottomSheet ? route.name : '';
  }

  _getView(route, bottomSheet = false) {
    const viewClassNames = [
      'main-container',
      equals(this.props.loadingType, DISABLE_INNER_MAIN) && this.props.showLoading ? '-disable' : '',
      this.props.isOpen ? '-one-drawer-open' : '',
    ];

    return (
      <Flexbox width="100%" className={bottomSheet ? '-bottom-sheet' : ''}>
        <ErrorBoundary componentName="Left Drawer">
          <Drawer active={this.props.isOpen} onOverlayClick={this.props.toggleDrawer}>
            <h5>This is your Drawer.</h5>
            <p>You can embed any content you want, for example a Menu.</p>
          </Drawer>
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
        <AppBar showAppBar></AppBar>
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
