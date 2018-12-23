import PropTypes from 'prop-types';
import React from 'react';

import { componentErrorToast } from 'redux-modules/layout/toast/utils';
import EmptyState from 'components/empty';

import './errorBoundary.scss';

export default class ErrorBoundary extends React.Component {
  static defaultProps = {
    children: '',
  }

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
    componentName: PropTypes.string.isRequired,
    showToast: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
    this.props.showToast(componentErrorToast(this.props.componentName));
  }

  render() {
    if (this.state.hasError) {
      return (
        <EmptyState icon="bad_mood">
          <div>
            Uh oh! Something went wrong.
          </div>
        </EmptyState>
      );
    }
    return this.props.children || null;
  }
}
