import React from 'react';
import BtnLink from '../utils/BtnLink';
import { Button, Grid } from '@material-ui/core';

const ResetPasswordButtons = ({ validate }) => (
  <Grid item spacing={40}
    container>
    <Grid item>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        children="Submit"
        disabled={validate}
      />
    </Grid>
    <Grid item>
      <BtnLink
        label="Back to Login"
        color="secondary"
        to="/mlshopmerchant"
        variant="contained"
      />
    </Grid>
  </Grid>
);

export default ResetPasswordButtons;



