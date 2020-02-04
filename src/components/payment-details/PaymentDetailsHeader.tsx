import React, { Fragment } from 'react'
import Header from '../utils/Header';
import CustomSelect from '../utils/CustomSelect';
import { Grid } from '@material-ui/core';
import { AddOptionsData } from '../../helpers/merchantTypes';


interface PaymentDetailsHeaderProps {
  self: any
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void
  labelWidth: number
  value: string
  options: AddOptionsData[]
}

const PaymentDetailsHeader = ({ self, handleChange, labelWidth, options, value }: PaymentDetailsHeaderProps) => {
  return (
    <Fragment >
      <Header
        label="Payment Details"
      />
      <Grid
        className="mt-3" item xs={8}
        sm={6} md={4} lg={4} xl={2}>
        <CustomSelect
          name="payment_method"
          handleChange={handleChange}
          context={self}
          labelWidth={labelWidth}
          selectLabel={"Payment Method"}
          options={options}
          value={value}
        />
      </Grid>
    </Fragment>
  )
}



export default PaymentDetailsHeader;
