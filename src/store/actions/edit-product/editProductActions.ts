import { ThunkAction } from 'redux-thunk';
import { AxiosStatic } from 'axios';
import { MLShopMerchantState } from '../../../helpers/reducersState';
import { AnyAction, ActionCreator, Action } from "redux";
import { A, T, S, MLShopMerchantApiResponse } from "../../../helpers/merchantTypes";
import { toggleSnackBar, updateTag, clearErrors, updateOnChange } from '../actionHelpers';
import { reqOptions, SnackBMsg, error, success, requestCatchHandler } from '../../../helpers';
import { CHANGE_EDIT_PRODUCT_DATA, CHANGE_EDIT_PRODUCT_SELECT_LABELWIDTH, UPDATE_CURRENT_EDIT_PRODUCT_DETAILS, ADD_TAG_EDIT_PRODUCT, DELETE_TAG_EDIT_PRODUCT, CLEAR_ERRORS_EDIT_PRODUCT } from "../../actionTypes";



const changeEditProductData: ActionCreator<A> = (id, value): AnyAction => updateOnChange(CHANGE_EDIT_PRODUCT_DATA, id, value);


const changeEditProductLabelWidth: ActionCreator<A> = (width): AnyAction => ({
  type: CHANGE_EDIT_PRODUCT_SELECT_LABELWIDTH,
  payload: {
    width
  }
})


const updateEditProductDetails: ActionCreator<A> = (data): AnyAction => ({
  type: UPDATE_CURRENT_EDIT_PRODUCT_DETAILS,
  payload: {
    ...data
  }
});


const deleteTagEditProduct: ActionCreator<A> = (data, i): AnyAction => updateTag(DELETE_TAG_EDIT_PRODUCT, { data, i });

const addTagEditProduct: ActionCreator<A> = (data): AnyAction => updateTag(ADD_TAG_EDIT_PRODUCT, data)


const clearErrorsEP: ActionCreator<A> = (): Action => clearErrors(CLEAR_ERRORS_EDIT_PRODUCT);



const requestToEditProduct = (request: AxiosStatic, product_number: number): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      let body = currentState.editProd.data;
      const vendor = currentState.merchant_details.merchantData.shop_name;
      const reqBody = { ...body, compare_at_price: body.comp_at_price, product_id: product_number, vendor, tags: body.product_tags, type: 'edit_product' };
      const isPriceGreaterThanCompareAtPrice = (+reqBody.price >= +reqBody.compare_at_price);
      if (isPriceGreaterThanCompareAtPrice) {
        return dispatch(toggleSnackBar(error, SnackBMsg(22)));
      } else {
        const opts = reqOptions('addEditProduct', 'post', reqBody);
        const { data }: MLShopMerchantApiResponse = await request(opts);
        switch (data.ResponseCode) {
          case 200:
            dispatch(toggleSnackBar(success, SnackBMsg(25)))
            break;
          default:
            dispatch(toggleSnackBar(error, data.ResponseMessage))
            break;
        }
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToEditProduct');
    }
  }


}





export {
  clearErrorsEP,
  addTagEditProduct,
  deleteTagEditProduct,
  requestToEditProduct,
  changeEditProductData,
  updateEditProductDetails,
  changeEditProductLabelWidth,
}