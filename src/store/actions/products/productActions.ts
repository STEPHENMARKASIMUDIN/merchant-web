import FormData from 'form-data';
import { slice } from 'lodash';
import { ThunkAction, } from 'redux-thunk';
import { updateEditProductDetails } from '../edit-product/editProductActions';
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { AnyAction, ActionCreator, Action } from 'redux';
import { A, T, S, R, MLShopMerchantApiResponse } from '../../../helpers/merchantTypes';
import { MLShopMerchantState, ProductDetailsImages } from '../../../helpers/reducersState';
import { reqOptions, error, SnackBMsg, success, isItemAvailable, requestCatchHandler } from '../../../helpers';
import { updatePaginationData, requestPaginationData, toggleSnackBar, getLimits2, updateOnChange } from '../actionHelpers';
import { UPDATE_CURRENT_PRODUCTS, UPDATE_PRODUCT_DETAILS, CHANGE_VARIANT_DATA, UPDATE_PRODUCT_VARIANT, UPDATE_IMAGES_DETAILS } from '../../actionTypes';

const changePageProducts =
  (selectedPage: number, request: AxiosStatic) =>
    requestPaginationData(request, 'products', updateCurrentProducts, selectedPage)


const requestProducts =
  (request: AxiosStatic) => requestPaginationData(request, 'products', updateCurrentProducts)


const updateCurrentProducts =
  (data: any[], paginationData: any[], page: number) => updatePaginationData(UPDATE_CURRENT_PRODUCTS, data, paginationData, page)


const changeVariantData: ActionCreator<A> =
  (id: string, value: string): Action => updateOnChange(CHANGE_VARIANT_DATA, id, value);


const updateProductDetails: ActionCreator<A> = (data): AnyAction => ({
  type: UPDATE_PRODUCT_DETAILS,
  payload: {
    data
  }
});

const updateProductVariant: ActionCreator<A> = (data): AnyAction => ({
  type: UPDATE_PRODUCT_VARIANT,
  payload: {
    data
  }
});


const updateImagesDetails: ActionCreator<A> = (data: ProductDetailsImages[]): AnyAction => ({
  type: UPDATE_IMAGES_DETAILS,
  payload: {
    data
  }
})

export interface Files {
  newFile1?: File
  newFile2?: File
  newFile3?: File
  newFile4?: File
}

const requestToAddVariantImages = (request: AxiosStatic, product_id: number, files: Files): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { merchant_details } = getState();
      const formData = new FormData();
      formData.append('shop_name', merchant_details.merchantData.shop_name);
      formData.append('product_id', product_id);
      formData.append('type', 'add-product');

      for (const key in files) {
        if (files.hasOwnProperty(key)) {
          if (files[key]) {
            formData.append(key, files[key]);
          }
        }
      }
      const opts: AxiosRequestConfig = reqOptions('addImages', 'post', formData);
      const { data }: MLShopMerchantApiResponse = await request(opts);
      switch (data.ResponseCode) {
        case 200:
          dispatch(updateProductDetails(data.data));
          dispatch(toggleSnackBar(success, SnackBMsg(23)));
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToAddVariantImages');
    }
  }
};

const requestToUpdateVariant = (request: AxiosStatic, product_id: number): ThunkAction<T, MLShopMerchantState, R, A> => {
  return async (dispatch, getState) => {
    const { products } = getState();
    try {
      const opts = reqOptions('editVariant', 'post', { ...products.currentProductVariant.data, product_id });
      const isPriceGreaterThanCompareAtPrice = (+products.currentProductVariant.data.price >= +products.currentProductVariant.data.compare_at_price);
      if (isPriceGreaterThanCompareAtPrice) {
        return dispatch(toggleSnackBar(error, SnackBMsg(22)))
      } else {
        const { data }: MLShopMerchantApiResponse = await request(opts);
        const { ResponseCode, ResponseMessage } = data;
        switch (ResponseCode) {
          case 200:
            let newProduct_Variant = products.prodDetails.Product_Variant.map((d) => {
              if (d.variant_id === products.currentProductVariant.data.variant_id) {
                return {
                  ...products.currentProductVariant.data
                }
              } else {
                return d;
              }
            })
            dispatch(toggleSnackBar(success, SnackBMsg(21)));
            dispatch(updateProductVariant(newProduct_Variant));
            break;
          default:
            dispatch(toggleSnackBar(error, ResponseMessage))
            break;
        }
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToUpdateVariant');
    }
  }
};

const requestProductDetails = (request: AxiosStatic, product_number: number, shopName: string): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async dispatch => {
    try {
      const opts = reqOptions('productDetails', 'get', { product_number, vendor: shopName });
      const { data }: MLShopMerchantApiResponse = await request(opts);
      const { ResponseCode, ResponseMessage } = data;
      switch (ResponseCode) {
        case 200:
          const details = data.data['Product_Details'], variant = data.data['Product_Variant'].length ? data.data['Product_Variant'][0] : {};
          const editProductDetails = {
            product_name: isItemAvailable(details.product_name),
            product_type: isItemAvailable(details.product_type),
            description: isItemAvailable(details.description),
            product_tags: details.product_tags,
            weight: isItemAvailable(variant.weight),
            price: isItemAvailable(variant.price),
            comp_at_price: isItemAvailable(variant.compare_at_price),
            sku: isItemAvailable(variant.sku),
            barcode: isItemAvailable(variant.barcode),
            quantity: isItemAvailable(variant.quantity)
          }
          dispatch(updateProductDetails(data.data));
          dispatch(updateEditProductDetails(editProductDetails))
          break;
        default:
          dispatch(toggleSnackBar(error, ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestProductDetails');
    }
  }
};

const requestToRemoveProduct = (request: AxiosStatic, product_id: number, image: string, page?: number): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { merchant_details } = getState();
      const shopName = merchant_details.merchantData.shop_name;
      const opts = reqOptions('removeProduct', 'post', { product_id, image, shopName, ...getLimits2(page) });
      const { data }: MLShopMerchantApiResponse = await request(opts);
      switch (data.ResponseCode) {
        case 200:
          let paginationData = slice(data.data, 0, 15);
          dispatch(toggleSnackBar(success, SnackBMsg(16)));
          dispatch(updateCurrentProducts(data.data, paginationData, page));
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToRemoveProduct');
    }
  }
};


const requestToRemoveVariantImage = (request: AxiosStatic, product_id: number, image: string, image_id: number): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { merchant_details, products } = getState();
      const shopName = merchant_details.merchantData.shop_name;
      const opts: AxiosRequestConfig = reqOptions('removeImage', 'post', { product_id, shopName, image, image_id });
      const { data }: MLShopMerchantApiResponse = await request(opts);

      switch (data.ResponseCode) {
        case 200:
          const newImagesDetails = products.prodDetails.Product_Details.imagesDetails.filter((item) => item.id !== image_id);
          dispatch(updateImagesDetails(newImagesDetails));
          dispatch(toggleSnackBar(success, SnackBMsg(24)))
          break;
        default:
          dispatch(toggleSnackBar(error, data.ResponseMessage))
          break;
      }
    } catch (e) {
      requestCatchHandler(request, e, dispatch, 'requestToRemoveVariantImage');
    }
  }
}



export {
  requestProducts,
  changeVariantData,
  changePageProducts,
  updateCurrentProducts,
  requestProductDetails,
  requestToUpdateVariant,
  requestToRemoveProduct,
  requestToAddVariantImages,
  requestToRemoveVariantImage,
}

