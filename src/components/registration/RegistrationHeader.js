import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';


const RegistrationHeader = props => (
  <Fragment>
    <Typography
      variant="h5"
      children="Create An Account"
      align="center"
    />
    <Typography
      style={{ display: 'inline-block' }}
      variant="subheading"
      children="Already have an account? "
    />
    <NavLink
      to="/mlshopmerchant"
      style={{
        color: '#de4747',
        marginLeft: '.25em'
      }}
      children="  Login  "
    />
    <Typography
      style={{ display: 'inline-block' }}
      variant="subheading"
      children=" here."
    />
  </Fragment>
);

export default RegistrationHeader;