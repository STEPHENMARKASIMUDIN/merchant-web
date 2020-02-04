import { Reducer } from 'redux';
import { ProductsState } from './../../helpers/reducersState';
import { schemaVariant } from '../../components/utils/Schemas';
import { updateState, clearErrors, resetErrors, validateData } from '../actions/actionHelpers';
import { UPDATE_CURRENT_PRODUCTS, UPDATE_PRODUCT_DETAILS, TOGGLE_VARIANT_MODAL, CHANGE_VARIANT_DATA, UPDATE_PRODUCT_VARIANT, UPDATE_IMAGES_DETAILS } from "../actionTypes";


const initState = {
  data: [],
  paginationData: [],
  page: 0,
  rowsPerPage: 15,
  productsCount: 0,
  prodDetails: {
    Product_Details: {
      image_id: [],
      product_id: "",
      product_name: "",
      product_type: "",
      product_tags: "",
      description: "",
      status: "",
      images: [],
      imagesDetails: []
    },
    Product_Variant: [{
      variant_id: "",
      images: "",
      variant_title: "",
      sku: "",
      barcode: "",
      compare_at_price: 0,
      price: 0,
      weight: 0,
      quantity: 0,
      requires_shipping: 0,
      taxable: 0
    }]
  },
  currentProductVariant: {
    data: {
      variant_id: "",
      images: "",
      variant_title: "",
      sku: "",
      barcode: "",
      compare_at_price: 0,
      price: 0,
      weight: 0,
      quantity: 0,
      requires_shipping: 0,
      taxable: 0
    },
    errors: {
      variant_id: "",
      images: "",
      variant_title: "",
      sku: "",
      barcode: "",
      compare_at_price: "",
      price: "",
      weight: "",
      quantity: "",
      requires_shipping: "",
      taxable: ""
    },
    isDisabled: true
  }
}

const productsReducer: Reducer = (state: ProductsState = initState, action): ProductsState => {
  switch (action.type) {
    case UPDATE_CURRENT_PRODUCTS:
      const { data, paginationData, page } = action.payload;
      return {
        ...state,
        data,
        paginationData,
        productsCount: data.length,
        page
      }
    case UPDATE_PRODUCT_DETAILS:
      return {
        ...state,
        prodDetails: {
          ...action.payload.data
        },
      }
    case UPDATE_PRODUCT_VARIANT:
      return {
        ...state,
        prodDetails: {
          ...state.prodDetails,
          Product_Variant: action.payload.data
        },
      }
    case UPDATE_IMAGES_DETAILS:
      return {
        ...state,
        prodDetails: {
          ...state.prodDetails,
          Product_Details: {
            ...state.prodDetails.Product_Details,
            imagesDetails: action.payload.data
          }
        },
      }
    case TOGGLE_VARIANT_MODAL:
      const hasError = validateData(action.payload, schemaVariant);
      if (action.payload) {
        return {
          ...state,
          currentProductVariant: {
            ...state.currentProductVariant,
            data: {
              ...state.currentProductVariant.data,
              ...action.payload,
            },
            isDisabled: hasError
          }
        }
      } else {
        const { data, errors } = resetErrors(state.currentProductVariant.errors, state.currentProductVariant.data);
        return {
          ...state,
          currentProductVariant: {
            data,
            errors,
            isDisabled: true
          }
        }
      }
    case CHANGE_VARIANT_DATA:
      const updatedVariantState = updateState(state.currentProductVariant, action.payload, schemaVariant);
      return {
        ...state,
        currentProductVariant: {
          data: updatedVariantState.data,
          errors: updatedVariantState.errors,
          isDisabled: updatedVariantState.isDisabled
        }
      }
    default:
      return state;
  }
}


export default productsReducer;
