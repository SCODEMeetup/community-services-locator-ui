import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import {
  isEmpty,
  forEachObjIndexed,
} from 'ramda';

import Icon from 'components/icon';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class StandardLeftDrawer extends React.Component {
  static propTypes = {
    services: PropTypes.object
  };

  static defaultProps = {
    services: {
      food: {
        foodBank: 'endpoint-url',
        soupKitchen: 'endpoint-url',
        sackLunches: 'endpoint-url',
      },
      transportation: {
        COTA: 'endpoint-url',
      },
      'Housing/Shelter': {
        shelter: 'endpoint-url',
      }
    }
  }

  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: {},
      isSelected: {}
    }
  }

  _renderSubCategories = (subItems) => {
    const result = [];
    const loop = (endpoint, key) => {
      result.push(
        <Flexbox
          key={`subItem-${key}`}
          className={`subItems`}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Checkbox
            checked={this.state.isSelected[key] || false}
            label={key}
            onChange={(value) => 
            {
              this.setState((prevState) =>
                ({isSelected: {...prevState.isSelected, [key]: value }}))}
            }
          />
        </Flexbox>
      );
    };
    forEachObjIndexed(loop, subItems);
    return result;
  }

  _renderCategories = () => {
    const categories = [];
    const loop = (items, key) => {
      categories.push(
        <Flexbox
          key={`service-${key}`}
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
              const currentStatus = this.state.isOpen[key] ||false;
              this.setState(prevState => ({ isOpen: {...prevState.isOpen, [key]: !currentStatus}}));
            }}
          >
            <Icon icon="add" />
            <h3>{key}</h3>
          </Flexbox>
          { !isEmpty(items) && this.state.isOpen[key] && this._renderSubCategories(items) }
        </Flexbox>
      );
    };
    forEachObjIndexed(loop, this.props.services);
    return categories;
  }

  render() {
    return (
      <Flexbox flexDirection="column">
        {this._renderCategories()}
      </Flexbox>
    );
  }
}
