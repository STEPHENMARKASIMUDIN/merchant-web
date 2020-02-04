import { Reducer } from 'redux';
import { PasswordState } from '../../helpers/reducersState';
import { schemaResetPassword, schemaChangePassword } from '../../components/utils/Schemas';
import { validateInput, validateData, resetErrors, updateState } from '../actions/actionHelpers';
import { TOGGLE_PASS_PASSWORD, CHANGE_PASSWORD, RESET_PASSWORD, CLEAR_ERRORS_RESET_PASSWORD, TOGGLE_CHANGEPASS_MODAL, CLEAR_ERRORS_CHANGE_PASSWORD } from '../actionTypes';

const initState = {
  changePassword: {
    current_password: false,
    new_password: false,
    confirm_password: false,
    data: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    errors: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    isDisabled: true,
    showCPModal: false
  },
  resetPassword: {
    data: {
      email: '',
      contact_number: ''
    },
    errors: {
      email: '',
      contact_number: ''
    },
    isDisabled: true
  },
  isFocus: true,
}

const passwordReducer: Reducer = (state: PasswordState = initState, action): PasswordState => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      const newCPState = updateState(state.changePassword, action.payload, schemaChangePassword, true);
      return {
        ...state,
        changePassword: { ...newCPState }
      }
    case TOGGLE_PASS_PASSWORD:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          [action.payload.id]: !state.changePassword[action.payload.id]
        }
      }
    case CLEAR_ERRORS_RESET_PASSWORD:
      const { errors, data } = resetErrors(state.resetPassword.errors, state.resetPassword.data);
      return {
        ...state,
        resetPassword: {
          data,
          errors,
          isDisabled: true
        }
      }
    case CLEAR_ERRORS_CHANGE_PASSWORD:
      const d = resetErrors(state.changePassword.errors, state.changePassword.data);
      return {
        ...state,
        changePassword: {
          data: d.data,
          errors: d.errors,
          isDisabled: true
        }
      }
    case RESET_PASSWORD:
      const error = validateInput(action.payload.id, action.payload.value, schemaResetPassword);
      const nS = {
        ...state,
        resetPassword: {
          data: {
            ...state.resetPassword.data,
            [action.payload.id]: action.payload.value
          },
          errors: {
            ...state.resetPassword.errors,
            [action.payload.id]: error
          }
        }
      }
      const isDisabled = validateData(nS.resetPassword.data, schemaResetPassword);
      return {
        ...nS, resetPassword: {
          ...nS.resetPassword,
          isDisabled
        }
      }
    case TOGGLE_CHANGEPASS_MODAL:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          showCPModal: !state.changePassword.showCPModal
        }
      }
    default:
      return state;
  }

}

export default passwordReducer;