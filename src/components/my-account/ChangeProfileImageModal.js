import React from 'react';
import MerchantModal from '../utils/MerchantModal';
import { Card, CardContent,  Typography ,CardActions,Button} from '@material-ui/core';

const ChangeProfileImageModal = ({ open, handleClose,handleFileChange,profileImageLabel,submitCallback }) => {

   return (
      <MerchantModal
         title="Change Profile Image"
         open={open}
         disabled={false}
         submitCallback={submitCallback}
         handleClose={handleClose}>
         <Card className="card-profile-image">
            <CardContent>
               <Typography
                  variant="h6"
                  className="text-primary"
                  children="Note:"
               />
               <Typography 
               className="mt-1"
               children="Profile Image can be
                uploaded of any dimension but we recommend 
                you to upload an image with dimension of 185x185."
               />
            </CardContent>
            <CardActions>
               <Button 
                  color="secondary"
                  htmlFor="profile_image"
                  children={
                     [
                        <span key="1">Upload Image</span>,
                        <input
                           key="2"
                           onChange={handleFileChange}
                        type="file" id="profile_image"
                        name="profile_image"
                        accept="image/*"
                        style={{display:'none'}} />
                     ]
                  }
                  variant="text"
                  component="label"

               />
               <Typography 
               className="d-inline"
               children={profileImageLabel}
               />
            </CardActions>
         </Card>
      </MerchantModal>
   )
}



export default ChangeProfileImageModal;