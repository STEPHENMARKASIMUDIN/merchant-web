import React, { Fragment } from 'react';
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  Paper
} from '@material-ui/core';
import PropTypes from 'prop-types';
import BtnLink from './BtnLink';

import { SmartCollectionsRow, ProductsRow, OrdersRow, OrderDetailsFooterRow, DashboardRow, FeedbackRow, PaymentReceivedRow, OrderEarningsRow, OrderDetailsRow, OrderInvoiceRow, VariantTableRow } from './MerchantTableRows';



const MerchantTable = ({ name, title, classes = "",
  columns, data, isDrawerOpen = false, rowProps = {}, footerProps = {}, isDashboard = false }) => {
  let TableBodyRows = null, Footer = null;


  if (data.length) {
    switch (name) {
      case "smart-collections":
        TableBodyRows = data.map(d => (
          <SmartCollectionsRow key={d.title} d={d} />
        ))
        break;
      case "products":
        TableBodyRows = data.map(d => (
          <ProductsRow key={d.product_number} d={d} {...rowProps} />
        ))
        break;
      case "orders":
        TableBodyRows = data.map(d => (
          <OrdersRow key={d.order_id} d={d} />
        ))
        break;
      case "order-earnings":
        TableBodyRows = data.map(d => (
          <OrderEarningsRow d={d} key={d.order_no} />
        ))
        break;
      case "order-details":
        TableBodyRows = data.map(d => <OrderDetailsRow key={d.id} d={d} />)
        const { totalShipping, totalPrice } = footerProps;
        Footer = <OrderDetailsFooterRow totalShipping={totalShipping} totalPrice={totalPrice}
        />
        break;
      case "dashboard":
        TableBodyRows = data.map(d => (
          <DashboardRow key={d.order_no} d={d} />
        ))
        break;
      case "feedback":
        TableBodyRows = <FeedbackRow />
        break;
      case "payment-received":
        TableBodyRows = <PaymentReceivedRow isPaymentReceived />
        break;
      case "order-invoice":
        TableBodyRows = data.map((d) => (<OrderInvoiceRow
          d={d} key={d.id}
        />));
        break;
      case "variant":
        TableBodyRows = data.map((d) => (<VariantTableRow
          d={d} key={d.variant_id}
        />));
        break;
      default:
        break;
    }
  }


  return (
    <Fragment>
      <Paper className={`p-3 merchant-container ${classes ? classes : `merchant-container`}`}>
        <Typography children={title ? title : null}
          variant="h5" className="d-inline" />
        {
          isDashboard ?
            <BtnLink variant="contained" color="secondary"
              float="right"
              classes="p-1"
              label="View All" to="/orders" /> : null
        }
        <Table id={name ? name : null}
          className={isDrawerOpen ? 'drawer-open' : null}>
          <TableHead>
            <TableRow>
              {columns.map(col => <TableCell
                key={col} children={col}
              />)}
            </TableRow>
          </TableHead>
          <TableBody >
            {TableBodyRows}
            {Footer}
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  )
}









MerchantTable.propTypes = {
  classes: PropTypes.string,
  columns: PropTypes.array,
  title: PropTypes.string,
  data: PropTypes.array,
  name: PropTypes.string.isRequired,
  // isSmartCollections: PropTypes.bool,
  // isProducts: PropTypes.bool,
  // isDashboard: PropTypes.bool,
  // isDrawerOpen: PropTypes.bool
}

export default MerchantTable;