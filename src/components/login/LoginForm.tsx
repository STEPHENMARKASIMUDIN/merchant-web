import React from 'react';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';
import LoginBody from './LoginBody';

interface LoginFormProps {
  onSubmit?: any
}

const LoginForm = (props: LoginFormProps) => {
  return (
    <div className="login_wrapper mt-3">
      <form onSubmit={props.onSubmit}
        className="paper">
        <LoginHeader />
        <LoginBody />
        <LoginFooter />
      </form>
    </div>
  )
};




export default LoginForm;