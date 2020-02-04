import { Reducer } from 'redux';
import { LoginState } from './../../helpers/reducersState';
import { schemaLogin } from "../../components/utils/Schemas";
import { updateState, resetErrors } from "../actions/actionHelpers";
import { CHANGE_LOGIN_DATA, TOGGLE_SHOW_PASSWORD_LOGIN, LOGIN_SUCCESS, CLEAR_ERRORS_LOGIN } from "../actionTypes";





const initState = {
  data: {
    email: '',
    password: '',
  },
  errors: {
    email: '',
    password: ''
  },
  showPassword: false,
  isDisabled: true
};




const loginReducer: Reducer = (state: LoginState = initState, action): LoginState => {
  switch (action.type) {
    case CHANGE_LOGIN_DATA:
      return updateState(state, action.payload, schemaLogin);
    case LOGIN_SUCCESS:
      return {
        ...initState
      };
    case CLEAR_ERRORS_LOGIN:
      const { errors, data } = resetErrors(state.errors, state.errors);
      return {
        ...state,
        isDisabled: true,
        data,
        errors,
      };
    case TOGGLE_SHOW_PASSWORD_LOGIN:
      return {
        ...state,
        showPassword: !state.showPassword
      }
    default:
      return state;
  }
}


export default loginReducer;


