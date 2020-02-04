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

class Inventory extends Component {
  render() {
    return (
      <T title="Reports | Seller • Multivendor MarketPlace">
        <div className="mt-1">
          <Paper elevation={1} className={this.props.classes.reportTypesRoot}>
            <div ref={el => Inventory.printComponent = el} className="m-30 p-30">
              <table className="table-report">
                <thead>
                  <tr>
                    <td rowSpan="4" className="with-image">
                      <img src={Logo} className="mt-bs-1" alt="" />
                    </td>
                    <td colSpan="9">
                      <label className="mt-bs-2 pr-bs-5 float-right label-15">
                        <strong>PRODUCT INVENTORY REPORTS</strong>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">&nbsp; DATE</td>
                    <td colSpan="6" className="table-date">{getDateAndTime()}</td>
                  </tr>
                  <tr>
                    <td colSpan="3">&nbsp; INVENTORY AS OF</td>
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
                    <th colSpan="1">&nbsp; NO</th>
                    <th colSpan="2">UPLOAD DATE</th>
                    <th colSpan="2">PRODUCT ID</th>
                    <th colSpan="2">QUANTITY</th>
                    <th colSpan="2">BARCODE</th>
                    <th colSpan="2">DESCRIPTION</th>
                    <th colSpan="2">GROSS PRICE</th>
                    <th colSpan="2">NET PRICE</th>
                    <th colSpan="2">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.daily.length ?
                    this.props.daily.map((r, i) => (
                      <tr key={r.product_id}>
                        <td colSpan="1">{i + 1}</td>
                        <td colSpan="2">{r.created_at}</td>
                        <td colSpan="2">{r.product_id}</td>
                        <td colSpan="2">{r.inventory_quantity}</td>
                        <td colSpan="2">{r.barcode}</td>
                        <td colSpan="2">{r.description}</td>
                        <td colSpan="2">{toCurrency(r.gross_price)}</td>
                        <td colSpan="2">{toCurrency(r.net_price)}</td>
                        <td colSpan="2">N/A</td>
                      </tr>
                    )) : null
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
              content={() => Inventory.printComponent}
            />
          </Paper>
        </div>
      </T>
    )
  }
}

const mapStateToProps = ({ reports, merchant_details }) => ({
  daily: reports.daily,
  shopName: merchant_details.merchantData.shop_name
});

Inventory.propTypes = {
  daily: PropTypes.array.isRequired,
  shopName: PropTypes.string.isRequired
}


export default connect(mapStateToProps)(withStyles(styles)(Inventory));

