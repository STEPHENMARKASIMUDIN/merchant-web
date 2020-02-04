import { Reducer } from 'redux';
import { ReportsState } from './../../helpers/reducersState';
import {
  GET_DAILY_SALES_REPORT_DATA,
  GET_MONTHLY_REPORT_DATA, GET_MONTHLY_SALES_REPORT_DATA,
  GET_PRODUCT_INVENTORY_REPORT_DATA,
  LOGOUT_USER,
  CHANGE_DATE_REPORT
} from '../actionTypes';



const initState = {
  monthlySales: [],
  dailySales: [],
  daily: [],
  monthly: [],
  data: {
    monthlysalesdate: new Date(),
    dailysalesdate: new Date(),
    daily: new Date(),
    monthly: new Date()
  }
}


const reportsReducer: Reducer = (state: ReportsState = initState, action): ReportsState => {

  switch (action.type) {
    case GET_DAILY_SALES_REPORT_DATA:
      return {
        ...state,
        dailySales: action.payload.data
      }
    case GET_MONTHLY_REPORT_DATA:
      return {
        ...state,
        monthly: action.payload.data
      }
    case GET_MONTHLY_SALES_REPORT_DATA:
      return {
        ...state,
        monthlySales: action.payload.data
      }
    case GET_PRODUCT_INVENTORY_REPORT_DATA:
      return {
        ...state,
        daily: action.payload.data
      }
    case CHANGE_DATE_REPORT:
      const { id, date } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: date
        }
      }
    case LOGOUT_USER:
      return {
        ...initState
      }
    default:
      return state;
  }
};


export default reportsReducer;