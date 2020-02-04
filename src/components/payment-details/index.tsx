import React from 'react';
import theme from '../../merchant-theme/theme';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import PaymentDetailsBody from './PaymentDetailsBody';
import PaymentDetailsHeader from './PaymentDetailsHeader';
import PaymentDetailsFooter from './PaymentDetailsFooter';
import * as Title from 'react-document-title';
import { S, A } from '../../helpers/merchantTypes';
import { connect } from 'react-redux';
import { Container } from '../utils/Containers';
import { findDOMNode } from 'react-dom';
import { setLocation } from '../../helpers';
import { clearErrors } from '../../store/actions/actionHelpers';
import {
  MuiThemeProvider as MuiProvider
} from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { CLEAR_ERRORS_PAYMENT_DETAILS } from '../../store/actionTypes';
import { AxiosRequestConfig, AxiosStatic } from 'axios';
import { paymentDetailsSubmit, togglePaymentDetailsForm, changePaymentDLabelWidth } from '../../store/actions/paymentDetails/paymentDetailsAction';


class PaymentDetails extends ValidationForm {


  labelRef: Element
  options = [{
    label: 'Internet Banking',
    value: 'Internet Banking',
  }]



  unMountFunc = () => {
    this.props.clearErrorsPaymentDetails();
  }


  executeSomeFunc = () => {
    setLocation(this.props);
    this.props.changeSelectLabelWidth((findDOMNode(this.labelRef) as HTMLElement).offsetWidth)
  }

  render() {
    //const { labelWidth } = this.state;
    const { value, togglePMForm, showPMForm, labelWidth } = this.props;
    const showFields = showPMForm ? '' : 'd-none';
    return (
      <MuiProvider theme={theme}>
        <Title title="Payment Details | Seller • Multivendor MarketPlace">
          <ErrorBoundary name="Payment Details" request={this.request}>
            <Container classes="paper-height">
              <form onSubmit={(e) => {
                e.preventDefault();
                this.props.paymentDSubmit(this.request, { method: 'post', url: 'paymentDetails' })
              }}>
                <PaymentDetailsHeader
                  value={value as string}
                  labelWidth={labelWidth}
                  options={this.options}
                  self={this}
                  handleChange={togglePMForm}
                />
                <div className={showFields}>
                  <PaymentDetailsBody />
                  <PaymentDetailsFooter />
                </div>
              </form>
            </Container>
          </ErrorBoundary>
        </Title>
      </MuiProvider >
    )
  }
};


const mapStateToProps = ({ paymentD }: MLShopMerchantState) => ({
  value: paymentD.data.payment_method,
  showPMForm: paymentD.showPaymentDetailsForm,
  labelWidth: paymentD.labelWidth
});


const mapDispatchToProps = (dispatch: ThunkDispatch<MLShopMerchantState, S, A>) => ({
  paymentDSubmit: (request: AxiosStatic, opts: AxiosRequestConfig) => dispatch(paymentDetailsSubmit(request, opts)),
  togglePMForm: ({ target: { name, value } }) => {
    dispatch(togglePaymentDetailsForm(name, value))
  },
  changeSelectLabelWidth: (width: number) => dispatch(changePaymentDLabelWidth(width)),
  clearErrorsPaymentDetails: () => dispatch(clearErrors(CLEAR_ERRORS_PAYMENT_DETAILS))
})


export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);