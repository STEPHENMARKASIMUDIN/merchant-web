import React,{Fragment} from 'react';
import Header from '../utils/Header';
import {connect} from 'react-redux';
import { Typography } from '@material-ui/core';

const DashboardHeader = props => (
    <Fragment>
       <Header
        label="My Dashboard"
      />
      <Typography
        variant="subtitle1"
        className="mt-1 d-inline margin-small"
        children="Hello "
      />
      <Typography
        variant="title"
        className="mt-2 d-inline"
        children={` ${props.seller_name}`}
      />

      <Typography
        variant="subtitle1"
        className="mt-1"
        children="From your My Account Dashboard you have
         the ability to view a snapshot of
          your recent account activity and update your account information.
           Select a link below to view or edit information."
       />
    </Fragment>
);


export default connect(state => ({
  seller_name : state.merchant_details.merchantData.seller_name
}))(DashboardHeader);