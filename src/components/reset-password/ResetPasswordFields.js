import React, { Fragment } from 'react';
import { GridContainer } from '../utils/Containers';
import { MerchantFormField } from '../utils/Forms';
import { Email, Phone } from '@material-ui/icons';

const ResetPasswordFields = ({ errors, handleChange, data }) => (
  <Fragment>
    <GridContainer splitByTwos>
      <MerchantFormField
        error={errors}
        isEmail
        name="email"
        handleChange={handleChange}
        value={data.email}
        Icon={Email}
        label="Email"
        isNormal
      />
      <MerchantFormField
        allowDigitsOnly
        error={errors}
        name="contact_number"
        label="Contact Number"
        Icon={Phone}
        InputProps={{
          maxLength: 11
        }}
        handleChange={handleChange}
        isText
        isNormal
        disableCopyPaste
      />
    </GridContainer>
  </Fragment>
);

export default ResetPasswordFields;

