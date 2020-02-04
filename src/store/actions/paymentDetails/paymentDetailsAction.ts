import { ThunkAction } from 'redux-thunk';
import { MLShopMerchantState } from '../../../helpers/reducersState';
import { AnyAction, ActionCreator } from 'redux';
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { T, R, S, A, MLShopMerchantApiResponse } from '../../../helpers/merchantTypes';
import { updateOnChange, toggleSnackBar, updateTag } from '../actionHelpers';
import { error, success, SnackBMsg, reqOptions, requestCatchHandler } from '../../../helpers';
import { CHANGE_PAYMENTDETAILS_DATA, TOGGLE_PAYMENT_DETAILS_FORM, CHANGE_PAYMENTD_SELECT_LABELWIDTH } from '../../actionTypes';


const changePaymentDetailsData: ActionCreator<A> = (id: string, value: string): AnyAction =>
  updateOnChange(CHANGE_PAYMENTDETAILS_DATA, id, value);


const changePaymentDLabelWidth: ActionCreator<A> = (width: number): AnyAction => updateTag(CHANGE_PAYMENTD_SELECT_LABELWIDTH, { width });

const togglePaymentDetailsForm: ActionCreator<A> = (name: string, value: string): AnyAction => updateOnChange(TOGGLE_PAYMENT_DETAILS_FORM, name, value);




const paymentDetailsSubmit = (request: AxiosStatic, opts: AxiosRequestConfig): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    const { paymentD: { data }, merchant_details: { merchantData } } = getState();
    const { email, merchant_id, seller_name } = merchantData;
    const o: AxiosRequestConfig = reqOptions(opts.url, opts.method, { ...data, email, merchant_id, seller_name });
    try {
      const resp = await request(o);
      const d: MLShopMerchantApiResponse = resp;
      switch (d.data.ResponseCode) {
        case 200:
          dispatch(toggleSnackBar(success, SnackBMsg(9)))
          break;
        default:
          dispatch(toggleSnackBar(error, d.data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'paymentDetailsSubmit');
    }
  }
}



export {
  paymentDetailsSubmit,
  changePaymentDLabelWidth,
  changePaymentDetailsData,
  togglePaymentDetailsForm,
}
