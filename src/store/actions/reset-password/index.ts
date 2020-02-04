import { ThunkAction } from 'redux-thunk';
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { AnyAction, Action, ActionCreator } from 'redux';
import { A, T, R, S, MLShopMerchantApiResponse } from '../../../helpers/merchantTypes';
import { ChangePasswordData, MLShopMerchantState } from '../../../helpers/reducersState';
import { updateOnChange, toggleSnackBar, clearErrors, togglePopUp, updateTag } from "../actionHelpers";
import { success, error, SnackBMsg, warning, reqOptions, requestCatchHandler } from "../../../helpers";
import { TOGGLE_PASS_PASSWORD, TOGGLE_CHANGEPASS_MODAL, UPDATE_PASSWORD, CLEAR_ERRORS_CHANGE_PASSWORD } from "../../actionTypes";


const changePassData: ActionCreator<A> = (type: string, id: string, value: string): AnyAction => updateOnChange(type, id, value);

const toggleShowPasswordPass: ActionCreator<A> = (id: string): AnyAction => updateTag(TOGGLE_PASS_PASSWORD, { id })

const toggleCPModal: ActionCreator<A> = (): Action => togglePopUp(TOGGLE_CHANGEPASS_MODAL);

const updatePassword: ActionCreator<A> = (p: string): AnyAction => updateTag(UPDATE_PASSWORD, { p })



const requestToChangePassword = (request: AxiosStatic, data: ChangePasswordData): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { new_password, current_password, confirm_password } = data;
      const { merchant_details } = getState();
      const password = merchant_details.merchantData.password;

      if (!current_password) {
        return dispatch(toggleSnackBar(warning, SnackBMsg(17)));
      } else if (password !== current_password) {
        return dispatch(toggleSnackBar(warning, SnackBMsg(17)));
      }
      else if (new_password.length < 5) {
        return dispatch(toggleSnackBar(error, SnackBMsg(19)));
      }
      else if (new_password !== confirm_password) {
        return dispatch(toggleSnackBar(error, SnackBMsg(18)));
      } else {
        const opts: AxiosRequestConfig = reqOptions('changePassword', 'post', { old_password: password, new_password });
        const { data }: MLShopMerchantApiResponse = await request(opts);
        switch (data.ResponseCode) {
          case 200:
            dispatch(updatePassword(new_password));
            dispatch(toggleSnackBar(success, SnackBMsg(20)));
            dispatch(clearErrors(CLEAR_ERRORS_CHANGE_PASSWORD));
            break;
          default:
            dispatch(toggleSnackBar(error, data.ResponseMessage))
            break;
        }
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToChangePassword');
    }
  }
}




const resetPassword = (req: AxiosStatic, opts: AxiosRequestConfig): ThunkAction<T, R, S, A> => {
  return async dispatch => {
    try {
      const { data }: MLShopMerchantApiResponse = await req(opts);
      switch (data.ResponseCode) {
        case 200:
          dispatch(toggleSnackBar(success, SnackBMsg(8)))
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(req, e, dispatch, 'requestToChangePassword');
    }
  }
}


export {
  toggleCPModal,
  resetPassword,
  changePassData,
  updatePassword,
  toggleShowPasswordPass,
  requestToChangePassword
}