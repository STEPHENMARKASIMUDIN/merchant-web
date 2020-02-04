import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, AnyAction } from 'redux';
import { persistor, store } from './store';
import { MLShopMerchantState } from './helpers/reducersState';

import './styles/index.scss';



const root: HTMLElement = document.getElementById('root');
const merchantStore: Store<MLShopMerchantState, AnyAction> = store;
const merchantPersistor: Persistor = persistor;

ReactDOM.render(
  <Provider store={merchantStore}>
    <App />
    {/* <PersistGate persistor={merchantPersistor} loading={null} >
      <App />
    </PersistGate> */}
  </Provider>, root);
