import React, { Fragment } from 'react';
import UploadIcon, { IconBtnToolTip } from '../utils/IconUpload';
import {connect} from 'react-redux';
import { AttachFile, FileCopy,Delete } from '@material-ui/icons';
import { Button, Grid, Typography,IconButton} from '@material-ui/core';
import { GridContainer, Center } from '../utils/Containers';
//import { onFileChange } from '../../store/actions/registration/registrationActions';


const RegistrationFooter = ({ validate,onFileChange,labels,onSubmit,isDisabled,handleRemoveFile }) => {
  return (
    <Fragment>
    <Grid item container>
    <GridContainer splitByFours>
    <UploadIcon
          Icon={AttachFile}
          name="business_permit"
          handleChangeFile={onFileChange}
          label={labels["business_permit"]}
        /> 
            <UploadIcon
          Icon={FileCopy}
          name="brgy_clearance"
          handleChangeFile={onFileChange}
          label={labels["brgy_clearance"]}
        />
            <UploadIcon
          Icon={FileCopy}
          name="police_clearance"
          handleChangeFile={onFileChange}
          label={labels["police_clearance"]}
        />
           <UploadIcon
          Icon={FileCopy}
          name="valid_id"
          handleChangeFile={onFileChange}
          label={labels["valid_id"]}
        />
    </GridContainer>
    <GridContainer splitByFours>
        <Center wantPaper={false}>
        <IconBtnToolTip onIconClick={(e)=>{handleRemoveFile('business_permit')}} name="remove-1"
            placement="bottom"
            iconBtnClasses="p-0"
            title="Cancel File">
              <Delete />
        </IconBtnToolTip>
        </Center>
        <Center wantPaper={false}>
        <IconBtnToolTip onIconClick={(e)=>{handleRemoveFile('brgy_clearance')}} name="remove-2"
            placement="bottom"
            iconBtnClasses="p-0"
            title="Cancel File">
              <Delete />
        </IconBtnToolTip>
        </Center>
        <Center wantPaper={false}>
        <IconBtnToolTip onIconClick={(e)=>{handleRemoveFile('police_clearance')}} name="remove-3"
            placement="bottom"
            iconBtnClasses="p-0"
            title="Cancel File">
              <Delete />
        </IconBtnToolTip>
        </Center>
        <Center wantPaper={false}>
        <IconBtnToolTip onIconClick={(e)=>{handleRemoveFile('valid_id')}} name="remove-4"
            placement="bottom"
            iconBtnClasses="p-0"
            title="Cancel File">
              <Delete />
        </IconBtnToolTip>
        </Center>
    </GridContainer>
    </Grid>
    <Grid item container justify="flex-start">
        <Typography 
          style={{paddingLeft:16}}
          children="Please attach supporting documents like:
          Business Permit, Brgy.Clearance, Police Clearance and Valid ID"
        />
    </Grid>
    <Grid item container justify="center">
      <Button
        color="secondary"
        children="Make me a merchant"
        variant="contained"
        type="submit"
        onClick={onSubmit}
        disabled={isDisabled}
      />
    </Grid>
  </Fragment>

  )
}

const mapStateToProps = ({signup}) => ({
    isDisabled : signup.isDisabled,
    files : signup.files,
});



export default connect(mapStateToProps)(RegistrationFooter);
