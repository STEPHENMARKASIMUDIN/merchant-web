import React from 'react';
import * as Title from 'react-document-title';
import Header from '../utils/Header';
import MyAccountBody from './MyAccountBody';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import ChangePasswordModal from './ChangePasswordModal';
import { connect } from 'react-redux';
import { T, A } from '../../helpers/merchantTypes';
import { Button } from '@material-ui/core';
import { setLocation } from '../../helpers';
import { AxiosStatic } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { Container, Center } from '../utils/Containers';
import { toggleCPModal, requestToChangePassword } from '../../store/actions/reset-password';
import { MLShopMerchantState, ChangePasswordState } from '../../helpers/reducersState';
import { requestToUpdateMyAccountData, requestImages } from '../../store/actions/my-account/myAccountActions';



class MyAccount extends ValidationForm {


  state = {
    fileInputLabels: {
      profile_banner: '',
      profile_image: ''
    },
    files: {
      profile_banner: null,
      profile_image: null
    }
  }


  executeSomeFunc = () => {
    setLocation(this.props);
  }

  render() {
    return (
      <Title title="My Account | Seller • Multivendor MarketPlace">
        <ErrorBoundary name="My Account" request={this.request}>
          <Container>
            <Header label="Information About User"
              withButton
              handleClick={this.props.handleToggleModal}
            />
            <MyAccountBody
              fileInputLabels={this.state.fileInputLabels}
              files={this.state.files}
              request={this.request}
              handleFileChange={this.handleFileChange}
              handleCloseSnackBar={this.handleCloseSnackBar}
            />
            <Center>
              <Button children="Edit" color="secondary"
                disabled={this.props.isDisabled}
                variant="contained"
                onClick={() => this.props.handleSubmit(this.request)}
                className="mt-2 pl-2 pr-2 pt-1 pb-1"
              />
            </Center>
          </Container>
          <ChangePasswordModal
            submitCallback={() => {
              this.props.cpSubmitCallback(this.request, this.props.state.data)
            }}
          />
        </ErrorBoundary>
      </Title>
    )
  }

}



export default connect(({ pass, myAcc }: MLShopMerchantState) => ({
  state: pass.changePassword,
  showCPModal: pass.changePassword.showCPModal,
  isDisabled: myAcc.isDisabled
}), (dispatch: ThunkDispatch<T, MLShopMerchantState, A>) => ({
  handleSubmit: (request: AxiosStatic) => dispatch(requestToUpdateMyAccountData(request)),
  requestImages: (request: AxiosStatic) => dispatch(requestImages(request)),
  cpSubmitCallback: (request: AxiosStatic, data: {}) => dispatch(requestToChangePassword(request, data)),
  handleToggleModal: () => dispatch(toggleCPModal())
}))(MyAccount);