import React from 'react';
import MerchantModal from '../utils/MerchantModal';
import IconUpload from '../utils/IconUpload';
import { ImageSearch } from '@material-ui/icons';

const ChangeBannerModal = ({ open, handleClose, handleFileChange, submitCallback, bannerImageLabel }) => {


  return (
    <MerchantModal open={open}
      handleClose={handleClose}
      disabled={false}
      submitCallback={submitCallback}
      cancelLabel="Not Now"
      title="Please Choose your new Banner Image">
      <IconUpload
        classes="mt-1"
        name="profile_banner"
        label={!bannerImageLabel ? "Find Image" : bannerImageLabel}
        placement="bottom"
        handleChangeFile={handleFileChange}
        Icon={ImageSearch}
        acceptPattern="image/*"
        toolTipTitle="Only jpg, png, and jpeg are the allowed extensions."
      />

    </MerchantModal>
  )
};


export default ChangeBannerModal;