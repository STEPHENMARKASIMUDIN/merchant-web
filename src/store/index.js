import axios from 'axios';
import auth from './reducers/authReducer';
import popUps from './reducers/popUpsReducer';
import date from './reducers/dateReducer';
import merchant_details from './reducers/merchantDataReducer';
import image from './reducers/imageReducer';
import toggle from './reducers/toggleCompReducer';
import thunk from 'redux-thunk';
import pass from './reducers/passwordReducer';
import orders from './reducers/ordersReducer';
import storage from 'redux-persist/lib/storage';
import products from './reducers/productsReducer';
import createEncryptor from 'redux-persist-transform-encrypt';
import reduxReset from 'redux-reset';

import login from './reducers/loginReducer';
import signup from './reducers/signupReducer';
import myAcc from './reducers/myAccountReducer';
import paymentD from './reducers/paymentDetailsReducer';
import dashB from './reducers/dashboardReducer';
import addProd from './reducers/addProductReducer';
import reports from './reducers/reportsReducer';
import editProd from './reducers/editProductReducer';



import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';


const encryptor = createEncryptor({
  secretKey: '$@#&SML$sM3c!rant1a@a',
  onError: e => {
    console.log(e.stack);
  }
})


const persistRootConfig = {
  key: 'ml$h0pm3rc@nt',
  storage,
  transforms: [encryptor],
  whitelist: ['auth', 'merchant_details', 'reports', 'image'],
}
//error,




// const persistedRootReducer = persistCombineReducers(persistRootConfig, {
//   login,
//   signup,
//   auth,
//   date,
//   image,
//   merchant_details,
//   toggle,
//   popUps,
//   pass,
//   orders,
//   products,
//   myAcc,
//   paymentD,
//   dashB,
//   addProd,
//   reports,
//   editProd
// });


const persistedRootReducer = combineReducers({
  login,
  signup,
  auth,
  date,
  image,
  merchant_details,
  toggle,
  popUps,
  pass,
  orders,
  products,
  myAcc,
  paymentD,
  dashB,
  addProd,
  reports,
  editProd
});

const enhanceStore = compose(
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ request: axios }))),
  reduxReset()
)(createStore)

const store = enhanceStore(persistedRootReducer);
const persistor = persistStore(store);
const dispatch = store.dispatch;

export {
  store,
  persistor,
  dispatch
};