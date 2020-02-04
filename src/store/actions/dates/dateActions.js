import { CHANGE_DATE, UPDATE_ORDER_EARNINGS } from "../../actionTypes";
import { toggleSnackBar, updateOnChange } from "../actionHelpers";
import { isEqual, isBefore, isAfter, toDate, isDate } from 'date-fns';
import { formatAndConvertToDate, reqOptions, error, warning, SnackBMsg } from "../../../helpers";

const changeDate = (id, value, request) => (
  (dispatch, getState) => {
    const { date: { data }, merchant_details } = getState();
    const shopName = merchant_details.merchantData.shop_name;
    let dateToCompare = null;

    let from, to;
    value = formatAndConvertToDate(value);
    switch (id) {
      case 'from':
        dateToCompare = formatAndConvertToDate(data.to);
        to = dateToCompare;
        from = value;
        break;
      default:
        dateToCompare = formatAndConvertToDate(data.from);
        from = dateToCompare;
        to = value;
        break;
    }



    const areDatesEqual = isEqual(value, dateToCompare);
    const f = toDate(from), t = toDate(to);

    const opts = {
      request,
      dispatch,
      f,
      t,
      shopName
    }


    if (areDatesEqual) {
      dispatch(updateDate(id, value))
      requestTotalSale(opts);
      return;
    } else {
      switch (id) {
        case 'from':
          const isFromBefore = isBefore(value, dateToCompare);

          if (isFromBefore) {
            dispatch(updateDate(id, value))
            requestTotalSale(opts);
            return;
          } else {
            dispatch(toggleSnackBar(warning, SnackBMsg(6)));
            return;
          }
        default:
          const isToAfter = isAfter(value, dateToCompare);
          if (isToAfter) {
            dispatch(updateDate(id, value))
            requestTotalSale(opts);
            return;
          } else {
            dispatch(toggleSnackBar(warning, SnackBMsg(7)));
            return;
          }
      }
    }




  }
);


const requestTotalSale = async (opts) => {
  const {
    request,
    dispatch,
    f,
    t,
    shopName
  } = opts;

  if (isDate(f) && isDate(t)) {
    try {
      const { data } = await request(reqOptions('dashboard', 'post', { shopName, from: f, to: t }));
      // const dispatches = {
      //   200: dispatch(receivedTotalSale(data.Order_Earnings)),
      //   'default': dispatch(toggleSnackBar(error, data.ResponseMessage))
      // }
      // return dispatches[dispatchCode(data.ResponseCode)];
      switch (data.ResponseCode) {
        case 200:
          dispatch(receivedTotalSale(data.Order_Earnings))
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage))
          break;
      }

    } catch (e) {
      if (e.message === 'Network Error') {
        dispatch(toggleSnackBar(error, SnackBMsg(1)))
        return;
      }
      dispatch(toggleSnackBar(error, SnackBMsg(0)));
    }
  } else {
    dispatch(toggleSnackBar(error, SnackBMsg(3)));
  }

}

const updateDate = (id, value) => updateOnChange(CHANGE_DATE, id, value);

const receivedTotalSale = (new_order_earnings) => ({
  type: UPDATE_ORDER_EARNINGS,
  payload: {
    new_order_earnings
  }
})




export {
  updateDate,
  changeDate,
  receivedTotalSale
}