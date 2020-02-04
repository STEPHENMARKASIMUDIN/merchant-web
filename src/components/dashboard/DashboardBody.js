import React, { Component } from 'react';
import MerchantTable from '../utils/MerchantTable';
import { connect } from 'react-redux';


class DashboardBody extends Component {


  columns = [
    'Order No.',
    'Date/Time',
    'Customer Name',
    'Order Total',
    'Status'
  ]

  render() {

    return (<MerchantTable
      classes="mt-2"
      title="Recent Orders"
      name="dashboard"
      columns={this.columns}
      data={this.props.Recent_Orders}
      isDashboard
    />)
  }
}


export default connect(({ dashB: { Recent_Orders } }) => ({
  Recent_Orders
}))(DashboardBody);