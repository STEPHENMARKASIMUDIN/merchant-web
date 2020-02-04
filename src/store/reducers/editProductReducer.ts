import { Reducer } from 'redux';
import { initState } from "./addProductReducer";
import { filterTags } from '../../helpers';
import { updateState, resetErrors } from "../actions/actionHelpers";
import { AddProductState } from './../../helpers/reducersState';
import { schemaAddProduct } from "../../components/utils/Schemas";
import { CHANGE_EDIT_PRODUCT_DATA, CHANGE_EDIT_PRODUCT_SELECT_LABELWIDTH, UPDATE_CURRENT_EDIT_PRODUCT_DETAILS, ADD_TAG_EDIT_PRODUCT, DELETE_TAG_EDIT_PRODUCT, CLEAR_ERRORS_EDIT_PRODUCT } from "../actionTypes";



const initEditState = {
  ...initState
}

const editProductReducer: Reducer = (state: AddProductState = initEditState, action): AddProductState => {
  let newTags: string = '';
  switch (action.type) {
    case CHANGE_EDIT_PRODUCT_DATA:
      return updateState(state, action.payload, schemaAddProduct, false);
    case CHANGE_EDIT_PRODUCT_SELECT_LABELWIDTH:
      return {
        ...state,
        labelWidth: action.payload.width
      }
    case UPDATE_CURRENT_EDIT_PRODUCT_DETAILS:
      return {
        ...state,
        data: { ...action.payload }
      }
    case ADD_TAG_EDIT_PRODUCT:
      newTags = [...state.data.product_tags.split(','), action.payload].filter(item => item).join(',');
      return {
        ...state,
        data: { ...state.data, product_tags: newTags }
      }
    case DELETE_TAG_EDIT_PRODUCT:
      newTags = filterTags(state.data.product_tags, action);
      return {
        ...state,
        data: { ...state.data, product_tags: newTags }
      }
    case CLEAR_ERRORS_EDIT_PRODUCT:
      const { data, errors } = resetErrors(state.data, state.errors);
      return {
        data,
        errors,
        isDisabled: true,
        labelWidth: 0
      }
    default:
      return state;
  }
}


export default editProductReducer;