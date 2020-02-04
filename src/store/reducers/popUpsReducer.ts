import { Reducer } from 'redux';
import { PopUpsState } from './../../helpers/reducersState';
import { snackBarProps } from "../../components/utils/ComponentProps";
import {
  TOGGLE_LOADING_MODAL, TOGGLE_ALERT, TOGGLE_SNACKBAR,
  TOGGLE_POPOUT_LOGOUT, TOGGLE_NAVUP, TOGGLE_VARIANT_MODAL, TOGGLE_ADD_IMAGE_MODAL
} from "../actionTypes";


const initState = {
  showModal: false,
  showAlert: false,
  showPopUpLogout: false,
  showNavUp: false,
  showVariantModal: false,
  showAddImageModal: false,
  ...snackBarProps
}


const popUpsReducer: Reducer = (state: PopUpsState = initState, action): PopUpsState => {
  switch (action.type) {
    case TOGGLE_SNACKBAR:
      if (!action.payload.variant && !action.payload.message) {
        return {
          ...state,
          snackBarProps: {
            ...state.snackBarProps,
            open: !state.snackBarProps.open
          }
        }
      }
      return {
        ...state,
        snackBarProps: {
          variant: action.payload.variant,
          message: action.payload.message,
          open: !state.snackBarProps.open
        }
      }
    case TOGGLE_LOADING_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      }
    case TOGGLE_ALERT:
      return {
        ...state,
        showAlert: !state.showAlert
      }
    case TOGGLE_POPOUT_LOGOUT:
      return {
        ...state,
        showPopUpLogout: !state.showPopUpLogout
      }
    case TOGGLE_NAVUP:
      return {
        ...state,
        showNavUp: !state.showNavUp,
      }
    case TOGGLE_VARIANT_MODAL:
      return {
        ...state,
        showVariantModal: !state.showVariantModal
      }
    case TOGGLE_ADD_IMAGE_MODAL:
      return {
        ...state,
        showAddImageModal: !state.showAddImageModal
      }
    default:
      return state;
  }
}


export default popUpsReducer;