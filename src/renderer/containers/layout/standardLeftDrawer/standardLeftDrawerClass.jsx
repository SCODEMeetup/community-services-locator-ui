import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import {
  filter,
} from 'ramda';

import Icon from 'components/icon';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class StandardLeftDrawer extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    getServiceChildren: PropTypes.func.isRequired,
    menu: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: {},
      isSelected: {}
    }
  }

  _renderSubCategories = (taxId) => {
    const result = [];
    const filteredItems = filter(item => item.TAXON_ID_SUBCAT_OF == taxId, this.props.children);

    filteredItems.forEach((child) => {
      result.push(
        <Flexbox
          key={`subItem-${child.TAXON_ID}`}
          className={`subItems`}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Checkbox
            checked={this.state.isSelected[child.TAXON_ID] || false}
            label={child.DESCRIPTION}
            onChange={(value) => 
            {
              this.setState((prevState) =>
                ({isSelected: {...prevState.isSelected, [child.TAXON_ID]: value }}))}
            }
          />
        </Flexbox>
      );
    });
    return result;
  }

  _renderCategories = () => {
    const categories = [];
    this.props.menu.forEach((item) => {
      const isOpen = this.state.isOpen[item.TAXON_ID];
      categories.push(
        <Flexbox
          key={`service-${item.TAXON_ID}`}
          className="cat-row"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Flexbox
            alignItems="center"
            className="category"
            justifyContent="flex-start"
            onClick={() => {
              const currentlyOpen = this.state.isOpen[item.TAXON_ID] ||false;
              if(!currentlyOpen) {
                this.props.getServiceChildren(item.TAXON_ID);
              }
              this.setState(prevState => ({ isOpen: {...prevState.isOpen, [item.TAXON_ID]: !currentlyOpen}}));
            }}
          >
            <Icon icon={isOpen ? 'arrow_down' : 'arrow_right'} size="xsm" />
            <h3>{item.DESCRIPTION}</h3>
          </Flexbox>
          { isOpen && this._renderSubCategories(item.TAXON_ID) }
        </Flexbox>
      );
    });
    return categories;
  }

  render() {
    return (
      <Flexbox className="left-drawer" flexDirection="column">
        {this._renderCategories()}
      </Flexbox>
    );
  }
}
