import { ThunkAction } from 'redux-thunk';
import { AnyAction, ActionCreator } from 'redux';
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { T, S, A, MLShopMerchantApiResponse } from '../../../helpers/merchantTypes';
import { error, reqOptions, requestCatchHandler } from '../../../helpers';
import { OrderDetailsData, OrderInvoiceData, MLShopMerchantState } from '../../../helpers/reducersState';
import { updatePaginationData, requestPaginationData, toggleSnackBar, updateTag } from '../actionHelpers';
import { UPDATE_CURRENT_ORDERS, UPDATE_CURRENT_ORDER_EARNINGS, UPDATE_ORDER_DETAILS, UPDATE_ORDER_INVOICE_DATA } from '../../actionTypes';


const updateCurrentOrders =
  (data: any[], paginationData: any[], page: number): AnyAction =>
    updatePaginationData(UPDATE_CURRENT_ORDERS, data, paginationData, page)

const updateCurrentOrderEarnings =
  (data: any[], paginationData: any[], page: number): AnyAction =>
    updatePaginationData(UPDATE_CURRENT_ORDER_EARNINGS, data, paginationData, page)

const requestOrders =
  (request: AxiosStatic): ThunkAction<T, MLShopMerchantState, S, A> => requestPaginationData(request, 'orders', updateCurrentOrders);

const requestOrderEarnings =
  (request: AxiosStatic): ThunkAction<T, MLShopMerchantState, S, A> => requestPaginationData(request, 'orderEarnings', updateCurrentOrderEarnings);


const changePageOrders =
  (selectedPage: number, request: AxiosStatic) =>
    requestPaginationData(request, 'orders', updateCurrentOrders, selectedPage);

const changePageOrderEarnings =
  (selectedPage: number, request: AxiosStatic) =>
    requestPaginationData(request, 'orderEarnings', updateCurrentOrderEarnings, selectedPage);



const updateOrderDetails: ActionCreator<A> = (data: OrderDetailsData): AnyAction => updateTag(UPDATE_ORDER_DETAILS, data);

const updateOrderInvoiceData: ActionCreator<A> = (data: OrderInvoiceData): AnyAction => updateTag(UPDATE_ORDER_INVOICE_DATA, data);



const requestOrderInvoiceData = (request: AxiosStatic, params: any): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async dispatch => {
    try {
      const opts: AxiosRequestConfig = reqOptions('orderInvoice', 'get', params);
      const { data }: MLShopMerchantApiResponse = await request(opts);
      switch (data.ResponseCode) {
        case 200:
          dispatch(updateOrderInvoiceData(data.data))
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestOrderInvoiceData');
    }
  }
}


const requestOrderDetails = (request: AxiosStatic, orderno: string, shopName: string): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async dispatch => {
    try {
      const opts: AxiosRequestConfig = reqOptions('orderDetails', 'get', { orderno, shopName });
      const { data }: MLShopMerchantApiResponse = await request(opts);
      switch (data.ResponseCode) {
        case 200:
          dispatch(updateOrderDetails(data.data));
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage));
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestOrderDetails');
    }

  }
}

export {
  requestOrders,
  changePageOrders,
  updateOrderDetails,
  requestOrderDetails,
  updateCurrentOrders,
  requestOrderEarnings,
  updateOrderInvoiceData,
  requestOrderInvoiceData,
  changePageOrderEarnings,
  updateCurrentOrderEarnings
}