import FormData from 'form-data';
import { ThunkAction } from "redux-thunk";
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { ActionCreator, Action } from "redux";
import { MLShopMerchantState } from "../../../helpers/reducersState";
import { updateTag, updateOnChange, toggleSnackBar, clearErrors } from "../actionHelpers";
import { error, SnackBMsg, reqOptions, success, requestCatchHandler } from "../../../helpers";
import { A, T, S, OptsData, AddProductFiles, MLShopMerchantApiResponse } from "../../../helpers/merchantTypes";
import { CHANGE_ADD_PRODUCT_DATA, CHANGE_ADD_PRODUCT_SELECT_LABELWIDTH, ADD_TAG_ADD_PRODUCT, DELETE_TAG_ADD_PRODUCT, CLEAR_OPTIONS, CLEAR_ERRORS_ADD_PRODUCT } from "../../actionTypes";


const changeAddProductData: ActionCreator<A> = (id: string, value: string) => updateOnChange(CHANGE_ADD_PRODUCT_DATA, id, value);

const addTagAddProduct: ActionCreator<A> = (data: string, optionName?: string) => updateTag(ADD_TAG_ADD_PRODUCT, { data, optionName });

const deleteTagAddProduct: ActionCreator<A> = (data: string, i: number, optionName?: string) => updateTag(DELETE_TAG_ADD_PRODUCT, { data, i, optionName });

const changeAddProductLabelWidth: ActionCreator<A> = (width: number) => ({
  type: CHANGE_ADD_PRODUCT_SELECT_LABELWIDTH,
  payload: {
    width
  }
});


const clearOptions: ActionCreator<A> = (): Action => clearErrors(CLEAR_OPTIONS);


const clearErrorsAP: ActionCreator<A> = (): Action => clearErrors(CLEAR_ERRORS_ADD_PRODUCT);


const requestToAddProduct = (request: AxiosStatic, files: AddProductFiles[], options: OptsData[], clearFiles?: Function): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { addProd, merchant_details } = getState();
      const body = addProd.data;
      const fd = new FormData();
      const isPriceGreaterThanCompareAtPrice = (+body.price >= +body.comp_at_price);
      if (isPriceGreaterThanCompareAtPrice) {
        return dispatch(toggleSnackBar(error, SnackBMsg(22)));
      } else {
        for (const key in body) {
          if (key === 'comp_at_price') {
            fd.append('compare_at_price', body[key]);
          } else if (key === 'product_tags') {
            fd.append('tags', body[key]);
          } else {
            fd.append(key, body[key]);
          }
        }
        fd.append('type', 'add_product');
        fd.append('vendor', merchant_details.merchantData.shop_name);
        fd.append('options', options.length ? JSON.stringify(options) : false);
        for (let i = 0; i < files.length; i++) {
          fd.append(files[i].inputID, files[i].file[0]);
        }


        const opts: AxiosRequestConfig = reqOptions('addEditProduct', 'post', fd, null, { 'Content-Type': 'multipart/form-data' });
        const { data }: MLShopMerchantApiResponse = await request(opts);
        switch (data.ResponseCode) {
          case 200:
            dispatch(toggleSnackBar(success, SnackBMsg(28)))
            dispatch(clearErrorsAP());
            clearFiles();
            break;
          default:
            dispatch(toggleSnackBar(error, data.ResponseMessage));
            break;
        }
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToAddProduct');
    }
  }
}



export {
  clearOptions,
  clearErrorsAP,
  addTagAddProduct,
  deleteTagAddProduct,
  requestToAddProduct,
  changeAddProductData,
  changeAddProductLabelWidth
}