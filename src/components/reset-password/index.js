import React from 'react';
import * as T from 'react-document-title';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import ResetPasswordForm from './ResetPasswordForm';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { clearErrors } from '../../store/actions/actionHelpers';
import { CLEAR_ERRORS_RESET_PASSWORD } from '../../store/actionTypes';


class ResetPassword extends ValidationForm {

  unMountFunc = () => {
    this.props.clearErrorsRP();
  }

  render() {
    return (
      <T title="Forgot Password • Multivendor MarketPlace">
        <ErrorBoundary name="Forgot Password" request={this.request}>
          <div className="reset-password-wrapper mt-3">
            <Typography
              children="Reset Password"
              className="text-primary"
              variant="h4"
            />
            <ResetPasswordForm request={this.request} />
          </div>
        </ErrorBoundary>
      </T>
    )
  }
};



const mapDispatchToProps = (dispatch) => ({
  clearErrorsRP: () => dispatch(clearErrors(CLEAR_ERRORS_RESET_PASSWORD))
})



export default connect(null, mapDispatchToProps)(ResetPassword);