import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import { omit } from 'ramda';

import Checkbox from 'react-toolbox/lib/checkbox';
import { selectedServices } from 'redux-modules/services/paths';

import { router } from 'src/renderer';
import { ROUTE_VIEW_MAP } from 'redux-modules/router/constants';
import AnalyticsService from 'src/analytics/AnalyticsService';
import { ANALYTICS_CATEGORY_MENU } from 'src/analytics/categories';
import {
  ANALYTICS_ACTION_DESELECT_SUB_CATEGORY,
  ANALYTICS_ACTION_SELECT_SUB_CATEGORY,
} from 'src/analytics/actions';

export default class StandardLeftDrawer extends React.Component {
  static defaultProps = {
    openCategory: null,
  };

  static propTypes = {
    children: PropTypes.object.isRequired,
    getServiceLocations: PropTypes.func.isRequired,
    openCategory: PropTypes.string,
    selectedServices: PropTypes.object.isRequired,
    set: PropTypes.func.isRequired,
  };

  state = { allChecked: false };

  _renderSubCategories = taxId => {
    const result = [];
    const filteredItems = this.props.children[taxId] || [];

    filteredItems.forEach(child => {
      const itemChecked = this.props.selectedServices[taxId]
        ? this.props.selectedServices[taxId][child.id] || false
        : false;

      result.push(
        <Flexbox
          key={`subItem-${child.id}`}
          className="subItems"
          justifyContent="flex-start"
          alignItems="center">
          <Checkbox
            checked={itemChecked}
            label={child.description}
            onChange={value => {
              const action =
                value === null
                  ? ANALYTICS_ACTION_DESELECT_SUB_CATEGORY
                  : ANALYTICS_ACTION_SELECT_SUB_CATEGORY;

              AnalyticsService.trackEvent(
                ANALYTICS_CATEGORY_MENU,
                action,
                child.id
              );
              this.props.set(
                this._getServices(child, value, this.props.selectedServices),
                selectedServices
              );
            }}
          />
        </Flexbox>
      );
    });
    return result;
  };

  _renderCategories = () => (
    <Flexbox
      className="cat-row"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center">
      {this._renderSubCategories(this.props.openCategory)}
    </Flexbox>
  );

  _getServices = (child, value, services = {}) => {
    const taxId = this.props.openCategory;
    let taxSpread = services[taxId];
    if (!value) {
      // unchecked, so omit from array.
      taxSpread = omit([child.id], taxSpread);
      // also mark that everything's no longer selected
      this.setState(() => ({ allChecked: false }));
    } else {
      taxSpread = {
        ...taxSpread,
        [child.id]: value,
      };
    }
    return this._updateSubcategories(taxId, taxSpread, services);
  };

  _updateSubcategories = (taxId, subcategories, services) => {
    const updateData = {
      ...services,
      [taxId]: subcategories,
    };

    const taxIds = Object.values(updateData).flatMap(s => Object.keys(s));
    this.props.getServiceLocations(taxIds.join(','), true);

    router.navigate(ROUTE_VIEW_MAP, {
      cat: this.props.openCategory,
      sub: taxIds,
    });

    return updateData;
  };

  _selectAll() {
    return (
      <Flexbox
        key="selectAll"
        className="selectAll"
        justifyContent="flex-start"
        alignItems="center">
        <Checkbox
          checked={this.state.allChecked}
          label={`${this.state.allChecked ? 'DE' : ''}SELECT ALL`}
          onChange={value => {
            this.setState(prev => ({ allChecked: !prev.allChecked }));
            const taxId = this.props.openCategory;
            const filteredChildren = this.props.children[taxId] || [];
            let services = this.props.selectedServices;
            const subcategories = {};
            if (value) {
              filteredChildren.forEach(c => {
                subcategories[c.id] = true;
              });
            }

            services = this._updateSubcategories(
              taxId,
              subcategories,
              services
            );
            this.props.set(services, selectedServices);
          }}
        />
      </Flexbox>
    );
  }

  render() {
    return (
      <Flexbox className="left-drawer" flexDirection="column">
        {this._selectAll()}
        {this._renderCategories()}
      </Flexbox>
    );
  }
}
