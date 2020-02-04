import React from 'react';
import BtnLink from '../utils/BtnLink';
import { Typography } from '@material-ui/core';
import { PersonAdd, Shop, Group } from '@material-ui/icons';

interface LoginMessageProps {
  [key: string]: any
}

const LoginMessage = (props: LoginMessageProps) => (
  <div className="mt-4">
    <Typography
      variant="h2"
      children={'Welcome!!!'}
    />
    <div style={{ marginLeft: '.3rem' }}>
      <Typography
        variant="h5"
        children={
          <div>
            <div style={{ display: 'inline-block', marginTop: 20, }}>
              <PersonAdd fontSize="large" style={{ marginRight: 10, marginBottom: -5 }} />
            </div>
            <p style={{ marginBottom: 5, display: 'inline-block' }}>You can join ML Shop as a Merchant</p>
          </div>
        }
      />
      <Typography
        variant="h5"
        children={
          <div>
            <div style={{ display: 'inline-block', marginTop: 10, }}>
              <Shop fontSize="large" style={{ marginRight: 10, marginBottom: -5 }} />
            </div>
            <p style={{ marginBottom: 5, display: 'inline-block' }}>Sell your products from shop</p>
          </div>
        }
      />
      <Typography
        variant="h5"
        children={
          <div>
            <div style={{ display: 'inline-block', marginTop: 10, }}>
              <Group fontSize="large" style={{ marginRight: 10, marginBottom: -5 }} />
            </div>
            <p style={{ display: 'inline-block' }}>Get More Audience</p>
          </div>
        }
      />
      <BtnLink
        label="Join Now"
        to="/mlshopmerchant/registration"
        color="secondary"
        variant="contained"
      />
    </div>
  </div>
);

export default LoginMessage;
