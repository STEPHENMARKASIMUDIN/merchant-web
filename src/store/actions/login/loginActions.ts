import { ThunkAction } from 'redux-thunk';
import { MLShopMerchantState } from '../../../helpers/reducersState';
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { Dispatch, AnyAction, ActionCreator } from 'redux';
import { getSnackBVariant, requestCatchHandler } from "../../../helpers";
import { A, S, T, MerchantData, MLShopMerchantApiResponse } from '../../../helpers/merchantTypes';
import { updateOnChange, toggleSnackBar, togglePopUp, updateTag } from "../actionHelpers";
import { CHANGE_LOGIN_DATA, TOGGLE_SHOW_PASSWORD_LOGIN, LOGIN_SUCCESS } from "../../actionTypes";


const toggleShowPassword: ActionCreator<A> = (): AnyAction => togglePopUp(TOGGLE_SHOW_PASSWORD_LOGIN);


const auth_login: ActionCreator<A> = (merchantData: MerchantData): AnyAction => updateTag(LOGIN_SUCCESS, merchantData);


const changeLoginData: ActionCreator<A> = (id: string, value: string): AnyAction => updateOnChange(CHANGE_LOGIN_DATA, id, value);


const login = (request: AxiosStatic, options: AxiosRequestConfig): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch: Dispatch) => {
    try {
      const { data }: MLShopMerchantApiResponse = await request(options);
      switch (data.ResponseCode) {
        case 200:
          dispatch(auth_login(data.merchant_details))
          localStorage.setItem('token', data.merchant_details.token);
          break;
        default:
          dispatch(toggleSnackBar(getSnackBVariant(data.ResponseMessage), data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'login');
    }
  }
}


export {
  login,
  auth_login,
  changeLoginData,
  toggleShowPassword,
}