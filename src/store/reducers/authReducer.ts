import { Reducer } from 'redux';
import { AuthState } from './../../helpers/reducersState';
import { LOGIN_SUCCESS, LOGOUT_USER } from '../actionTypes';


const initState = {
  loginErr: {
    hasError: false,
    message: null
  },
  isAuth: false
}



const authReducer: Reducer = (state: AuthState = initState, action): AuthState => {

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isAuth: !state.isAuth,
        loginErr: {
          hasError: false,
          message: null
        }
      }
    case LOGOUT_USER:
      return {
        isAuth: false,
        loginErr: {
          hasError: false,
          message: null
        }
      }
    default:
      return state;
  }
}


export default authReducer;