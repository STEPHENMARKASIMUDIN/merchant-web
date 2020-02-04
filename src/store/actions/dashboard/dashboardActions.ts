import { ThunkAction } from "redux-thunk";
import { toggleSnackBar, updateTag } from "../actionHelpers";
import { UPDATE_DASHBOARD_DATA } from "../../actionTypes";
import { AnyAction, ActionCreator } from "redux";
import { AxiosStatic, AxiosRequestConfig } from "axios";
import { A, R, T, S, MLShopMerchantApiResponse } from "../../../helpers/merchantTypes";
import { success, getSnackBVariant, requestCatchHandler } from "../../../helpers";



const updateDashboardData: ActionCreator<A> = (data): AnyAction => updateTag(UPDATE_DASHBOARD_DATA, data);



const requestDashboardData = (request: AxiosStatic, opts: AxiosRequestConfig): ThunkAction<T, R, S, A> => {
  return async dispatch => {
    try {
      const resp: MLShopMerchantApiResponse = await request(opts);
      const { ResponseCode, data, ResponseMessage } = resp.data;
      switch (ResponseCode) {
        case 200:
          dispatch(updateDashboardData(data));
          const { length } = data.Recent_Orders;
          if (data.Recent_Orders) {
            dispatch(toggleSnackBar(success, `Received ${length} Order${length === 1 ? '' : 's'}`));
          } else {
            dispatch(toggleSnackBar(success, 'Received no Orders.'));
          }
          break;
        default:
          dispatch(toggleSnackBar(getSnackBVariant(ResponseMessage), ResponseMessage));
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestDashboardData');
    }
  }
}



export {
  updateDashboardData,
  requestDashboardData
}


