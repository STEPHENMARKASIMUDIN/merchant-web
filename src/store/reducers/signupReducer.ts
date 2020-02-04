import { SignupState } from './../../helpers/reducersState';
import { schemaSignup } from "../../components/utils/Schemas";
import { updateState, resetErrors } from "../actions/actionHelpers";
import {
  CHANGE_SIGNUP_DATA, TOGGLE_SHOW_PASSWORD_SIGNUP, ON_FILE_CHANGE_SIGNUP, CLEAR_ERRORS_SIGNUP
} from "../actionTypes";
import { Reducer } from 'redux';



const initState = {
  data: {
    seller_name: '',
    shop_name: '',
    email: '',
    password: '',
    store_address: '',
    city: '',
    zipcode: '',
    country: 'Philippines',
    contact_number: '',
    store_description: '',
  },
  errors: {
    seller_name: '',
    shop_name: '',
    email: '',
    password: '',
    store_address: '',
    city: '',
    zipcode: '',
    country: '',
    contact_number: '',
    store_description: '',
  },
  showPassword: false,
  isDisabled: true,
  fileInputLabels: {
    business_permit: {
      label: 'Business Permit',
      ext: ''
    },
    brgy_clearance: {
      label: 'Brgy Clearance',
      ext: ''
    },
    police_clearance: {
      label: 'Police Clearance',
      ext: ''
    },
    valid_id: {
      label: 'Valid ID',
      ext: ''
    }
  },
  files: {
    business_permit: null,
    brgy_clearance: null,
    police_clearance: null,
    valid_id: null
  },
}

const signupReducer: Reducer = (state: SignupState = initState, action): SignupState => {

  switch (action.type) {
    case CHANGE_SIGNUP_DATA:
      return updateState(state, action.payload, schemaSignup);
    case TOGGLE_SHOW_PASSWORD_SIGNUP:
      return {
        ...state,
        showPassword: !state.showPassword
      }
    case ON_FILE_CHANGE_SIGNUP:
      const { fileDetails, id, fileName, ext } = action.payload;
      return {
        ...state,
        files: {
          ...state.files,
          [id]: fileDetails,
        },
        fileInputLabels: {
          ...state.fileInputLabels,
          [id]: {
            label: fileName,
            ext
          }
        }
      }
    case CLEAR_ERRORS_SIGNUP:
      const { data, errors } = resetErrors(state.errors, state.data);
      return {
        ...state,
        isDisabled: true,
        errors,
        data
      }
    default:
      return state;
  }

}


export default signupReducer;