import React from 'react';
import Header from '../utils/Header';
import * as Title from 'react-document-title';
import styles from '../../merchant-theme/styles';
import AddImageModal from './AddImageModal';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import EditVariantModal from './EditVariantModal';
import ProductDetailsBody from './ProductDetailsBody';
import ProductDetailsFooter from './ProductDetailsFooter';
import { connect } from 'react-redux';
import { Container } from '../utils/Containers';
import { withStyles } from '@material-ui/core';
import { togglePopUp } from '../../store/actions/actionHelpers';
import { requestProductDetails } from '../../store/actions/products/productActions';
import { TOGGLE_ADD_IMAGE_MODAL } from '../../store/actionTypes';
import { setLocation } from '../../helpers';

class ProductDetails extends ValidationForm {

  state = {
    fileInputLabels: {
      newFile1: 'Choose Image',
      newFile2: 'Choose Image',
      newFile3: 'Choose Image',
      newFile4: 'Choose Image',
    },
    files: {
      newFile1: '',
      newFile2: '',
      newFile3: '',
      newFile4: '',
    }
  }


  callApiForData = () => {
    setLocation(this.props);
    const { match, vendor } = this.props;
    this.props.requestProductDetails(this.request,
      match.params.product_number, vendor);
  }



  render() {
    const { classes, match } = this.props;
    return (
      <Title title="Products | Seller • Multivendor MarketPlace">
        <ErrorBoundary name="Product Details" request={this.request}>
          <Container id="product-details">
            <Header
              label="Product Details"
            />
            <ProductDetailsBody
              classes={classes}
            />
            <ProductDetailsFooter
              // otherImages={[{ src: NoImage }, { src: NoImage }]}
              toggleAddImageModal={this.props.toggleAddImageModal}
              product_id={match.params.product_number}
              request={this.request}
            />
          </Container>
          <EditVariantModal
            product_id={this.props.match.params.product_number}
            request={this.request}
          />
          <AddImageModal
            fileLabels={this.state.fileInputLabels}
            files={this.state.files}
            request={this.request}
            product_id={match.params.product_number}
            onFileChange={this.handleFileChange}
          />
        </ErrorBoundary>
      </Title>
    )
  }
}

const mapStateToProps = ({ merchant_details, products }) => ({
  vendor: merchant_details.merchantData.shop_name,
  imagesDetails: products.prodDetails.Product_Details.imagesDetails
});


const mapDispatchToProps = (dispatch) => ({
  requestProductDetails: (request, product_number, shopName) => dispatch(requestProductDetails(request, product_number, shopName)),
  toggleAddImageModal: () => dispatch(togglePopUp(TOGGLE_ADD_IMAGE_MODAL))
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ProductDetails));