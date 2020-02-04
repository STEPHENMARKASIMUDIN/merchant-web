import { Reducer } from 'redux';
import { PaymentDetailsState } from './../../helpers/reducersState';
import { schemaPaymentDetails } from "../../components/utils/Schemas";
import { updateState, resetErrors } from "../actions/actionHelpers";
import { CHANGE_PAYMENTDETAILS_DATA, TOGGLE_PAYMENT_DETAILS_FORM, CHANGE_PAYMENTD_SELECT_LABELWIDTH, CLEAR_ERRORS_PAYMENT_DETAILS } from "../actionTypes";


const initState = {
  data: {
    bank_name: '',
    account_number: '',
    cardholder_name: '',
    sort_code: '',
    other_info: '',
    payment_method: '',
  },
  errors: {
    bank_name: '',
    account_number: '',
    cardholder_name: '',
    sort_code: '',
    other_info: '',
    payment_method: '',
  },
  isDisabled: true,
  showPaymentDetailsForm: false,
  labelWidth: 0
}



const paymentDetailsReducer: Reducer = (state: PaymentDetailsState = initState, action): PaymentDetailsState => {

  switch (action.type) {
    case CHANGE_PAYMENTDETAILS_DATA:
      return updateState(state, action.payload, schemaPaymentDetails);
    case TOGGLE_PAYMENT_DETAILS_FORM:
      return { ...updateState(state, action.payload, schemaPaymentDetails), showPaymentDetailsForm: !state.showPaymentDetailsForm }
    case CHANGE_PAYMENTD_SELECT_LABELWIDTH:
      return { ...state, labelWidth: action.payload.width }
    case CLEAR_ERRORS_PAYMENT_DETAILS:
      const { data, errors } = resetErrors(state.errors, state.data);
      return {
        ...state,
        showPaymentDetailsForm: false,
        isDisabled: true,
        data,
        errors
      }
    default:
      return state;
  }
}



export default paymentDetailsReducer;