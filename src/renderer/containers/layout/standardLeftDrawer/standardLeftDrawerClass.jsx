import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import {
  isEmpty,
  forEachObjIndexed,
} from 'ramda';

import Icon from 'components/icon';

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
          <span>{key}</span>
          <span>{endpoint}</span>
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
          >
            <Icon icon="add" />
            <h3>{key}</h3>
          </Flexbox>
          { !isEmpty(items) && this._renderSubCategories(items) }
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
