import React, { Fragment } from 'react';
import BtnLink from '../utils/BtnLink';
import { connect } from 'react-redux';
import { Grid, Button, Typography } from '@material-ui/core';


interface LoginFooterProps {
  isDisabled: boolean
}

const LoginFooter = ({ isDisabled }: LoginFooterProps) => {

  return (
    <Fragment>
      <Grid item container
        style={{ flexGrow: 1 }}
        className="mt-2">
        <Grid item
          sm={6} children={<BtnLink
            to="/mlshopmerchant/forgotPassword" label="Forgot password?"
            variant="text" color="secondary"
          />} />
        <Grid item
          xs={6}
          children={<Button color="secondary"
            variant="contained" children="Login"
            fullWidth
            disabled={isDisabled}
            type="submit"
          />}
        />
      </Grid>
      <Grid
        className="mt-2"
        item
        container
        justify="center">
        <Typography
          style={{
            paddingTop: 7,
            fontSize: 13
          }}
          children="Not a Seller yet?"
        />
        <BtnLink
          to="/mlshopmerchant/registration"
          label="Join Now"
          variant="text"
          color="secondary"
        />
      </Grid>
    </Fragment>
  )
}


const mapStateToProps = ({ login }) => ({
  isDisabled: login.isDisabled
})






export default connect(mapStateToProps)(LoginFooter);