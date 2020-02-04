import React from 'react';
import MDatePicker from '../utils/Pickers';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import { Center } from '../utils/Containers';
import { connect } from 'react-redux';
import { changeDate } from '../../store/actions/dates/dateActions';
import { reqOptions } from '../../helpers';
import { InputFormMoney } from '../utils/Forms';
import { requestDashboardData } from '../../store/actions/dashboard/dashboardActions';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';


class DashboardFooter extends ValidationForm {



  callApiForData = () => {
    const opts = reqOptions('dashboardData', 'get', { shopName: this.props.shopName });
    this.props.requestDashBData(this.request, opts);
  }




  render() {
    const { data, errors, orderEarnings } = this.props;

    return (
      <ErrorBoundary name="Dashboard Footer" request={this.request}>
        <Center classes="mt-3">
          <Grid item xs={6} >
            <Card className="dashboard-footer">
              <CardHeader
                title="Total Sale"
                className="card-title"
              />
              <CardContent className="pt-0">
                <Grid item justify="center" container spacing={32}>
                  <Grid item >
                    <InputFormMoney
                      value={orderEarnings}
                      label="Total Order Earning"
                      isDisabled
                      isAutoFocus
                      withSymbol={false}
                    />
                  </Grid>
                </Grid>
                <Grid item container justify="space-around" spacing={32}>
                  <Grid item xs={5}>
                    <MDatePicker
                      label="From"
                      name="from"
                      handleInputValidate={this.validateInput}
                      handleDateChange={this.props.handleDateChange}
                      state={data}
                      errors={errors}
                      request={this.request}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <MDatePicker
                      label="To"
                      name="to"
                      request={this.request}
                      handleDateChange={this.props.handleDateChange}
                      state={data}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Center>
      </ErrorBoundary>
    )
  }


}


export default connect(({ merchant_details, date, dashB }) => ({
  shopName: merchant_details.merchantData.shop_name,
  data: date.data,
  errors: date.errors,
  totalSale: date.total_sale,
  orderEarnings: dashB.Order_Earnings
}), (dispatch) => ({
  handleDateChange: (dateTime, id, request) => dispatch(changeDate(id, dateTime, request)),
  requestDashBData: (request, opts) => dispatch(requestDashboardData(request, opts))
}))(DashboardFooter);