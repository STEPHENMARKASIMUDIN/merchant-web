import React from 'react';
import Header from '../utils/Header';
import MerchantTable from '../utils/MerchantTable';
import * as Title from 'react-document-title';
import Pagination from '../utils/Pagination';
import ErrorBoundary from '../utils/ErrorBoundary';
import ValidationForm from '../utils/ValidationForm';
import { connect } from 'react-redux';
import { Container } from '../utils/Containers';
import { setLocation } from '../../helpers';
import { requestProducts, changePageProducts, requestToRemoveProduct } from '../../store/actions/products/productActions';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { S, A } from '../../helpers/merchantTypes';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosStatic } from 'axios';


class Products extends ValidationForm {


  columns = [
    'Product No.',
    'Upload Date',
    'Image',
    'Product Name',
    'Type',
    'Price',
    'Quantity',
    'Status',
    'Action'
  ]



  callApiForData = () => {
    setLocation(this.props);
    this.props.requestProducts(this.request);
  }



  render() {
    const { isDrawerOpen, deleteCB } = this.props;

    return (
      <Title title="Products | Seller • Multivendor MarketPlace">
        <ErrorBoundary name="Products" request={this.request}>
          <Container >
            <Header label="Products" />
            <MerchantTable
              name="products"
              title="Product List"
              columns={this.columns}
              isDrawerOpen={isDrawerOpen}
              data={this.props.paginationData}
              rowProps={{
                request: this.request,
                deleteCB,
                page: this.props.page
              }}
            />
            <Pagination
              request={this.request}
              dataCount={this.props.productsCount}
              page={this.props.page}
              handleChangePage={this.props.handleChangePage}
              rowsPerPage={this.props.rowsPerPage}
            />
          </Container>
        </ErrorBoundary>
      </Title>
    )
  }

};


const mapStateToProps = ({ toggle, products }: MLShopMerchantState) => ({
  isDrawerOpen: toggle.showDrawer,
  productsCount: products.productsCount,
  paginationData: products.paginationData,
  rowsPerPage: products.rowsPerPage,
  page: products.page
});

const mapDispatchToProps = (dispatch: ThunkDispatch<MLShopMerchantState, S, A>) => ({
  requestProducts: (req: AxiosStatic) => dispatch(requestProducts(req)),
  handleChangePage: (e: any, selectedPage: number, req: AxiosStatic) => dispatch(changePageProducts(selectedPage, req)),
  deleteCB: (request: AxiosStatic, prod_id: number, image: string) => dispatch(requestToRemoveProduct(request, prod_id, image))
})




export default connect(mapStateToProps, mapDispatchToProps)(Products);

