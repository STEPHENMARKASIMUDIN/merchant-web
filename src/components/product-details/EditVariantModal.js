import React from 'react';
import MerchantModal from '../utils/MerchantModal';
import EditVariantModalBody from './EditVariantModalBody';
import { connect } from 'react-redux';
import { dispatch } from '../../store';
import { closeVariantModal } from '../../store/actions/actionHelpers';
import { requestToUpdateVariant, changeVariantData } from '../../store/actions/products/productActions';

const EditVariantModal = ({ open,
  currentProductVariant, errors,
  handleSubmit, handleChange,
  isDisabled }) => {

  return (
    <MerchantModal
      title="Edit Variant"
      open={open}
      handleClose={() => {
        dispatch(closeVariantModal())
      }}
      submitCallback={handleSubmit}
      disabled={isDisabled}
      isCenter={false}
      isDraggable={false}
      width="md">
      <EditVariantModalBody
        {...currentProductVariant} errors={errors} handleChange={handleChange} />
    </MerchantModal>
  )
}





export default connect(({ popUps, products: { currentProductVariant } }) => ({
  open: popUps.showVariantModal,
  currentProductVariant: currentProductVariant.data,
  errors: currentProductVariant.errors,
  isDisabled: currentProductVariant.isDisabled
}), (dispatch, ownProps) => ({
  handleChange: ({ target: { id, value } }) => dispatch(changeVariantData(id, value)),
  handleSubmit: (e) => {
    return (e.preventDefault(), dispatch(requestToUpdateVariant(ownProps.request, ownProps.product_id)));
  }
}))(EditVariantModal);