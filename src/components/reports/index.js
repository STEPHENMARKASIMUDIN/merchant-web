import React from 'react';
import * as T from 'react-document-title';
import Header from '../utils/Header';
import styles from '../../merchant-theme/styles';
import Inventory from '../../images/inventory.png';
import Monthly from '../../images/monthly-report.jpg';
import MonthlySales from '../../images/monthly-sales-report.png';
import DailySales from '../../images/reporting.png';
import ReportCard from '../utils/ReportCard';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import DatePicker from '../utils/Pickers';
import { connect } from 'react-redux';
import { setLocation } from '../../helpers';
import { withStyles, Grow, Grid } from '@material-ui/core';
import { Container, GridContainer, Center } from '../utils/Containers';
import { getReportsData, changeDateReport } from '../../store/actions/reports/reportsAction';
import {
  GET_DAILY_SALES_REPORT_DATA,
  GET_MONTHLY_REPORT_DATA,
  GET_MONTHLY_SALES_REPORT_DATA,
  GET_PRODUCT_INVENTORY_REPORT_DATA
} from '../../store/actionTypes';



class Reports extends ValidationForm {



  executeSomeFunc = () => {
    setLocation(this.props);
  }

  render() {
    const { classes, match, data, handleDateChange } = this.props;
    const props = this.props
    return (
      <T title="Reports | Seller • Multivendor MarketPlace">
        <ErrorBoundary name="Reports" request={this.request}>
          <Center wantPaper={false}>
            <Container parentSize={10} parentJustify="center">
              <Header label="Reports" />
              <Center wantPaper={false} spacing={16}>
                <Grid item container>
                  <GridContainer splitByTwos>
                    <Center wantPaper={false} >
                      <DatePicker
                        label="Monthly Product"
                        errors={{}}
                        name="monthly"
                        classNames="mt-5"
                        state={data}
                        isFormatMonth
                        handleDChange={handleDateChange}
                      />
                    </Center>
                    <Center wantPaper={false}>
                      <DatePicker
                        label="Daily Product"
                        classNames="mt-5"
                        errors={{}}
                        name="daily"
                        handleDChange={handleDateChange}
                        state={data}
                      />
                    </Center>
                  </GridContainer>
                </Grid>
                <Grid item container>
                  <GridContainer splitByTwos>
                    <Center wantPaper={false}>
                      <Grow
                        children={<ReportCard imgSrc={Monthly}
                          btnLabel="Generate Monthly Product Report" classes={classes} handleClick={() => {
                            this.props.handleClick(GET_MONTHLY_REPORT_DATA, this.request, `${match.url}/monthly`, props, data["monthly"])
                          }} />}
                      />
                    </Center>
                    <Center wantPaper={false}>
                      <Grow >
                        <ReportCard imgSrc={Inventory} btnLabel="Generate Product Inventory Report"
                          classes={classes} handleClick={() => {
                            this.props.handleClick(GET_PRODUCT_INVENTORY_REPORT_DATA, this.request, `${match.url}/inventory`, props, data["daily"])
                          }} />
                      </Grow>
                    </Center>
                  </GridContainer>
                </Grid>
                <Grid item container>
                  <GridContainer splitByTwos>
                    <Center wantPaper={false}>
                      <DatePicker
                        label="Monthly Sales"
                        classNames="mt-5"
                        errors={{}}
                        isFormatMonth
                        handleDChange={handleDateChange}
                        name="monthlysalesdate"
                        state={data} /></Center>
                    <Center wantPaper={false}>
                      <DatePicker
                        label="Daily Sales"
                        classNames="mt-5"
                        errors={{}}
                        handleDChange={handleDateChange}
                        name="dailysalesdate"
                        state={data} />

                    </Center>
                  </GridContainer>
                </Grid>
                <Grid item container>
                  <GridContainer splitByTwos>
                    <Center wantPaper={false}>
                      <Grow>
                        <ReportCard imgSrc={MonthlySales} btnLabel="Generate Monthly Sales Report"
                          classes={classes} handleClick={() => {
                            this.props.handleClick(GET_MONTHLY_SALES_REPORT_DATA, this.request, `${match.url}/monthlySales`, props, data["monthlysalesdate"])
                          }} />
                      </Grow></Center>
                    <Center wantPaper={false}>
                      <Grow >
                        <ReportCard imgSrc={DailySales} btnLabel="Generate Daily Sales Report"
                          classes={classes} handleClick={() => {
                            this.props.handleClick(GET_DAILY_SALES_REPORT_DATA,
                              this.request, `${match.url}/daily`,
                              props, data["dailysalesdate"])
                          }} />
                      </Grow>
                    </Center>
                  </GridContainer>
                </Grid>
              </Center>
            </Container>
          </Center>
        </ErrorBoundary>
      </T>
    )
  }
};


const mapStateToProps = ({ auth, reports }) => ({
  isAuth: auth.isAuth,
  data: reports.data
})


const mapDispatchToProps = (dispatch) => ({
  handleClick: (type, request, path, props, date) => dispatch(getReportsData(type, request, path, props, date)),
  handleDateChange: (date, id) => dispatch(changeDateReport(date, id))
})


const EnhancedReports = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Reports));

export default EnhancedReports;

