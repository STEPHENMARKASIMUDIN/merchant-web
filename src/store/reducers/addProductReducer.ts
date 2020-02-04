import { Reducer } from 'redux';
import { AddProductState } from './../../helpers/reducersState';
import { schemaAddProduct } from "../../components/utils/Schemas";
import { updateState, resetErrors } from "../actions/actionHelpers";
import { filterTags, addNewProductTags } from '../../helpers';
import { CHANGE_ADD_PRODUCT_DATA, CHANGE_ADD_PRODUCT_SELECT_LABELWIDTH, CLEAR_ERRORS_ADD_PRODUCT, ADD_TAG_ADD_PRODUCT, DELETE_TAG_ADD_PRODUCT, CLEAR_OPTIONS } from "../actionTypes";



export const initState = {
  data: {
    product_name: '',
    product_type: '',
    description: '',
    product_tags: '',
    weight: '',
    price: '',
    comp_at_price: '',
    sku: '',
    barcode: '',
    quantity: '',
    optionValue0: '',
    optionValue1: '',
    optionValue2: ''
  },
  errors: {
    product_name: '',
    product_type: '',
    description: '',
    product_tags: '',
    weight: '',
    price: '',
    comp_at_price: '',
    sku: '',
    barcode: '',
    quantity: '',
    optionValue0: '',
    optionValue1: '',
    optionValue2: ''
  },
  isDisabled: true,
  labelWidth: 0
};

const addProductReducer: Reducer = (state: AddProductState = initState, action): AddProductState => {
  let newTags: string = '';
  switch (action.type) {
    case CHANGE_ADD_PRODUCT_DATA:
      return updateState(state, action.payload, schemaAddProduct, false);
    case CHANGE_ADD_PRODUCT_SELECT_LABELWIDTH:
      return {
        ...state,
        labelWidth: action.payload.width
      }
    case CLEAR_ERRORS_ADD_PRODUCT:
      const { data, errors } = resetErrors(state.errors, state.data);
      return {
        data,
        errors,
        isDisabled: true,
        labelWidth: 0
      }
    case ADD_TAG_ADD_PRODUCT:
      if (!action.payload.optionName) {
        newTags = [...state.data.product_tags.split(','), action.payload.data].filter(item => item).join(',');
        return {
          ...state,
          data: { ...state.data, product_tags: newTags }
        }
      }
      return {
        ...state,
        data: { ...state.data, [action.payload.optionName]: addNewProductTags(state, action) }
      }
    case DELETE_TAG_ADD_PRODUCT:
      if (!action.payload.optionName) {
        newTags = filterTags(state.data.product_tags, action);
        return {
          ...state,
          data: { ...state.data, product_tags: newTags }
        }
      } else {
        newTags = filterTags(state.data[action.payload.optionName], action);
        return {
          ...state,
          data: { ...state.data, [action.payload.optionName]: newTags }
        }
      }
    case CLEAR_OPTIONS:
      return {
        ...state,
        data: {
          ...state.data, optionValue0: '',
          optionValue1: '',
          optionValue2: ''
        }
      }
    default:
      return state;
  }
}


export default addProductReducer;