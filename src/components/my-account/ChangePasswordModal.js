import React from 'react';
import MerchantModal from '../utils/MerchantModal';
import { connect } from 'react-redux';
import { clearErrors } from '../../store/actions/actionHelpers';
import { MerchantFormField } from '../utils/Forms';
import { CHANGE_PASSWORD, CLEAR_ERRORS_CHANGE_PASSWORD } from '../../store/actionTypes';
import { changePassData, toggleShowPasswordPass, toggleCPModal } from '../../store/actions/reset-password';

const ChangePasswordModal = ({ showCPModal, handleToggleModal,
  state, handleChange, handleShowPassword, submitCallback, clearErrorsCP }) => {
  const { current_password, new_password, confirm_password, data, errors } = state;
  return (
    <MerchantModal
      width="sm"
      open={showCPModal}
      handleClose={() => {
        handleToggleModal();
        clearErrorsCP();
      }}
      submitCallback={submitCallback}
      title="Change Password"
      contentText="Please provide your current Password and new Password."
      disabled={state.isDisabled}>
      <MerchantFormField
        classes="mt-1"
        key="current_password"
        isSmall
        handleChange={handleChange}
        disableCopyPaste
        label="Current Password"
        name="current_password"
        value={data.current_password}
        error={errors}
        passwordProps={{
          handleShowPassword,
          showPassword: current_password
        }}
        IsPassword
      />
      <MerchantFormField
        value={data.new_password}
        isSmall
        key="new_password"
        classes="mt-1"
        handleChange={handleChange}
        disableCopyPaste
        label="New Password"
        name="new_password"
        error={errors}
        passwordProps={{
          handleShowPassword,
          showPassword: new_password
        }}
        IsPassword
      />
      <MerchantFormField
        value={data.confirm_password}
        isSmall
        handleChange={handleChange}
        disableCopyPaste
        classes="mt-1"
        label="Confirm New Password"
        name="confirm_password"
        key="confirm_password"
        error={errors}
        passwordProps={{
          handleShowPassword,
          showPassword: confirm_password
        }}
        IsPassword
      />
    </MerchantModal>
  )
}
const mapStateToProps = ({ pass }) => ({
  state: pass.changePassword,
  showCPModal: pass.changePassword.showCPModal,
});


const mapDispatchToProps = (dispatch) => ({
  handleChange: ({ target: { id, value } }) => dispatch(changePassData(CHANGE_PASSWORD, id, value)),
  handleShowPassword: ({ currentTarget }) => {
    const { id } = currentTarget.parentElement.previousElementSibling;
    dispatch(toggleShowPasswordPass(id));
  },
  handleToggleModal: () => dispatch(toggleCPModal()),
  clearErrorsCP: () => dispatch(clearErrors(CLEAR_ERRORS_CHANGE_PASSWORD))
})


export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal);