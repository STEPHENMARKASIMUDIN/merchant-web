import FormData from 'form-data';
import { ThunkAction } from "redux-thunk";
import { MLShopMerchantState } from '../../../helpers/reducersState';
import { AnyAction, ActionCreator } from "redux";
import { AxiosStatic, AxiosRequestConfig } from "axios";
import { A, T, S, MLShopMerchantApiResponse } from "../../../helpers/merchantTypes";
import { updateOnChange, toggleSnackBar, updateTag } from "../actionHelpers";
import { SnackBMsg, error, success, reqOptions, requestCatchHandler } from "../../../helpers";
import { CHANGE_MYACCOUNT_DATA, UPDATE_MERCHANT_DATA, INITIALIZE_MYACCOUNT_DATA, INITIALIZE_IMAGES_PATHS, UPDATE_BANNER, UPDATE_PROFILE } from "../../actionTypes";


const changeMyAccountData: ActionCreator<A> = (id, value): AnyAction =>
  updateOnChange(CHANGE_MYACCOUNT_DATA, id, value);


const initializeMyAccData: ActionCreator<A> = (data): AnyAction => updateTag(INITIALIZE_MYACCOUNT_DATA, data);


const updateMyAccountData: ActionCreator<A> = (data): AnyAction => updateTag(UPDATE_MERCHANT_DATA, data);


const updateImage: ActionCreator<A> = (type, newPath): AnyAction => updateTag(type, { newPath });


const requestToUpdateMyAccountData = (request: AxiosStatic): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { myAcc, merchant_details } = getState();
      const { shop_name, email } = merchant_details.merchantData;
      const opts: AxiosRequestConfig = reqOptions('editInfo', 'post', { ...myAcc.data, shop_name, email });
      const { data }: MLShopMerchantApiResponse = await request(opts);
      switch (data.ResponseCode) {
        case 200:
          dispatch(updateMyAccountData(myAcc));
          dispatch(toggleSnackBar(success, SnackBMsg(10)));
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage));
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToUpdateMyAccountData');
    }
  }
};


const initializeImagesPath: ActionCreator<A> = (paths): AnyAction => updateTag(INITIALIZE_IMAGES_PATHS, paths);


const requestImages = (request: AxiosStatic): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { merchant_details: { merchantData }, toggle: { isAppMounted } } = getState();
      const shopName = merchantData.shop_name;
      const opts: AxiosRequestConfig = reqOptions('getProfileImages', 'get', { shopName });
      const { data }: MLShopMerchantApiResponse = await request(opts)
      switch (data.ResponseCode) {
        case 200:
          dispatch(initializeImagesPath(data.data))
          break;
        default:
          dispatch(initializeImagesPath(data.data));
          if (isAppMounted) dispatch(toggleSnackBar(error, data.ResponseMessage));
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestImages');
    }
  }
}


const requestToUpdateImage = (request: AxiosStatic, file: File, inputName: string, closeModalCallback: Function): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { merchant_details: { merchantData }, image } = getState();
      const { shop_name, email } = merchantData;
      const formData = new FormData();
      let type: string, successMsg: string;
      let currentPathToFile: string;
      if (inputName === 'profile_banner') {
        type = UPDATE_BANNER; currentPathToFile = image.bannerPath; successMsg = SnackBMsg(14);
      } else {
        type = UPDATE_PROFILE; successMsg = SnackBMsg(13); currentPathToFile = image.profilePath;
      }
      formData.append('currentPathToFile', currentPathToFile);
      formData.append('inputName', inputName);
      formData.append('email', email);
      formData.append('shop_name', shop_name);
      formData.append('type', 'profile');
      formData.append(inputName, file);
      const opts = reqOptions('changeImage', 'post', formData, null, { 'Content-Type': 'multipart/form-data' });
      const { data } = await request(opts);
      switch (data.ResponseCode) {
        case 200:
          dispatch(toggleSnackBar(success, successMsg));
          dispatch(updateImage(type, data.data.newPath))
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage));
      }
      closeModalCallback()
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToUpdateImage');
    }
  }
}



export {
  updateImage,
  requestImages,
  changeMyAccountData,
  initializeMyAccData,
  updateMyAccountData,
  requestToUpdateImage,
  initializeImagesPath,
  requestToUpdateMyAccountData,
}