import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import { omit } from 'ramda';

import Checkbox from 'react-toolbox/lib/checkbox';
import { selectedServices } from 'redux-modules/services/paths';

export default class StandardLeftDrawer extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    getServiceLocations: PropTypes.func.isRequired,
    openCategory: PropTypes.string.isRequired,
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

  _renderCategories = () => {
    return (
      <Flexbox
        className="cat-row"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center">
        {this._renderSubCategories(this.props.openCategory)}
      </Flexbox>
    );
  };

  _getServices = (child, value, services = {}) => {
    // console.log('value', value);
    const taxId = this.props.openCategory;
    this.props.getServiceLocations(child.id, value);
    let taxSpread = services[taxId];
    if (!value) {
      // unchecked, so omit from array.
      taxSpread = omit([child.id], taxSpread);
    } else {
      taxSpread = {
        ...taxSpread,
        [child.id]: value,
      };
    }
    const updateData = {
      ...services,
      [taxId]: taxSpread,
    };
    return updateData;
  };

  _selectAll() {
    return (
      <Flexbox
        key="selectAll"
        className="subItems"
        justifyContent="flex-start"
        alignItems="center">
        <Checkbox
          checked={this.state.allChecked}
          label="SELECT ALL"
          onChange={value => {
            this.setState(prev => ({ allChecked: !prev.allChecked }));
            const taxId = this.props.openCategory;
            const filteredItems = this.props.children[taxId] || [];
            let data = this.props.selectedServices;
            filteredItems.forEach(child => {
              data = this._getServices(child, value, data);
            });
            this.props.set(data, selectedServices);
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
