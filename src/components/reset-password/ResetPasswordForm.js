import React from 'react';
import ResetPasswordButtons from './ResetPasswordButtons';
import ResetPasswordFields from './ResetPasswordFields';
import { connect } from 'react-redux';
import { reqOptions } from '../../helpers';
import { RESET_PASSWORD } from '../../store/actionTypes';
import { Grid ,Typography} from '@material-ui/core';
import { changePassData, resetPassword } from '../../store/actions/reset-password';


const ResetPasswordForm = ({handleSubmit,handleChange,isDisabled,errors,data,request}) => {

  return (
     <form onSubmit={(e)=>{
      handleSubmit(e,data,request)
     }}>
     <div className="paper mt-1">
            <Grid item container xs={12} spacing={24}>
              <Grid item>
                <Typography
                  variant="subtitle1"
                  children="Enter your email address below and contact number so
                   we can send you an email with your new password."
                />
              </Grid>
              <ResetPasswordFields 
              errors={errors}
              handleChange={handleChange}
              data={data}
              />
              <ResetPasswordButtons
                validate={isDisabled}
              />
            </Grid>
          </div>      
   </form>
  )
}


const mapStateToProps = ({ pass }) => ({
  data: pass.resetPassword.data,
  errors: pass.resetPassword.errors,
  isDisabled: pass.resetPassword.isDisabled
});


const mapDispatchToProps = (dispatch) => ({
  handleChange : ({target:{id,value}}) => dispatch(changePassData(
    RESET_PASSWORD,
    id,value
  )),
  handleSubmit : (e,data,request) => {
    e.preventDefault();
    const opts = reqOptions('resetPassword','post',data)
    dispatch(resetPassword(request,opts))
  }
})




export default connect(mapStateToProps,mapDispatchToProps)(ResetPasswordForm);;
