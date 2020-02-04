import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { MyAccountHeader } from '../../utils/Header';
import classNames from 'classnames';

const CustomerDetails = ({ custName, email, custNum, company, showDrawer }) => (
  <Fragment>
    <div className={classNames({ 'billing-smaller': showDrawer })}>
      <Typography children="Customer Details" variant="h4" />
      <MyAccountHeader
        classes="mt-1"
        paddingTop={4}
        label="Name"
        classesItem="psmall"
        item={custName}
      />
      <MyAccountHeader
        classes="mt-1"
        classesItem="psmall"
        paddingTop={4}
        label="Email"
        item={email}
      />
      <MyAccountHeader
        classes="mt-1"
        classesItem="psmall"
        paddingTop={4}
        label="Phone"
        item={custNum}
      />
      <MyAccountHeader
        classes="mt-1"
        classesItem="psmall"
        paddingTop={4}
        label="Company"
        item={company}
      />
    </div>

  </Fragment>
);

const mapStateToProps = ({ orders: { orderDetails }, toggle }) => ({
  custName: orderDetails.customer_name,
  email: orderDetails.email,
  custNum: orderDetails.customer_phone,
  company: orderDetails.billing_company,
  showDrawer: toggle.showDrawer
})

export default connect(mapStateToProps)(CustomerDetails);