import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-toolbox/lib/tooltip';
import { omit } from 'ramda';

import { concatClasses } from 'redux-modules/general/utils';

import './icon.scss';

const TooltipIcon = Tooltip(props => <span {...omit('theme', props)} />);
const icons = {};
const svgData = require.context('./svg', false, /\.svg$/);

svgData.keys().forEach((filename) => {
  const key = filename.replace(/(\.\/|\.svg)/g, '');
  icons[key] = [filename].map(svgData)[0];

  return true;
});

export default class Icon extends React.Component {
  static defaultProps = {
    className: '',
    default: '',
    icon: '',
    size: 'normal',
    tooltip: '',
  };

  static propTypes = {
    className: PropTypes.string,
    default: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.string,
    tooltip: PropTypes.string,
  };

  render() {
    const classNames = [
      '-icon',
      this.props.size,
      this.props.className,
    ];
    const iconHtml = icons[this.props.icon] ? icons[this.props.icon] : icons[this.props.default];

    if (this.props.tooltip) {
      return (
        <TooltipIcon tooltip={this.props.tooltip}>
          <span
            className={concatClasses(classNames)}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: iconHtml }}
            icon={this.props.icon}
          />
        </TooltipIcon>
      );
    }

    return (
      <span
        className={concatClasses(classNames)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: iconHtml }}
        icon={this.props.icon}
      />
    );
  }
}
