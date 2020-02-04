import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { MyAccountHeader } from '../../utils/Header';
import classNames from 'classnames';



const ShippingDetails = ({ showDrawer, status, custName,
  address, postalCode, city, country, contactNum }) => (
    <div className={classNames({ 'billing-smaller': showDrawer })}>
      <Typography children="Shipping Details" variant="h4" />
      <MyAccountHeader
        paddingTop={4}
        classes="mt-1"
        label="Order Status"
        item={status}
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
        width={60}
        classesItem="psmall"
        label="Shipping Address"
        item={address}
      />
      <MyAccountHeader
        classes="mt-1"
        paddingTop={4}
        classesItem="psmall"
        label="Postal Code"
        item={postalCode}
      />
      <MyAccountHeader
        classes="mt-1"
        paddingTop={4}
        label="City"
        classesItem="psmall"
        item={city}
      />
      <MyAccountHeader
        classes="mt-1"
        paddingTop={4}
        label="Country"
        classesItem="psmall"
        item={country}
      />
      <MyAccountHeader
        classes="mt-1"
        classesItem="psmall"
        paddingTop={4}
        label="Contact Number"
        item={contactNum}
      />
    </div>
  );



const mapStateToProps = ({ toggle, orders: { orderDetails } }) => ({
  showDrawer: toggle.showDrawer,
  postalCode: orderDetails.shipping_postal_code,
  city: orderDetails.shipping_city,
  address: orderDetails.shipping_address,
  contactNum: orderDetails.shipping_contact,
  country: orderDetails.shipping_country,
  status: orderDetails.payment_status,
  custName: orderDetails.customer_name
})


export default connect(mapStateToProps)(ShippingDetails);