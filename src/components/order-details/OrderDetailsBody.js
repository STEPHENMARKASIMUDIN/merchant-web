import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Center } from '../utils/Containers';
import { SnackBIcon } from '../../merchant-theme/styles';
import { Typography, Grid, Icon } from '@material-ui/core';
import classNames from 'classnames';

const OrderDetailsBody = ({ showDrawer, deliveryMethod, status }) => (
  <Fragment>
    <Center >
      <Center xs={6} wantPaper classes="mt-2 mb-1"
        style={{ backgroundColor: '#eeeeee' }}>
        <Typography
          color="secondary"
          variant="h6"
          children="Note:" />
        <Typography
          className="mt-1 text-black"
          children={
            <span className="d-inline font-md" style={{
              textAlign: 'justify',
            }}>
              Amount of <b>Order Total</b> does not include Shipping Charges and Taxes applied
        on the order. <b>Seller Shipping</b>  is the seller's earning from order shipping. If order status is <b>partially fulfilled</b>, then it means there are some products in                                                                                                                                                                                                  that order which are still unfulfilled.
        </span>
          }
        />
      </Center>
    </Center>
    <Center>
      <Center xs={6} wantPaper classes="mb-2">
        <Grid item xs={6}>
          <p className={classNames("d-inline bold font-md mt-0", {
            'font-smaller': showDrawer
          })}>Delivery Method:</p>
          <p className={classNames('mt-0 d-inline', {
            'font-smaller': showDrawer
          })} style={{ marginLeft: 8 }}> {deliveryMethod}</p>
        </Grid>
        <Grid item xs={6}>
          <p className={classNames("d-inline bold font-md mt-0", {
            'font-smaller': showDrawer
          })}>Payment Status:</p>
          <p className={classNames('mt-0 d-inline', {
            'font-smaller': showDrawer
          })} style={{ marginLeft: 8, color: '#4caf50' }}>{status}</p>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Icon style={{
              position: 'absolute',
              bottom: -6, left: 4, color: '#4caf50'
            }}> <SnackBIcon.success /> </Icon>
          </div>
        </Grid>
      </Center>
    </Center>
  </Fragment>
);


const mapStateToProps = ({ toggle, orders: { orderDetails } }) => ({
  showDrawer: toggle.showDrawer,
  deliveryMethod: orderDetails.delivery_method,
  status: orderDetails.payment_status
})

export default connect(mapStateToProps)(OrderDetailsBody);