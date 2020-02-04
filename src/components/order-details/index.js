import React from 'react';
import * as Title from 'react-document-title';
import { Container } from '../utils/Containers';
import Header from '../utils/Header';
import MerchantTable from '../utils/MerchantTable';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm'
import OrderDetailsBody from './OrderDetailsBody';
import OrderDetailsFooter from './OrderDetailsFooter';
import { connect } from 'react-redux';
import { requestOrderDetails } from '../../store/actions/orders/orderActions';

class OrderDetails extends ValidationForm {




  callApiForData = () => {
    const { match: { params }, shopName } = this.props;
    this.props.requestOrderDetails(this.request, params.order_no, shopName);
  }

  render() {
    const { order_no } = this.props.match.params
    const { lineItems, totalShipping, totalPrice } = this.props;
    return (
      <Title title="Orders | Seller • Multivendor MarketPlace">
        <ErrorBoundary name="Orders" request={this.request}>
          <Container>
            <Header
              label={order_no}
            />
            <MerchantTable
              name="order-details"
              title="Product Details"
              classes="mt-1"
              IsOrdersDetails
              data={lineItems}
              footerProps={{
                totalShipping, totalPrice

              }}
              columns={["Product ID", "Product Name", "SKU", "Quantity", "Price"]}
            />
            <OrderDetailsBody />
            <OrderDetailsFooter />
          </Container>
        </ErrorBoundary>
      </Title>
    )
  }

}


const mapStateToProps = ({ merchant_details, orders }) => ({
  shopName: merchant_details.merchantData.shop_name,
  lineItems: orders.orderDetails.line_items,
  totalShipping: orders.orderDetails.total_shipping,
  totalPrice: orders.orderDetails.total_price,
});


const mapDispatchToProps = (dispatch) => ({
  requestOrderDetails: (req, orderno, shopName) => dispatch(requestOrderDetails(req, orderno, shopName))
})



export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);