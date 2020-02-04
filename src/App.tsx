import React, { Fragment, useEffect, useState } from 'react';
import Navbar from './components/navbar';
import theme from './merchant-theme/theme';
import SnackB from './components/utils/CustomSnackBar';
import LoadingModal from './components/utils/LoadingModal';
import UnGuardedRoutes from './components/routes/UnGuardedRoutes';
import { T, R, A, S } from './helpers/merchantTypes';
import { SnackBProps } from './components/utils/ComponentProps';
import { BrowserRouter } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { toggleSnackBar } from './store/actions/actionHelpers';
import { MuiThemeProvider } from '@material-ui/core';
import { MLShopMerchantState } from './helpers/reducersState';
import { connect, MapStateToProps } from 'react-redux';
import { dispatch } from './store';
import { LOGIN_SUCCESS, TOGGLE_IS_APP_MOUNTED } from './store/actionTypes';
import axios from 'axios';
import { auth_login } from './store/actions/login/loginActions';
import { updateMyAccountData } from './store/actions/my-account/myAccountActions';
import { setLocation, API_URL } from './helpers';


export interface AppProps {
  showModal?: false
  setSnackbarProps?: Function
  snackBarProps?: SnackBProps
}


export type AppState = MLShopMerchantState;

function callbackBeforeUnload(isReload: boolean) {
  if (!isReload) {
    window.localStorage.removeItem("persist:ml$h0pm3rc@nt");
  }

}
function App(props: AppProps) {

  let isReload = false;

  // window.addEventListener('contextmenu', function (e) {
  //   e.preventDefault();
  //   return false;
  // })

  // window.addEventListener('keydown', (e) => {
  //   if (e.keyCode === 116 || ((e.key === 'R' || e.key === 'r') && e.ctrlKey)) {
  //     isReload = true
  //   }
  // });

  // window.onbeforeunload = function (e) {
  //   if (!isReload) {
  //     window.localStorage.removeItem("persist:ml$h0pm3rc@nt");
  //   }
  // }

  useEffect(() => {
    const runSomeAsync = async (token: string) => {
      const resp = await axios.get(`${API_URL}getUserData`)
      dispatch({ type: LOGIN_SUCCESS, payload: { current_password: 123456 } })
      dispatch(updateMyAccountData({ data: resp.data.merchant_details }));
      console.log(resp.data);
      setTimeout(() => {
        dispatch({ type: TOGGLE_IS_APP_MOUNTED });
      }, 0)
    }
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      runSomeAsync(token);
    }
  }, []);

  // useEffect(() => {
  //   window.addEventListener('keydown', (e) => {
  //     if (e.keyCode === 116) {
  //       setReload(true);
  //       callbackBeforeUnload(isReload)
  //     }
  //   })
  //   window.addEventListener('beforeunload', () => {
  //     callbackBeforeUnload(isReload)
  //   });
  //   // return function cleanup() {
  //   //   window.removeEventListener('beforeunload', callbackBeforeUnload)
  //   // }
  // }, [])
  return (
    <BrowserRouter>
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <LoadingModal
            open={props.showModal}
          />
          <Navbar />
          <UnGuardedRoutes />
          <SnackB
            handleClose={() => props.setSnackbarProps()}
            {...props.snackBarProps}
          />
        </MuiThemeProvider>
      </Fragment>
    </BrowserRouter>
  );
}

const mapStateToProps: MapStateToProps<T, AppProps, MLShopMerchantState> = ({ popUps }) => ({
  showModal: popUps.showModal,
  snackBarProps: popUps.snackBarProps
});



const mapDispatchToProps = (dispatch: ThunkDispatch<S, R, A>) => ({
  setSnackbarProps: (variant: string, message: string) => dispatch(toggleSnackBar(variant, message))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
