import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { GridContainer } from '../utils/Containers';
import { MerchantFormField, MerchantForm } from '../utils/Forms';
import { changeSignUpData, toggleSignupShowPassword } from '../../store/actions/registration/registrationActions';
import {
  AccountCircle, ShoppingBasket,
  Email, Store,
  AddLocation,
  Phone,
  Description,
  LocationCity
} from '@material-ui/icons';


const RegistrationBody = ({ errors, data, handleShowPassword, showPassword, handleChange }) => (
  <Fragment>
    <GridContainer splitByTwos>
      <MerchantFormField
        name="seller_name"
        label="Seller's Name"
        error={errors}
        Icon={AccountCircle}
        value={data.seller_name}
        handleChange={handleChange}
        isSmall
        isText
      />
      <MerchantFormField
        name="shop_name"
        label="Merchant's Shop Name"
        value={data.shop_name}
        error={errors}
        handleChange={handleChange}
        isShrink
        Icon={ShoppingBasket}
        isSmall
        isText
      />
    </GridContainer>
    <GridContainer splitByTwos>
      <MerchantFormField
        name="email"
        value={data.email}
        handleChange={handleChange}
        label="Email Address"
        error={errors}
        Icon={Email}
        isSmall
        isEmail
      />
      <MerchantFormField
        value={data.password}
        handleChange={handleChange}
        IsPassword
        passwordProps={{
          showPassword,
          handleShowPassword,
        }}
        label="Password"
        name="password"
        error={errors}
        InputProps={{
          inputPropsStyle: { padding: 0 }
        }}
        isSmall
      />
    </GridContainer>
    <Grid item xs={12}>
      <MerchantFormField
        handleChange={handleChange}
        value={data.store_address}
        name="store_address"
        label="Store Address"
        error={errors}
        Icon={Store}
        isSmall
        isText
      />
    </Grid>
    <GridContainer splitByThrees>
      <MerchantFormField
        handleChange={handleChange}
        value={data.city}
        name="city"
        label="City"
        error={errors}
        Icon={LocationCity}
        isSmall
        isText
      />
      <MerchantFormField
        handleChange={handleChange}
        value={data.zipcode}
        name="zipcode"
        label="Zipcode"
        error={errors}
        Icon={AddLocation}
        InputProps={{
          maxLength: 5,
          minLength: 4
        }}
        isSmall
        isText
        allowDigitsOnly
        disableCopyPaste
      />
      <MerchantForm
        name="country"
        onChange={handleChange}
        value={data.country}
        label="Country"
        error={errors}
        isSmall
        isOutlined
        isRequired
      />
    </GridContainer>
    <GridContainer splitByTwos>
      <MerchantFormField
        handleChange={handleChange}
        value={data.contact_number}
        name="contact_number"
        label="Contact Number"
        error={errors}
        Icon={Phone}
        InputProps={{
          maxLength: 11,
          minLength: 11
        }}
        isSmall
        isText
        allowDigitsOnly
        disableCopyPaste
      />
      <MerchantFormField
        handleChange={handleChange}
        value={data.store_description}
        name="store_description"
        label="Short Store Description"
        error={errors}
        Icon={Description}
        isSmall
        isText
      />
    </GridContainer>
  </Fragment>
);


const mapStateToProps = ({ signup }) => ({
  data: signup.data,
  errors: signup.errors,
  showPassword: signup.showPassword,
  isDisabled: signup.isDisabled
})

const mapDispatchToProps = (dispatch) => ({
  handleChange: ({ target: { value, name } }) => dispatch(changeSignUpData(name, value)),
  handleShowPassword: () => dispatch(toggleSignupShowPassword())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationBody);


