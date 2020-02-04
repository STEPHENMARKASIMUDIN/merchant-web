import React, { Fragment } from 'react';
import ReactToPrint from 'react-to-print';
import * as T from 'react-document-title';
import Logo from '../../images/ReviseML.jpg';
import styles from '../../merchant-theme/styles';
import ValidationForm from '../utils/ValidationForm';
import MerchantTable from '../utils/MerchantTable';
import { connect } from 'react-redux';
import { PrintOutlined } from '@material-ui/icons';
import { MyAccountHeader } from '../utils/Header';
import { GridContainer, Center } from '../utils/Containers';
import { requestOrderInvoiceData } from '../../store/actions/orders/orderActions';
import { formatAndConvertToDate, toCurrency } from '../../helpers';
import { Paper, withStyles, Typography, Button, Grid } from '@material-ui/core';


const mapStateToProps = ({ merchant_details: { merchantData }, orders: { orderInvoiceData } }) => ({
  shopName: merchantData.shop_name,
  sellerAddress: orderInvoiceData.seller_address,
  sellerContactNum: orderInvoiceData.seller_contact,
  sellerEmail: orderInvoiceData.seller_email,
  email: orderInvoiceData.email,
  shippingAddress: orderInvoiceData.shipping_address,
  shippingCity: orderInvoiceData.shipping_city,
  shippingCountry: orderInvoiceData.shipping_country,
  shippingProvince: orderInvoiceData.shipping_province,
  orderDate: formatAndConvertToDate(orderInvoiceData.created_at),
  orderNO: orderInvoiceData.orderno,
  invoiceDate: formatAndConvertToDate(orderInvoiceData.invoice_date),
  invoiceNum: orderInvoiceData.invoice_number,
  postalCode: orderInvoiceData.shipping_postal_code,
  data: orderInvoiceData.line_items,
  subTotal: toCurrency(orderInvoiceData.subtotal_price),
  totalShipping: toCurrency(orderInvoiceData.total_shipping),
  totalPrice: toCurrency(orderInvoiceData.total_price),
  totalTax: toCurrency(orderInvoiceData.total_tax)
});
class OrderInvoice extends ValidationForm {


  callApiForData = () => {
    const { order_id, order_no } = this.props.match.params;
    const shopName = this.props.shopName;

    this.props.requestOrderInvoice(this.request, { orderNO: order_no, shopName, orderID: order_id });
  }
  render() {
    const { classes, shopName, data, invoiceNum, orderNO, shippingAddress, shippingCity,
      subTotal, totalShipping, totalPrice, totalTax,
      orderDate, shippingProvince, shippingCountry,
      sellerEmail, invoiceDate, postalCode, sellerContactNum } = this.props;
    return (
      <T title="Orders | Seller • Multivendor MarketPlace">
        <Fragment>
          <Paper elevation={1}
            className={classes.reportTypesRoot}>
            <div className="m-20 p-20"
              style={{ border: '1px solid black' }}
              ref={el => (this.componentRef = el)}>
              <img src={Logo} />
              <div className="m-10 p-10" >
                <Center wantPaper={false}>
                  <GridContainer splitByTwos>
                    <div>
                      <Typography
                        variant="h4"
                        children="Seller Details"
                      />
                      <MyAccountHeader
                        item={shopName}
                        label="Shopname"
                        classes="mt-1"
                        widthItem="70%"
                        widthLabel="26%"
                        separator=":"
                        variantLabel="subtitle1"
                        classesItem="mt-5px"
                      />
                      <MyAccountHeader
                        item={sellerEmail}
                        label="Email"
                        classes="mt-1"
                        widthItem="80%"
                        widthLabel="18%"
                        separator=":"
                        variantLabel="subtitle1"
                        classesItem="mt-5px"
                      />
                      <MyAccountHeader
                        item={sellerContactNum}
                        label="Contact Number"
                        classes="mt-1"
                        widthItem="55%"
                        widthLabel="40%"
                        separator=":"
                        variantLabel="subtitle1"
                        classesItem="mt-5px"
                      />
                    </div>
                    <div>
                      <Typography
                        variant="h4"
                        children="Shipping Address"
                      />
                      <MyAccountHeader
                        item={orderNO}
                        label="Order No"
                        classes="mt-1"
                        widthItem="70%"
                        widthLabel="26%"
                        separator=":"
                      />
                      <MyAccountHeader
                        item={sellerEmail}
                        label="Email"
                        classes="mt-1"
                        widthItem="80%"
                        widthLabel="18%"
                        separator=":"
                      />
                      <MyAccountHeader
                        item={shippingAddress}
                        label="Address"
                        classes="mt-1"
                        widthItem="70%"
                        widthLabel="26%"
                        separator=":"
                      />
                      <MyAccountHeader
                        item={shippingCity}
                        label="City"
                        classes="mt-1"
                        widthItem="70%"
                        widthLabel="26%"
                        separator=":"
                      />
                      <MyAccountHeader
                        item={shippingProvince}
                        label="Province"
                        classes="mt-1"
                        widthItem="70%"
                        widthLabel="26%"
                        separator=":"
                      />
                      <MyAccountHeader
                        item={postalCode}
                        label="Postal Code"
                        classes="mt-1"
                        widthItem="68%"
                        widthLabel="30%"
                        separator=":"
                      />
                      <MyAccountHeader
                        item={shippingCountry}
                        label="Country"
                        classes="mt-1"
                        widthItem="70%"
                        widthLabel="25%"
                        separator=":"
                      />
                    </div>
                  </GridContainer>

                  <Center classes="mt-2 mb-2" children={
                    <p className="d-none"></p>
                  } />
                  <GridContainer splitByFours>
                    <div>
                      <Typography variant="h6"
                        children="Invoice Date"
                      />
                      <Typography
                        children={invoiceDate}
                      />
                    </div>
                    <div>
                      <Typography variant="h6"
                        children="Order Date"
                      />
                      <Typography
                        children={orderDate}
                      />
                    </div>
                    <div>
                      <Typography variant="h6"
                        children="Order Number"
                      />
                      <Typography
                        children={orderNO}
                      />

                    </div>
                    <div>
                      <Typography variant="h6"
                        children="Invoice Number"
                      />
                      <Typography
                        children={invoiceNum}
                      />

                    </div>
                  </GridContainer>

                </Center>
              </div>
              <MerchantTable
                classes="mt-3"
                IsOrderInvoice
                data={data}
                name="order-invoice"
                columns={["Product Name", "Price", "SKU", "Qty.", "Total"]}
              />
              <div className="m-10 p-10">
                <Center justify="flex-end">
                  <Grid item container xs={4}>

                    <GridContainer splitByTwos>
                      <Typography
                        children="Subtotal:"
                        variant="subtitle1"
                      />

                      <Typography
                        className="float-right bold"
                        children={subTotal}
                        variant="subtitle1"
                      />
                    </GridContainer>

                  </Grid>
                </Center>
                <Center justify="flex-end">
                  <Grid item container xs={4}>
                    <GridContainer splitByTwos>
                      <Typography
                        children="Tax:"
                        variant="subtitle1"
                      />
                      <Typography
                        className="float-right bold"
                        children={totalTax}
                        variant="subtitle1"
                      />
                    </GridContainer>
                  </Grid>
                </Center>
                <Center justify="flex-end">
                  <Grid item container xs={4}>
                    <GridContainer splitByTwos>
                      <Typography
                        children="Shipping:"
                        variant="subtitle1"
                      />
                      <Typography
                        className="float-right bold"
                        children={totalShipping}
                        variant="subtitle1"
                      />
                    </GridContainer>
                  </Grid>
                </Center>
                <Center justify="flex-end">
                  <Grid item container xs={4}>
                    <GridContainer splitByTwos>
                      <Typography
                        children="Total:"
                        variant="subtitle1"
                      />
                      <Typography
                        className="float-right bold"
                        children={totalPrice}
                        variant="subtitle1"
                      />
                    </GridContainer>
                  </Grid>
                </Center>
                <Center justify="flex-start" classes="mt-5">
                  <Grid item container className="mt-3">
                    <Grid item xs={6}>
                      <Typography
                        children="Received by:"
                        variant="subtitle1"
                      />
                      <Typography
                        children="Date:"
                        variant="subtitle1"
                      />
                    </Grid>
                  </Grid>
                </Center>
              </div>
            </div>
            <ReactToPrint
              bodyClass="amawawa"
              trigger={() =>
                <Button
                  className="mt-2"
                  color="secondary"
                  variant="contained">
                  <PrintOutlined
                    className="size-icon-report">
                    &nbsp; Print</PrintOutlined>
                </Button>
              }
              content={() => this.componentRef}
            />
          </Paper>

        </Fragment>
      </T>
    )
  }
};


const mapDispatchToProps = (dispatch) => ({
  requestOrderInvoice: (req, params) => dispatch(requestOrderInvoiceData(req, params))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(OrderInvoice));

