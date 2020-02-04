import React from 'react';
import theme from '../../merchant-theme/theme';
import LoginForm from './LoginForm';
import LoginMessage from './LoginMessage';
import * as Title from 'react-document-title';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import { login } from '../../store/actions/login/loginActions';
import { reqOptions } from '../../helpers';
import { S, A, R, T } from '../../helpers/merchantTypes';
import { clearErrors } from '../../store/actions/actionHelpers';
import { ThunkDispatch } from 'redux-thunk';
import { CLEAR_ERRORS_LOGIN } from '../../store/actionTypes';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { MuiThemeProvider, Grid } from '@material-ui/core';
import { connect, MapStateToProps } from 'react-redux';
import { AxiosStatic, AxiosProxyConfig } from 'axios';




class Login extends ValidationForm {


  handleSubmit = (e: Event) => {
    e.preventDefault();
    this.props.login(this.request, reqOptions('login', 'post', { ...this.props.data }, this.cancelToken.token));
  }

  unMountFunc = () => {
    this.props.clearErrorsLogin()
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Title title="Login • Multivendor MarketPlace">
          <ErrorBoundary name="Login" request={this.request}>
            <Grid item container xs={12} spacing={16}>
              <Grid item xs={6}
                container justify="center"
                className="mt-4 login-message-wrapper">
                <LoginMessage />
              </Grid>
              <Grid item xs={6} className="login-signin-wrapper">
                <LoginForm onSubmit={this.handleSubmit} />
              </Grid>
            </Grid>
          </ErrorBoundary>
        </Title>
      </MuiThemeProvider>
    )
  }
};


const mapStateToProps: MapStateToProps<T, {}, MLShopMerchantState> = ({ login, popUps }) => ({
  data: login.data,
  snackBarProps: popUps.snackBarProps
});

const mapDispatchToProps = (dispatch: ThunkDispatch<S, R, A>) => ({
  login: (request: AxiosStatic, options: AxiosProxyConfig) => dispatch(login(request, options)),
  clearErrorsLogin: () => dispatch(clearErrors(CLEAR_ERRORS_LOGIN))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

