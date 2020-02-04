import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../merchant-theme/styles';
import ReactToPrint from 'react-to-print';
import Logo from '../../../images/ReviseML.jpg';
import * as T from 'react-document-title';
import { connect } from 'react-redux';
import { PrintOutlined } from '@material-ui/icons';
import { getDateAndTime, toCurrency } from '../../../helpers';
import { Button, Paper, withStyles } from '@material-ui/core';

class DailySales extends Component {
  render() {
    return (
      <T title="Reports | Seller • Multivendor MarketPlace">
        <div className="mt-1">
          <Paper elevation={1} className={this.props.classes.reportTypesRoot}>
            <div ref={el => DailySales.printComponent = el} className="m-30 p-30">

              <table className="table-report">
                <thead>
                  <tr>
                    <td rowSpan="3" className="with-image">
                      <img src={Logo} className="mt-bs-1" alt="" />
                    </td>
                    <td colSpan="9">
                      <label className="mt-bs-2 pr-bs-5 float-right label-15">
                        <strong>DAILY SALES REPORT</strong>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" >&nbsp; DATE</td>
                    <td colSpan="6" className="table-date">{getDateAndTime()}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" >&nbsp; MERCHANT NAME</td>
                    <td colSpan="6" className="table-date">{this.props.shopName}</td>
                  </tr>
                  <tr>
                    <td colSpan="10">&nbsp;</td>
                  </tr>
                </thead>
              </table>
              <table className="table-bs table-sm mb-bs-4 table-report">
                <thead>
                  <tr>
                    <th colSpan="1">No</th>
                    <th colSpan="2">ORDER DATE</th>
                    <th colSpan="2">ORDER NO</th>
                    <th colSpan="2">QUANTITY</th>
                    <th colSpan="2">BARCODE</th>
                    <th colSpan="2">DESCRIPTION</th>
                    <th colSpan="2">GROSS PRICE</th>
                    <th colSpan="2">NET PRICE</th>
                    <th colSpan="2">SHIPPING FEE</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    this.props.dailySales.length ?
                      this.props.dailySales.map((r, i) => (
                        <tr key={`${r.order_date}${i}`}>
                          <td colSpan="1">{i + 1}</td>
                          <td colSpan="2">{r.order_date}</td>
                          <td colSpan="2">{r.order_no}</td>
                          <td colSpan="2">{r.quantity}</td>
                          <td colSpan="2">{r.barcode}</td>
                          <td colSpan="2">{r.description}</td>
                          <td colSpan="2">{toCurrency(r.gross_price)}</td>
                          <td colSpan="2">{toCurrency(r.net_price)}</td>
                          <td colSpan="2">{toCurrency(r.shipping_fee)}</td>
                        </tr>
                      ))

                      : null
                  }
                </tbody>
              </table>
            </div>

            <ReactToPrint
              trigger={() =>
                <Button color="secondary"
                  variant="contained">
                  <PrintOutlined
                    className="size-icon-report">
                    &nbsp; Print</PrintOutlined>
                </Button>
              }
              content={() => DailySales.printComponent}
            />
          </Paper>
        </div>
      </T>
    )
  }
}

const mapStateToProps = ({ reports, merchant_details }) => ({
  dailySales: reports.dailySales,
  shopName: merchant_details.merchantData.shop_name
})



DailySales.propTypes = {
  dailySales: PropTypes.array.isRequired,
  shopName: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(DailySales));

