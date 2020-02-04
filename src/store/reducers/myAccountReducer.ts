import { Reducer } from 'redux';
import { MyAccountState } from './../../helpers/reducersState';
import { updateState, validateData } from "../actions/actionHelpers";
import { schemaEditInfo } from "../../components/utils/Schemas";
import { CHANGE_MYACCOUNT_DATA, INITIALIZE_MYACCOUNT_DATA, LOGOUT_USER } from "../actionTypes";

const initState = {
  data: {
    seller_name: '',
    zipcode: '',
    city: '',
    country: '',
    contact_number: '',
    store_address: '',
    store_description: '',
    store_details: '',
    store_policies: ''
  },
  errors: {
    seller_name: '',
    store_address: '',
    city: '',
    country: '',
    contact_number: '',
    store_description: '',
    store_details: '',
    store_policies: '',
    zipcode: ''
  },
  isDisabled: true
}



const myAccountReducer: Reducer = (state: MyAccountState = initState, action): MyAccountState => {

  switch (action.type) {
    case CHANGE_MYACCOUNT_DATA:
      return updateState(state, action.payload, schemaEditInfo);
    case INITIALIZE_MYACCOUNT_DATA:
      const initData = {};
      for (const key in state.errors) {
        if (key == 'zipcode') {
          initData[key] = action.payload[key].toString()
        }
        else if (state.errors.hasOwnProperty(key)) {
          initData[key] = action.payload[key]
        }
      }
      const isDisabled = validateData(initData, schemaEditInfo);
      return {
        ...state,
        data: {
          ...state.data,
          ...initData
        },
        isDisabled
      }
    case LOGOUT_USER:
      return {
        ...initState
      }
    default:
      return state;
  }
};




export default myAccountReducer;