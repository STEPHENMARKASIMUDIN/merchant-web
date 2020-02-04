import { Reducer } from 'redux';
import { DashboardState } from './../../helpers/reducersState';
import { UPDATE_DASHBOARD_DATA, UPDATE_ORDER_EARNINGS, LOGOUT_USER } from '../actionTypes';

const initState = {
  Recent_Orders: [],
  Order_Earnings: 0
};



const dashboard: Reducer = (state: DashboardState = initState, action): DashboardState => {

  switch (action.type) {
    case UPDATE_DASHBOARD_DATA:
      const { Recent_Orders, Order_Earnings } = action.payload;
      return {
        ...state,
        Recent_Orders,
        Order_Earnings
      }
    case UPDATE_ORDER_EARNINGS:
      const { new_order_earnings } = action.payload;
      return {
        ...state,
        Order_Earnings: new_order_earnings
      }
    case LOGOUT_USER:
      return {
        ...initState,
      }
    default:
      return state;
  }
};



export default dashboard;