import React from 'react';
import { Typography } from '@material-ui/core';
import { MyAccountHeader } from '../../utils/Header';
import { connect } from 'react-redux';
import classNames from 'classnames';



const BillingDetails = ({ showDrawer, paymentMode, custName, address, postalCode, city, country, contactNum }) => (
  <div className={classNames({ 'billing-smaller': showDrawer })}>
    <Typography children="Billing Details" variant="h4" />
    <MyAccountHeader
      classes="mt-1"
      paddingTop={4}
      label="Payment Mode"
      item={paymentMode}
      classesItem="psmall"
    />
    <MyAccountHeader
      classes="mt-1"
      paddingTop={4}
      label="Name"
      classesItem="psmall"
      item={custName}
    />
    <MyAccountHeader
      classes="mt-1"
      paddingTop={4}
      classesItem="psmall"
      label="Address"
      item={address}
    />
    <MyAccountHeader
      classes="mt-1"
      classesItem="psmall"
      paddingTop={4}
      label="Postal Code"
      item={postalCode}
    />
    <MyAccountHeader
      classes="mt-1"
      paddingTop={4}
      classesItem="psmall"
      label="City"
      item={city}
    />
    <MyAccountHeader
      classes="mt-1"
      classesItem="psmall"
      paddingTop={4}
      label="Country"
      item={country}
    />
    <MyAccountHeader
      classes="mt-1"
      paddingTop={4}
      classesItem="psmall"
      label="Contact Number"
      item={contactNum}
    />
  </div>
);



const mapStateToProps = ({ toggle, orders: { orderDetails } }) => ({
  showDrawer: toggle.showDrawer,
  contactNum: orderDetails.billing_contact,
  city: orderDetails.billing_city,
  address: orderDetails.billing_address,
  postalCode: orderDetails.billing_postal_code,
  country: orderDetails.billing_country,
  custName: orderDetails.customer_name,
  paymentMode: orderDetails.payment_mode
})

export default connect(mapStateToProps)(BillingDetails);