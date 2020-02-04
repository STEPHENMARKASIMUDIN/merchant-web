import React from 'react';
import merchantLogin from '../../images/merchant-icon.png';

interface LoginHeaderProps {
  [key: string]: any
}

const LoginHeader = ({ }: LoginHeaderProps) => (
  <div className="img-wrapper">
    <img
      src={merchantLogin}
      alt="Merchant Logo" />
  </div>

);

export default LoginHeader;