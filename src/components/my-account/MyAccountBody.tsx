import React, { Fragment, Component } from 'react';
import ChangeBannerModal from './ChangeBannerModal';
import styles from '../../merchant-theme/styles';
import ProfileAvatar from '../utils/ProfileAvatar';
import ChangeProfileImageModal from './ChangeProfileImageModal';
import { connect } from 'react-redux';
import { toggleSnackBar } from '../../store/actions/actionHelpers';
import { MyAccountLabel } from '../utils/Header';
import { Center, Container } from '../utils/Containers';
import { warning, SnackBMsg } from '../../helpers';
import { MerchantFormField, MerchantForm, MerchantTextArea } from '../utils/Forms';
import { changeMyAccountData, initializeMyAccData, requestToUpdateImage } from '../../store/actions/my-account/myAccountActions';
import { Paper, Grid, withStyles, Button, Tooltip, IconButton, StyleRulesCallback } from '@material-ui/core';
import {
  AccountCircle, Email, LocationCity, Shop,
  StoreMallDirectory, AddLocation, Phone, Description, Edit
} from '@material-ui/icons';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { S, A, MerchantData, T } from '../../helpers/merchantTypes';
import { AxiosStatic } from 'axios';


interface MyAccountBodyProps {
  classes: {
    paper: string
  }
  merchantData: MerchantData
  errors: {}
  handleChange: (event: any) => any
  profilePath: string
  bannerPath: string
  handleFileChange: (event: any) => any
  initialize: (data: MerchantData) => any
  files: {
    profile_image: File
    profile_banner: File
  }
  fileInputLabels: {
    profile_image: string
    profile_banner: string
  }
  updateImage: (file: File, inputName: string, closeModalCallback: Function) => T
  setSnackBarProps: (variant: string, message: string) => void
  handleCloseSnackBar: () => void
}

interface MyAccountBodyState {
  showChangeBannerModal: boolean
  showChangeProfileModal: boolean
}


class MyAccountBody extends Component<MyAccountBodyProps, MyAccountBodyState> {


  state = {
    showChangeBannerModal: false,
    showChangeProfileModal: false
  }

  handleToggleBannerModal = (e: React.MouseEvent) => {
    this.setState(state => ({ showChangeBannerModal: !state.showChangeBannerModal }))
  }
  handleToggleProfileModal = (e: React.MouseEvent) => {
    this.setState(state => ({ showChangeProfileModal: !state.showChangeProfileModal }))
  }





  componentDidMount = () => {
    this.props.initialize(this.props.merchantData);
  }




  render() {
    const { classes, merchantData, errors, handleChange, profilePath, bannerPath } = this.props;
    const { seller_name, shop_name, orders, contact_number, zipcode, city, email, country, store_address, products,
      store_description, store_details, store_policies } = merchantData;
    //  store_description, store_details, store_policies

    return (
      <Fragment>
        <Grid item container xs={12} justify="center">
          <Grid item xs="auto" >
            <div className="paper-banner pos-relative">
              <img
                src={bannerPath}
                alt="Profile Banner"
                id="banner-image-id"
              />
              <Tooltip title="Change Seller Profile Banner">
                <IconButton onClick={this.handleToggleBannerModal}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
        <Center classes="mt-3" >
          <Grid item xs={2} >
            <Center justify="flex-start" classes="float-left">
              <ProfileAvatar
                hasContainer={false}
                src={profilePath} size={150}>
              </ProfileAvatar>
            </Center>
            <Button
              onClick={this.handleToggleProfileModal}
              color="secondary"
              variant="text"
              className="ml-1"
              children="Change Image"
            />
          </Grid>
          <Grid item xs={8} >
            <Paper className={classes.paper} id="my-account-body">
              <Container isChildContainer={true}
                hasDefaultClasses={false}
                classes="mt-1 mb-1"
                spacing={32}
                wantPaper={false}>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label="Your Name"
                      className="subheading-small"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantFormField
                      isText
                      name="seller_name"
                      handleChange={handleChange}
                      defaultValue={seller_name}
                      isSmall
                      error={errors}
                      Icon={AccountCircle}
                      autoFocus
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label={'Your Shop\'s Name'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantFormField
                      isText
                      disabled
                      name="shop_name"
                      defaultValue={shop_name}
                      isSmall
                      Icon={Shop}
                      error={errors}
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label={'Your Email Address'} className="subheading-small" />

                  </Grid>
                  <Grid item xs={8}>
                    <MerchantFormField
                      isText
                      handleChange={handleChange}
                      defaultValue={email}
                      name="email"
                      isSmall
                      disabled
                      error={errors}
                      Icon={Email}
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label={'Store Address'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantFormField
                      isText
                      name="store_address"
                      handleChange={handleChange}
                      defaultValue={store_address}
                      isSmall
                      error={errors}
                      Icon={StoreMallDirectory}
                    />
                  </Grid>
                </Fragment>

                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label={'City'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantFormField
                      isText
                      name="city"
                      handleChange={handleChange}
                      defaultValue={city}
                      isSmall
                      error={errors}
                      Icon={LocationCity}
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label={'Country'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantForm
                      name="country"
                      onChange={({ target: { name, value } }) => {
                        handleChange({ target: { id: name, value } })
                      }}
                      value={country}
                      isRequired
                      error={errors}
                      isOutlined
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label={'Zipcode'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantFormField
                      isText
                      handleChange={handleChange}
                      defaultValue={zipcode}
                      isSmall
                      name="zipcode"
                      allowDigitsOnly
                      disableCopyPaste
                      InputProps={{
                        maxLength: 5,
                        minLength: 4
                      }}
                      error={errors}
                      Icon={AddLocation}
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1">
                    <MyAccountLabel label={'Phone Number'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantFormField
                      isText
                      handleChange={handleChange}
                      isSmall
                      allowDigitsOnly
                      disableCopyPaste
                      name="contact_number"
                      defaultValue={contact_number}
                      error={errors}
                      Icon={Phone}
                      InputProps={{
                        maxLength: 11
                      }}
                    />
                  </Grid>
                </Fragment>

                <Fragment>
                  <Grid item xs={4} className="mt-small-1 mt-1">
                    <MyAccountLabel label={'Short Store Description'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantTextArea
                      name="store_description"
                      error={errors}
                      defaultValue={store_description}
                      handleChange={handleChange}
                      IconProps={{
                        Icon: Description
                      }}
                      InputProps={{
                        maxLength: 30
                      }}
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1 mt-1">
                    <MyAccountLabel label={'Store Details'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantTextArea
                      name="store_details"
                      error={errors}
                      defaultValue={store_details}
                      handleChange={handleChange}
                      IconProps={{
                        Icon: Description
                      }}
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={4} className="mt-small-1 mt-1">
                    <MyAccountLabel label={'Store Policies'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={8}>
                    <MerchantTextArea
                      name="store_policies"
                      error={errors}
                      defaultValue={store_policies}
                      handleChange={handleChange}
                      IconProps={{
                        Icon: Description
                      }}
                    />
                  </Grid>
                </Fragment>
                <Fragment>
                  <Grid item xs={3} className="mt-small-1">
                    <MyAccountLabel label={'Total Product(s)'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={3}>
                    <MerchantFormField
                      isText
                      defaultValue={products}
                      isSmall
                      classes="text-black"
                      error={errors}
                      disabled
                      InputProps={{
                        inputPropsClasses: 'text-black'
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} className="mt-small-1">
                    <MyAccountLabel label={'Total Orders(s)'} className="subheading-small" />
                  </Grid>
                  <Grid item xs={3}>
                    <MerchantFormField
                      isText
                      defaultValue={orders}
                      isSmall
                      disabled
                      InputProps={{
                        inputPropsClasses: 'text-black'
                      }}
                      classes="text-black"
                      error={errors}
                    />
                  </Grid>
                </Fragment>
              </Container>
            </Paper>
          </Grid>
        </Center>
        <ChangeBannerModal
          submitCallback={this.submitCallbackBanner}
          open={this.state.showChangeBannerModal}
          handleClose={this.handleToggleBannerModal}
          handleFileChange={this.props.handleFileChange}
          bannerImageLabel={this.props.fileInputLabels.profile_banner}
        />
        <ChangeProfileImageModal
          submitCallback={this.submitCallbackProfile}
          handleFileChange={this.props.handleFileChange}
          open={this.state.showChangeProfileModal}
          handleClose={this.handleToggleProfileModal}
          profileImageLabel={this.props.fileInputLabels.profile_image}
        />
      </Fragment >
    )
  }







  submitCallbackProfile = () => {
    if (!this.props.files.profile_image) {
      this.props.setSnackBarProps(warning, SnackBMsg(11));
    } else {
      this.props.updateImage(this.props.files.profile_image, 'profile_image', this.handleToggleProfileModal);
    }
  }


  submitCallbackBanner = () => {
    if (!this.props.files.profile_banner) {
      this.props.setSnackBarProps(warning, SnackBMsg(11));
    } else {
      this.props.updateImage(this.props.files.profile_banner, 'profile_banner', this.handleToggleBannerModal);
    }
  }


};


const mapStateToProps = ({ merchant_details: { merchantData }, myAcc, popUps, image: { profilePath, bannerPath } }: MLShopMerchantState) => ({
  merchantData,
  errors: myAcc.errors,
  snackBarProps: popUps.snackBarProps,
  profilePath,
  bannerPath
});

const mapDispatchToProps = (dispatch: ThunkDispatch<MLShopMerchantState, S, A>, ownProps: { request: AxiosStatic }) => ({
  handleChange: ({ target: { id, value } }) => dispatch(changeMyAccountData(id, value)),
  setSnackBarProps: (variant: string, message: string) => dispatch(toggleSnackBar(variant, message)),
  initialize: (data: MerchantData) => dispatch(initializeMyAccData(data)),
  updateImage: (file: File, inputName: string, closeModalCallback: Function) => dispatch(requestToUpdateImage(ownProps.request, file, inputName, closeModalCallback))
})


const EnhancedMyAccountBody = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as StyleRulesCallback, { withTheme: true })(MyAccountBody));

export default EnhancedMyAccountBody;
