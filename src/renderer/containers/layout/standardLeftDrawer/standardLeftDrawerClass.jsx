import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';

import Icon from 'components/icon';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class StandardLeftDrawer extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    getServiceChildren: PropTypes.func.isRequired,
    getServiceLocations: PropTypes.func.isRequired,
    menu: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: {},
      isSelected: {},
    };
  }

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
            checked={this.state.isSelected[child.id] || false}
            label={child.description}
            onChange={value => {
              this.props.getServiceLocations(child.id, value);
              this.setState(prevState => ({
                isSelected: { ...prevState.isSelected, [child.id]: value },
              }));
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
      const isOpen = this.state.isOpen[item.id];
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
              const currentlyOpen = this.state.isOpen[item.id] || false;
              if (!currentlyOpen) {
                this.props.getServiceChildren(item.id);
              }
              this.setState(prevState => ({
                isOpen: { ...prevState.isOpen, [item.id]: !currentlyOpen },
              }));
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
