import { request, reqOptions, error, SnackBMsg, setLocation } from '../../helpers';
import {
  CHANGE_DATE, SHOW_EDIT,
  CHANGE_PASSWORD, RESET_PASSWORD,
  REGISTER_MERCHANT, LOGIN_SUCCESS,
  GET_RECENT_ORDERS, TOGGLE_DRAWER,
  UPDATE_CURRENT_PRODUCTS, LOGOUT_USER, RESET
} from '../actionTypes';
import { persistor } from '..';
import { toggleSnackBar } from './actionHelpers';




export function logout() {
  return {
    type: LOGOUT_USER
  }
}

export function reset() {
  return {
    type: RESET
  }
}


export function toggle_drawer(open = true) {
  if (open) {
    return {
      type: TOGGLE_DRAWER
    }
  } else {
    return {
      type: TOGGLE_DRAWER,
      payload: {

      }
    }
  }
}



const resetStore = (dispatch, history) => {
  dispatch(logout()); dispatch(reset());
  window.localStorage.removeItem("persist:ml$h0pm3rc@nt");
  history.push('/');
}


export function logout_user(history, request, shopName) {

  return async dispatch => {
    try {
      const opts = reqOptions('logout', 'post', { shopName });
      dispatch(toggle_drawer(false));
      const { data } = await request(opts);
      localStorage.clear();
      persistor.purge().then(result => {
        resetStore(dispatch, history);
      }).catch(e => {
        dispatch(toggle_drawer(true));
        resetStore(dispatch, history);
      })
    } catch (e) {
      resetStore(dispatch, history);
      if (e.message === 'Network Error') {
        return;
      }
      dispatch(toggleSnackBar(error, SnackBMsg(0)))
    }
  }
}


export function update_current_products(productLists) {
  return {
    type: UPDATE_CURRENT_PRODUCTS,
    payload: productLists
  }
}


export function request_current_products(shopName) {
  const options = {
    method: 'get',
    url: 'http://192.168.17.7:3000/mlshopmerchant/products',
    params: {
      shopName,
      page: 1
    }
  }


  return dispatch => {
    dispatch(update_current_products([]));
    //dispatch(toggle_loading());
    request(options)
      .then(result => {
        //dispatch(toggle_loading());
        if (result.data.ResponseCode === 200) {
          dispatch(update_current_products(result.data.data));
        }
      })
      .catch(e => {
        //dispatch(toggle_loading());
        console.log(e);
      })
  }
}




export function login_success(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}



export function recent_orders(Recent_Orders, Order_Earnings) {
  return {
    type: GET_RECENT_ORDERS,
    payload: {
      Recent_Orders,
      Order_Earnings
    }
  }
}


export function get_recent_orders(shopName) {

  const options = {
    url: "http://localhost:3000/mlshopmerchant/dashboardData",
    type: 'get',
    params: {
      shopName: shopName
    }
  }
  return dispatch => {
    //dispatch(toggle_loading());
    dispatch(recent_orders([],
      0));
    request(options)
      .then(response => {
        //dispatch(toggle_loading());
        switch (response.data.ResponseCode) {
          case 200:
            dispatch(recent_orders(response.data.data.Recent_Orders,
              response.data.data.Order_Earnings))
            break;
          default:
            break;
        }
      })
      .catch(e => {
        //dispatch(toggle_loading());
      });
  }
}




export function change_date(id, value) {
  return {
    type: CHANGE_DATE,
    data: {
      id,
      value
    }
  }
}

export function show_edit() {
  return {
    type: SHOW_EDIT
  }
}


export function change_password(oldPass, newPass) {

  return {
    type: CHANGE_PASSWORD,
    data: {
      oldPass,
      newPass
    }
  }
}

export function reset_password(email, contact_number) {
  return {
    type: RESET_PASSWORD,
    data: {
      email,
      contact_number
    }
  }
}

export function register(data) {
  return {
    type: REGISTER_MERCHANT,
    data
  }
}