import { Reducer } from 'redux';
import { MerchantDataState } from './../../helpers/reducersState';
import { EDIT_INFO, LOGIN_SUCCESS, RESET, UPDATE_MERCHANT_DATA, UPDATE_PASSWORD, UPDATE_CURRENT_PRODUCTS } from "../actionTypes";

export const initState = {
  merchantData: {
    merchant_id: null,
    seller_name: null,
    city: null,
    contact_number: null,
    country: null,
    orders: null,
    products: null,
    email: null,
    shop_name: null,
    status: null,
    store_address: null,
    store_description: null,
    store_details: null,
    store_policies: null,
    password: null,
    zipcode: '',
    current_password: null,
  },
}




const merchantDataReducer: Reducer = (state: MerchantDataState = initState, action): MerchantDataState => {
  switch (action.type) {
    case EDIT_INFO:
      return {
        merchantData: {
          ...action.payload
        }
      }
    case LOGIN_SUCCESS:
      return {
        merchantData: {
          ...action.payload,
          password: action.payload.current_password
        }
      }
    case UPDATE_MERCHANT_DATA:
      return {
        merchantData: {
          ...state.merchantData,
          ...action.payload.data,
        }
      }
    case UPDATE_PASSWORD:
      return {
        merchantData: {
          ...state.merchantData,
          password: action.payload.p,
          current_password: action.payload.p
        }
      }
    case UPDATE_CURRENT_PRODUCTS:
      return {
        merchantData: {
          ...state.merchantData,
          products: action.payload.data.length
        }
      }
    case RESET:
      return {
        merchantData: {
          ...initState.merchantData
        }
      }
    default:
      return state;
  }
}



// merchantData: {
//   merchant_id: action.data.merchant_id,
//   name: action.data.name,
//   shopName: action.data.shopName,
//   email: action.data.email,
//   city: action.data.city,
//   zipcode: action.data.zipcode,
//   country: action.data.country,
//   number: action.data.number,
//   storeDescription: action.data.number,
//   password: action.data.password,
//   storeAddress: action.data.storeAddress,
//   store_details: action.data.store_details,
//   store_policies: action.data.store_policies,
//   products: action.data.products,
//   orders: action.data.orders,
//   current_password: action.data.current_password
// }
export default merchantDataReducer;