import FormData from 'form-data';
import { History } from 'history';
import { MLShopMerchantState } from '../../../helpers/reducersState';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { updateOnChange, toggleSnackBar } from "../actionHelpers";
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { Action, AnyAction, ActionCreator } from 'redux';
import { A, T, R, S, IsFileAllowedResult, MLShopMerchantApiResponse } from '../../../helpers/merchantTypes';
import { CHANGE_SIGNUP_DATA, TOGGLE_SHOW_PASSWORD_SIGNUP, ON_FILE_CHANGE_SIGNUP } from "../../actionTypes";
import { isFileAllowed, isFileSizeValid, shortenedFilename, error, SnackBMsg, reqOptions, success, requestCatchHandler } from "../../../helpers";

const changeSignUpData: ActionCreator<A> = (id: string, value: string): AnyAction => {
  return updateOnChange(CHANGE_SIGNUP_DATA, id, value);
}

const toggleSignupShowPassword: ActionCreator<A> = (): Action => ({
  type: TOGGLE_SHOW_PASSWORD_SIGNUP
})


const requestToRegister = (request: AxiosStatic, d: any, files: File[], history: History): ThunkAction<T, MLShopMerchantState, S, A> => {

  return async dispatch => {
    try {
      const formData = new FormData();
      for (const key in d) {
        if (d.hasOwnProperty(key)) {
          formData.append(key, d[key])
        }
      };
      formData.append('type', 'register');
      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          formData.append(key, files[key]);
        }
      };
      const opts: AxiosRequestConfig = reqOptions('register', 'post', formData, null, { 'Content-Type': 'multipart/form-data' });
      const { data }: MLShopMerchantApiResponse = await request(opts);
      switch (data.ResponseCode) {
        case 200:
          dispatch(toggleSnackBar(success, data.ResponseMessage));
          setTimeout(() => {
            history.push('/mlshopmerchant')
          }, 3000);
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToRegister');
    }
  }
};







const onFileChange = (id: string, files: File[]): ThunkDispatch<T, R, A> => {
  return dispatch => {
    if (files && files[0]) {
      const { isAllowed, name, ext } = <IsFileAllowedResult>isFileAllowed(files);
      if (isAllowed) {
        if (isFileSizeValid(files[0].size)) {
          dispatch({
            type: ON_FILE_CHANGE_SIGNUP, payload: {
              fileDetails: window.URL.createObjectURL(files[0]),
              id,
              fileName: shortenedFilename(name),
              ext
            }
          })
        } else {
          dispatch(toggleSnackBar(error, SnackBMsg(4)));
        }
      } else {
        dispatch(toggleSnackBar(error, SnackBMsg(5)));
      }
    }
  }
}



export {
  onFileChange,
  changeSignUpData,
  requestToRegister,
  toggleSignupShowPassword,
}