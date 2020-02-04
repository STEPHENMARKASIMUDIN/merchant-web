import React from 'react';
import ValidationForm from '../utils/ValidationForm';
import AddEditProduct from '../add_edit_product';
import { connect } from 'react-redux';
import { changeAddProductData, changeAddProductLabelWidth, clearErrorsAP } from '../../store/actions/add-product/addProductActions';
import { setLocation } from '../../helpers';

class AddProduct extends ValidationForm {


  executeSomeFunc = () => {
    setLocation(this.props);
  }

  unMountFunc = () => {
    this.props.clearErrorsAP();
  }

  render() {

    const { handleChange, labelWidth, changeSelectLabelWidth, data, errors } = this.props;
    return (
      <AddEditProduct
        title="Add Product | Seller • Multivendor MarketPlace"
        labelHeader="Add Product"
        handleChange={handleChange}
        labelWidth={labelWidth}
        changeSelectLabelWidth={changeSelectLabelWidth}
        data={data}
        errors={errors}
        request={this.request}
      />
    )
  }
}



export default connect(({ addProd }) => ({
  labelWidth: addProd.labelWidth,
  data: addProd.data,
  errors: addProd.errors
}), (dispatch) => ({
  handleChange: ({ target: { id, value } }) => dispatch(changeAddProductData(id, value)),
  changeSelectLabelWidth: (width) => dispatch(changeAddProductLabelWidth(width)),
  clearErrorsAP: () => dispatch(clearErrorsAP())
}))(AddProduct);