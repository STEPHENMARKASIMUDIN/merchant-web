import { A, T, S, RequestReportsDataOpts, MLShopMerchantApiResponse } from '../../../helpers/merchantTypes';
import { ReportType } from './../../../helpers/merchantTypes';
import { ThunkAction } from 'redux-thunk';
import { AxiosStatic } from 'axios';
import { toggleSnackBar } from '../actionHelpers';
import { MLShopMerchantState } from '../../../helpers/reducersState';
import { AnyAction, ActionCreator } from 'redux';
import { formatAndConvertToDate, SnackBMsg, error, defaultSnackB, info, requestCatchHandler } from '../../../helpers';
import {
  GET_DAILY_SALES_REPORT_DATA,
  GET_MONTHLY_REPORT_DATA, GET_MONTHLY_SALES_REPORT_DATA,
  GET_PRODUCT_INVENTORY_REPORT_DATA,
  CHANGE_DATE_REPORT, DAILY, MONTHLY
} from '../../actionTypes';


const changeDateReport: ActionCreator<A> = (date: string | Date, id: string): AnyAction => ({
  type: CHANGE_DATE_REPORT,
  payload: {
    id,
    date
  }
})





const updateReportsData: ActionCreator<A> = (type, data): AnyAction => ({
  type,
  payload: {
    data
  }
})



const getReportsData = (type: ReportType, request: AxiosStatic, path: string, props: any, dato: Date | string): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    const { merchant_details: { merchantData } } = getState();
    const date = formatAndConvertToDate(dato);
    const [year, month] = date.split('-');
    const opts = {
      type,
      dispatch,
      request,
      params: {
        vendor: merchantData.shop_name
      },
      url: '',
      path,
      props
    };


    // const date = formatAndConvertToDate(new Date());
    //let date = formatAndConvertToDate('2019-02-01');

    switch (type) {
      case GET_DAILY_SALES_REPORT_DATA:
        requestReportsData({ ...opts, url: 'salesReport', params: { ...opts.params, range: DAILY, date } });
        break;
      case GET_MONTHLY_SALES_REPORT_DATA:
        requestReportsData({ ...opts, url: 'salesReport', params: { ...opts.params, range: MONTHLY, date, year, month } });
        break;
      case GET_PRODUCT_INVENTORY_REPORT_DATA:
        //date = '2018-07-10'
        requestReportsData({ ...opts, url: 'productInventory', params: { ...opts.params, range: DAILY, date, year } });
        break;
      case GET_MONTHLY_REPORT_DATA:
        //year = '2018'; month = '07';
        requestReportsData({
          ...opts, url: 'productInventory', params: {
            ...opts.params, range: MONTHLY, date,
            year, month
          }
        });
        break;
      default:
        dispatch(toggleSnackBar('error', 'Invalid Type Supplied.'));
        break;
    }
  }
};



const requestReportsData = async (opts: RequestReportsDataOpts) => {
  const {
    params,
    type,
    request,
    url,
    dispatch,
    props,
    path
  } = opts;
  try {
    const { data }: MLShopMerchantApiResponse = await request({ url, params });
    switch (data.ResponseCode) {
      case 200:
        dispatch(updateReportsData(type, data.data));
        props.history.push(path);
        break;
      case 404:
        dispatch(toggleSnackBar(info, data.ResponseMessage));
        break;
      default:
        dispatch(toggleSnackBar(error, data.ResponseMessage));
        break;
    }
  } catch (e) {
    requestCatchHandler(request, e, dispatch, 'requestReportsData');
  }
};


export {
  getReportsData,
  changeDateReport
}