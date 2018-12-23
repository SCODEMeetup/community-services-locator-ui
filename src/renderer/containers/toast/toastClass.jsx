import PropTypes from 'prop-types';
import React from 'react';
import { Snackbar } from 'react-toolbox';

import './toast.scss';

export default class Toast extends React.Component {
  static defaultProps = {
    toast: {},
  }

  static propTypes = {
    resetToast: PropTypes.func.isRequired,
    toast: PropTypes.object,
  };

  _handleSnackbarClick() {
    this.props.resetToast();
  }

  render() {
    const {
      buttonText,
      buttonType,
      content,
      show,
      timeout,
    } = this.props.toast;

    return (
      <section>
        <Snackbar
          action={buttonText || 'Dismiss'}
          active={show}
          label={content}
          {...(timeout ? { timeout } : {})}
          onClick={() => this._handleSnackbarClick()}
          onTimeout={() => this.props.resetToast()}
          type={buttonType || 'warning'}
        />
      </section>
    );
  }
}
