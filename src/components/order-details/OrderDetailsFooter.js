import React, { Fragment } from 'react';
import BillingDetails from './footer-components/BillingDetails';
import ShippingDetails from './footer-components/ShippingDetails';
import CustomerDetails from './footer-components/CustomerDetails';
import BtnLink from '../utils/BtnLink';
import { connect } from 'react-redux';
import { GridContainer, Center } from '../utils/Containers';
import { Typography, Chip } from '@material-ui/core';



const OrderDetailsFooter = ({ fulfillmentStatus, orderNO, orderID }) => (
  <Fragment>
    <Center>
      <Center xs={8} wantPaper classes="mt-1">
        <GridContainer splitByTwos >
          <BillingDetails />
          <ShippingDetails />
        </GridContainer>
      </Center>
    </Center>
    <Center classes="mt-2 mb-2">
      <Center xs={8} wantPaper>
        <GridContainer splitByTwos>
          <CustomerDetails />
          <div>
            <Typography children=""
              className="d-none"
              variant="h4" />
          </div>
        </GridContainer>
      </Center>
    </Center>
    <Center classes="mt-1 mb-2">
      <Center xs={4} wantPaper justify="flex-start">
        <GridContainer changeSize={12}>
          <Typography
            variant="h4"
            align="left"
            children="Fulfillment"
          />
          <Typography
            className="mt-1"
            children={
              <Fragment>
                <span className="font-md">
                  Fulfillment status is
              </span>
                <Chip
                  component="span"
                  className="success font-md ml-1  text-whito"
                  label={fulfillmentStatus}
                />
              </Fragment>
            }
          />
          <BtnLink
            variant="outlined"
            color="secondary"
            classes="mt-1"
            isFullWidth
            label="Generate Invoice"
            to={`/orders/orderDetails/orderInvoice/${orderNO}/${orderID}`}
          />

        </GridContainer>
      </Center>
    </Center>
  </Fragment>
);


const mapStateToProps = ({ orders: { orderDetails } }) => ({
  fulfillmentStatus: orderDetails.fulfillment_status,
  orderID: orderDetails.order_id,
  orderNO: orderDetails.orderno
})


export default connect(mapStateToProps)(OrderDetailsFooter);