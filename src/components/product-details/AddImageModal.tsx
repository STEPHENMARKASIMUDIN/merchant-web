import React, { Component } from 'react';
import MerchantModal from '../utils/MerchantModal';
import AddImageModalBody from './AddImageModalBody';
import { S, R, A, T } from '../../helpers/merchantTypes';
import { AxiosStatic } from 'axios';
import { togglePopUp } from '../../store/actions/actionHelpers';
import { ThunkDispatch } from 'redux-thunk';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { TOGGLE_ADD_IMAGE_MODAL } from '../../store/actionTypes';
import { connect, MapStateToProps } from 'react-redux';
import { requestToAddVariantImages, Files } from '../../store/actions/products/productActions';




interface OwnProps {
  onFileChange: Function
  product_id: number
  files: Files
  request: AxiosStatic
  fileLabels: string[]
}

interface ConnectProps {
  open: boolean
  isDisabled: boolean
  submitCallback: (event: React.MouseEvent) => any
  toggleAddImageModal: (event: React.MouseEvent) => any
  imagesLeftToUpload: number
}

interface AddImageModalProps extends ConnectProps, OwnProps {

}


function AddImageModal(props: AddImageModalProps) {
  return (
    <MerchantModal title="Add Images(s)..."
      open={props.open}
      handleClose={props.toggleAddImageModal}
      submitCallback={props.submitCallback}
      width="md"
      isCenter={false}
      disabled={props.isDisabled}
      isDraggable={false}>
      <form>
        <AddImageModalBody
          fileLabels={props.fileLabels}
          onFileChange={props.onFileChange}
          imagesLeftToUpload={props.imagesLeftToUpload} />
      </form>
    </MerchantModal>
  )
};


const mapStateToProps: MapStateToProps<T, {}, MLShopMerchantState> = ({ popUps, products }) => ({
  open: popUps.showAddImageModal,
  imagesLeftToUpload: (5 - (products.prodDetails.Product_Details.imagesDetails.length))
});

const mapDispatchToProps = (dispatch: ThunkDispatch<S, R, A>, ownProps: OwnProps) => ({
  toggleAddImageModal: () => dispatch(togglePopUp(TOGGLE_ADD_IMAGE_MODAL)),
  submitCallback: (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(requestToAddVariantImages(ownProps.request, ownProps.product_id, ownProps.files));
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(AddImageModal);