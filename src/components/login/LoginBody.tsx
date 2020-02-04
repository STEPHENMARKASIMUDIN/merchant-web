import React, { Fragment } from 'react';
import { Email } from '@material-ui/icons';
import { S, A, R, T } from '../../helpers/merchantTypes';
import { Typography } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { MerchantFormField } from '../utils/Forms';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { connect, MapStateToProps } from 'react-redux';
import { changeLoginData, toggleShowPassword } from '../../store/actions/login/loginActions';


interface LoginBodyProps {
  showPassword?: boolean
  handleShowPassword?: Function,
  errors?: {
    email: string
    password: string
  }
  handleChange?: Function
  data?: {
    email: string
    password: string
  }
}




const LoginBody = (props: LoginBodyProps) => {

  const { showPassword, handleShowPassword,
    errors, handleChange, data } = props;
  const { email, password } = data;
  return (
    <Fragment>
      <Typography
        variant="h5"
        children="Seller Login"
        className="mb-2 title"
      />
      <p style={{ fontSize: '0.95rem', marginTop: 5 }}>Please Sign in here. To Continue to ML Shop</p>
      <MerchantFormField
        isNormal
        name="email"
        value={email}
        error={errors}
        className="mb-1"
        handleChange={handleChange}
        Icon={Email}
        label="Email"
        isEmail
        InputProps={{
          inputPropsClasses: 'pr-0'
        }}
      />
      <MerchantFormField
        isNormal
        label="Password"
        name="password"
        error={errors}
        handleChange={handleChange}
        className="mb-1"
        value={password}
        IsPassword
        passwordProps={{
          showPassword,
          handleShowPassword
        }}
        InputProps={{
          inputPropsStyle: { padding: 0 }
        }}
      />
    </Fragment>
  )
}


const mapStateToProps: MapStateToProps<T, LoginBodyProps, MLShopMerchantState> = ({ login }) => ({
  data: login.data,
  errors: login.errors,
  showPassword: login.showPassword
})
const mapDispatchToProps = (dispatch: ThunkDispatch<S, R, A>) => ({
  handleChange: ({ target: { id, value } }) => dispatch(changeLoginData(id, value)),
  handleShowPassword: () => dispatch(toggleShowPassword())
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginBody);
