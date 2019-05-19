import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';

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
              this.props.getServiceLocations(child.id, value);
              const taxSpread = this.props.selectedServices[taxId]
                ? this.props.selectedServices[taxId]
                : {};
              const updateData = {
                ...this.props.selectedServices,
                [taxId]: {
                  ...taxSpread,
                  [child.id]: value,
                },
              };
              this.props.set(updateData, selectedServices);
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

  render() {
    return (
      <Flexbox className="left-drawer" flexDirection="column">
        {this._renderCategories()}
      </Flexbox>
    );
  }
}
