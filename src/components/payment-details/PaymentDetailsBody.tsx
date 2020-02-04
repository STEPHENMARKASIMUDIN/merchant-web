import React, { Fragment } from 'react'
import { S, A } from '../../helpers/merchantTypes';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { changePaymentDetailsData } from '../../store/actions/paymentDetails/paymentDetailsAction';
import { MerchantTextArea, MerchantFormField } from '../utils/Forms';
import { MLShopMerchantState, PaymentDetailsData } from '../../helpers/reducersState';

interface PaymentDetailsBodyProps {
  handleChange: Function
  errors: {}
  data: PaymentDetailsData
}

const PaymentDetailsBody = ({ handleChange, errors, data }: PaymentDetailsBodyProps) => {
  return (
    <Fragment>
      <Grid xs={12} item container className="mt-3">
        <Grid item xs={4}>
          <MerchantFormField
            handleChange={handleChange}
            label="Bank Company Name"
            name="bank_name"
            error={errors}
            value={data.bank_name}
            isText
            isNormal
          />
          <MerchantFormField
            handleChange={handleChange}
            label="Account Number"
            name="account_number"
            value={data.account_number}
            error={errors}
            isText
            isNormal
            classes="mt-3"
          />
          <MerchantTextArea
            handleChange={handleChange}
            labelName="Other Informations"
            name="other_info"
            value={data.other_info}
            classes="mt-3"
            error={errors}
            isNormal
          />
        </Grid>
        <Grid item xs={4} className="ml-3">
          <MerchantFormField
            name="cardholder_name"
            value={data.cardholder_name}
            label="Cardholder Name"
            isText
            error={errors}
            isNormal
            handleChange={handleChange}
          />
          <MerchantFormField
            classes="mt-3"
            value={data.sort_code}
            name="sort_code"
            label="Sort Code/IFSC Code"
            isText
            isNormal
            error={errors}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
    </Fragment>
  )
}

const mapStateToProps = ({ paymentD }: MLShopMerchantState) => ({
  errors: paymentD.errors,
  data: paymentD.data,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<MLShopMerchantState, S, A>) => ({
  handleChange: ({ target: { id, value } }) => dispatch(changePaymentDetailsData(id, value)),
})


export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsBody);
