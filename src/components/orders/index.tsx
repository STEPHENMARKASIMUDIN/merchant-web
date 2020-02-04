import React, { Fragment } from 'react';
import Header from '../utils/Header';
import * as Title from 'react-document-title';
import MerchantTable from '../utils/MerchantTable';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import Pagination from '../utils/Pagination';
import { A, S } from '../../helpers/merchantTypes';
import { connect } from 'react-redux';
import { Container } from '../utils/Containers';
import { setLocation } from '../../helpers';
import { AxiosStatic } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { Tabs, Tab, Paper, Grid } from '@material-ui/core';
import { changePageOrderEarnings, changePageOrders, requestOrders, requestOrderEarnings } from '../../store/actions/orders/orderActions';




class Orders extends ValidationForm {

  state = {
    value: 0,
    ordersData: [],
    ordersEarningsData: []
  }


  handleChange = (event, value: number) => {
    this.setState({
      value
    })
  };


  columnsOrders = [
    'Order No.',
    'Date/Time',
    'Customer Name',
    'Payment Mode',
    'Payment Status',
    'Fulfillment Status',
    'Action'
  ]
  columnsOrderEarnings = [
    'Order No.',
    'Date/Time',
    'Product Earning',
    'Shipping Charge Earning',
    'Tax Charge Earning',
    'Total Order Earning',
  ]



  OrdersTable = () => {
    return (
      <Fragment>
        <MerchantTable
          name="orders"
          data={this.props.orders.paginationData}
          columns={this.columnsOrders}
          title="Orders"
        />
        <Pagination
          request={this.request}
          dataCount={this.props.orders.ordersCount}
          page={this.props.orders.page}
          handleChangePage={this.props.handleChangePageOrders}
          rowsPerPage={this.props.orders.rowsPerPage}
        />
      </Fragment>
    )
  }





  OrderEarningsTable = () => {
    return (
      <Fragment>
        <MerchantTable
          name="order-earnings"
          title="Order Earnings"
          data={this.props.orderEarnings.paginationData}
          columns={this.columnsOrderEarnings} />
        <Pagination
          request={this.request}
          dataCount={this.props.orderEarnings.orderEarningsCount}
          page={this.props.orderEarnings.page}
          handleChangePage={this.props.handleChangePageOrderE}
          rowsPerPage={this.props.orderEarnings.rowsPerPage}
        />
      </Fragment>
    )
  }

  handleSwitchTable = (i: number) => {
    return (
      i === 0 ?
        this.OrdersTable
        : this.OrderEarningsTable
    )
  }



  callApiForData = () => {
    setLocation(this.props);
    this.props.requestOrders(this.request);
    this.props.requestOrderEarnings(this.request);
  }

  render() {
    const { value } = this.state;

    const Table = this.handleSwitchTable(value);
    return (
      <Title title="Orders | Seller • Multivendor MarketPlace">
        <ErrorBoundary name="Orders" request={this.request}>
          <Container>
            <Header label="Orders" />
            <Grid item container xs="auto">
              <Paper square>
                <Tabs
                  id="orders-tab"
                  indicatorColor="secondary"
                  onChange={this.handleChange}
                  value={this.state.value}>
                  <Tab label="Orders"
                  />
                  <Tab label="Order Earnings"
                  />
                </Tabs>
              </Paper>
            </Grid>
            <Table />
          </Container>
        </ErrorBoundary>
      </Title>
    )
  }

};


const mapStateToProps = ({ merchant_details, orders }: MLShopMerchantState) => ({
  shopName: merchant_details.merchantData.shop_name,
  orders: orders.orders,
  orderEarnings: orders.orderEarnings
});


const mapDispatchToProps = (dispatch: ThunkDispatch<MLShopMerchantState, S, A>) => ({
  handleChangePageOrders: (e: any, sp: number, req: AxiosStatic) => dispatch(changePageOrders(sp, req)),
  handleChangePageOrderE: (e: any, sp: number, req: AxiosStatic) => dispatch(changePageOrderEarnings(sp, req)),
  requestOrders: (req: AxiosStatic) => dispatch(requestOrders(req)),
  requestOrderEarnings: (req: AxiosStatic) => dispatch(requestOrderEarnings(req)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
