import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { MLShopMerchantState } from '../../helpers/reducersState';


interface PaymentDetailsFooterProps {
  isDisabled: boolean
}

const PaymentDetailsFooter = ({ isDisabled }: PaymentDetailsFooterProps) => (
  <Grid item container xs={1}>
    <Button
      fullWidth
      type="submit"
      color="secondary"
      children="Save"
      className="mt-2"
      variant="contained"
      disabled={isDisabled}
    />
  </Grid>
);

const mapStateToProps = ({ paymentD }: MLShopMerchantState) => ({
  isDisabled: paymentD.isDisabled
})


const EnhancedPaymentDetailsFooter = connect(mapStateToProps)(PaymentDetailsFooter);

export default EnhancedPaymentDetailsFooter;