import React, { Fragment } from 'react';
import * as Title from 'react-document-title';
import LoginHeader from '../login/LoginHeader';
import ValidationForm from '../utils/ValidationForm';
import RegistrationBody from './RegistrationBody';
import RegistrationHeader from './RegistrationHeader';
import RegistrationFooter from './RegistrationFooter';
import { Grid } from '@material-ui/core';
import { error } from '../../helpers';
import { connect } from 'react-redux';
import { schemaSignup } from '../utils/Schemas';
import { requestToRegister } from '../../store/actions/registration/registrationActions';
import { CLEAR_ERRORS_SIGNUP } from '../../store/actionTypes';
import { clearErrors, toggleSnackBar } from '../../store/actions/actionHelpers';

class Registration extends ValidationForm {

  state = {
    fileInputLabels: {
      business_permit: 'Business Permit',
      brgy_clearance: 'Brgy Clearance',
      police_clearance: 'Police Clearance',
      valid_id: 'Valid ID'
    },
    files: {
      business_permit: null,
      brgy_clearance: null,
      police_clearance: null,
      valid_id: null
    },
    hasInvalidFile: false,
    showModal: false
  }


  schema = { ...schemaSignup }



  handleSubmit = e => {
    e.preventDefault();
    const { data } = this.props;
    const { files } = this.state;

    if (!this.handleValidation()) {
      this.props.requestToRegister(this.request, data, files, this.props.history);
    } else {
      this.props.toggleSnackB(error, "Required Parameter is not Provided.");
    }

  }



  unMountFunc = () => {
    this.props.clearErrorsSU();
  }


  handleRemoveFile = (name = '') => {
    this.setState(state => ({
      ...state,
      fileInputLabels: {
        ...state.fileInputLabels,
        [name]: this.getLabel(name)
      },
      files: {
        ...state.files,
        [name]: null
      }
    }))
  }


  getLabel = (name = '') => {
    switch (name) {
      case 'business_permit':
        return 'Business Permit';
      case 'brgy_clearance':
        return 'Brgy Clearance';
      case 'police_clearance':
        return 'Police Clearance'
      default:
        return 'Valid ID';
    }
  }


  render() {
    return (
      <Title title="Signup • Multivendor MarketPlace">
        <Fragment>
          <div className="signup_wrapper mt-1">
            <form onSubmit={this.handleSubmit}
              id="form-register" className="paper">
              <LoginHeader />
              <RegistrationHeader />
              <Grid item container className="mt-small" spacing={24}>
                <RegistrationBody />
                <RegistrationFooter
                  labels={this.state.fileInputLabels}
                  onFileChange={this.handleFileChange}
                  onSubmit={this.handleSubmit}
                  handleRemoveFile={this.handleRemoveFile}
                />
              </Grid>
            </form>
          </div>
        </Fragment>
      </Title>)
  }
}

const mapStateToProps = ({ signup }) => ({
  data: signup.data,
  files: signup.files
})


const mapDispatchToProps = (dispatch) => ({
  toggleSnackB: (variant, message) => dispatch(toggleSnackBar(variant, message)),
  clearErrorsSU: () => dispatch(clearErrors(CLEAR_ERRORS_SIGNUP)),
  requestToRegister: (r, d, f, h) => dispatch(requestToRegister(r, d, f, h))
})




export default connect(mapStateToProps, mapDispatchToProps)(Registration);