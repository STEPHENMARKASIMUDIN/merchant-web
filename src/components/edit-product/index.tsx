import React from 'react';
import ValidationForm, { ValidationFormProps } from '../utils/ValidationForm';
import AddEditProduct from '../add_edit_product';
import { S, A } from '../../helpers/merchantTypes';
import { connect } from 'react-redux';
import { setLocation } from '../../helpers';
import { AxiosStatic } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { requestProductDetails } from '../../store/actions/products/productActions';
import { changeEditProductData, changeEditProductLabelWidth, requestToEditProduct, clearErrorsEP } from '../../store/actions/edit-product/editProductActions';



class EditProduct extends ValidationForm {

  executeSomeFunc = () => {
    const { match, shopName } = this.props;
    const { product_number } = match.params;
    setLocation(this.props);
    this.props.requestProductDetails(this.request, product_number, shopName);
  }



  unMountFunc = () => {
    this.props.clearErrorsEP();
  }


  render() {
    const { handleChange, changeSelectLabelWidth, data, errors, labelWidth } = this.props;
    return (
      <AddEditProduct
        idBody='edit-product-body'
        title="Edit Product | Seller • Multivendor MarketPlace"
        labelHeader="Edit Product"
        handleChange={handleChange}
        changeSelectLabelWidth={changeSelectLabelWidth}
        data={data}
        errors={errors}
        labelWidth={labelWidth}
        product_number={this.props.match.params.product_number}
        submitCallBack={() => this.props.requestToEditProduct(this.request)}
      />
    )
  }
};



const mapState = ({ editProd, merchant_details: { merchantData } }: MLShopMerchantState) => ({
  labelWidth: editProd.labelWidth,
  data: {
    tags: editProd.data.product_tags,
    ...editProd.data
  },
  errors: editProd.errors,
  shopName: merchantData.shop_name
});

const mapDispatch = (dispatch: ThunkDispatch<MLShopMerchantState, S, A>, ownProps: ValidationFormProps) => ({
  changeSelectLabelWidth: (width: number) => dispatch(changeEditProductLabelWidth(width)),
  handleChange: ({ target: { id, value } }) => dispatch(changeEditProductData(id, value)),
  requestToEditProduct: (request: AxiosStatic) => dispatch(requestToEditProduct(request, ownProps.match.params.product_number)),
  requestProductDetails: (request: AxiosStatic, product_number: number, shopName: string) => dispatch(requestProductDetails(request, product_number, shopName)),
  clearErrorsEP: () => dispatch(clearErrorsEP())
})

export default connect(mapState, mapDispatch)(EditProduct)