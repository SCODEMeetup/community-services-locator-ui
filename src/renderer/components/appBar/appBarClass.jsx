import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Icon from 'components/icon';
import Button from 'components/button';

import { concatClasses } from 'redux-modules/general/utils';

import { router } from 'src/renderer';
import { CATEGORY_LABELS } from 'redux-modules/services/constants';

export default class CustomAppBar extends React.Component {
  static defaultProps = {
    children: '',
    openCategory: null,
    openSubCategory: null,
    openDrawer: () => {},
    getServiceChildren: () => {},
    selectedServices: {},
    tall: false,
  };

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
    ]),
    getServiceChildren: PropTypes.func,
    openDrawer: PropTypes.func,
    openCategory: PropTypes.string,
    openSubCategory: PropTypes.string,
    selectedServices: PropTypes.object,
    showAppBar: PropTypes.bool.isRequired,
    tall: PropTypes.bool,
  };

  _renderCategories = () => {
    const {
      getServiceChildren,
      openDrawer,
      selectedServices,
      openCategory,
    } = this.props;

    return (
      <Button
        color="white"
        onClick={() => {
          getServiceChildren(openCategory);
          openDrawer();
        }}>
        CHOOSE {CATEGORY_LABELS[openCategory].topBar}
        {selectedServices[openCategory] &&
        Object.keys(selectedServices[openCategory]).length > 0
          ? ` (${Object.keys(selectedServices[openCategory]).length})`
          : null}
      </Button>
    );
  };

  // eslint-disable-next-line class-methods-use-this
  routeNotDefault() {
    return router.getState().name !== router.getOptions().defaultRoute;
  }

  // eslint-disable-next-line class-methods-use-this
  goBack() {
    window.history.back();
  }

  render() {
    const classNames = [
      'appBar',
      !this.props.showAppBar ? '-hide' : '',
      this.props.tall ? '-tall' : '',
    ];

    return (
      <AppBar className={concatClasses(classNames)} flat>
        {this.routeNotDefault() ? (
          <Button className="text-white" onClick={this.goBack}>
            Back
          </Button>
        ) : null}
        <Icon icon="logo" size="xlg" className="logo" />
        {this.props.openCategory ? this._renderCategories() : null}
        <div className="power">
          powered by HandsOn Central Ohio data
          <br />
          stored in the
          <a
            title="SmartColumbus Operating System"
            className="link"
            href="https://smartcolumbusos.com">
            {` `} SCOS
          </a>
        </div>
      </AppBar>
    );
  }
}
