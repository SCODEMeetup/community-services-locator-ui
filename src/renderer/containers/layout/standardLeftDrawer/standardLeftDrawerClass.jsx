import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';

import Icon from 'components/icon';
import Checkbox from 'react-toolbox/lib/checkbox';
import { openCategories, selectedServices } from 'redux-modules/services/paths';

export default class StandardLeftDrawer extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    getServiceChildren: PropTypes.func.isRequired,
    getServiceLocations: PropTypes.func.isRequired,
    openCategories: PropTypes.object.isRequired,
    menu: PropTypes.array.isRequired,
    selectedServices: PropTypes.object.isRequired,
    set: PropTypes.func.isRequired,
  };

  _renderSubCategories = taxId => {
    const result = [];
    const filteredItems = this.props.children[taxId] || [];

    filteredItems.forEach(child => {
      result.push(
        <Flexbox
          key={`subItem-${child.id}`}
          className="subItems"
          justifyContent="flex-start"
          alignItems="center">
          <Checkbox
            checked={this.props.selectedServices[child.id] || false}
            label={child.description}
            onChange={value => {
              this.props.getServiceLocations(child.id, value);
              const updateData = {
                ...this.props.selectedServices,
                [child.id]: value,
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
    const categories = [];
    this.props.menu.forEach(item => {
      const isOpen = this.props.openCategories[item.id];
      categories.push(
        <Flexbox
          key={`service-${item.id}`}
          className="cat-row"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center">
          <Flexbox
            alignItems="center"
            className="category"
            justifyContent="flex-start"
            onClick={() => {
              const currentlyOpen = this.props.openCategories[item.id] || false;
              if (!currentlyOpen) {
                this.props.getServiceChildren(item.id);
              }
              const updatedState = {
                ...this.props.openCategories,
                [item.id]: !currentlyOpen,
              };
              this.props.set(updatedState, openCategories);
            }}>
            <Icon icon={isOpen ? 'arrow_down' : 'arrow_right'} size="xsm" />
            <h3>{item.description}</h3>
          </Flexbox>
          {isOpen && this._renderSubCategories(item.id)}
        </Flexbox>
      );
    });
    return categories;
  };

  render() {
    return (
      <Flexbox className="left-drawer" flexDirection="column">
        {this._renderCategories()}
      </Flexbox>
    );
  }
}
