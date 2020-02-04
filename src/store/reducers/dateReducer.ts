import { Reducer } from 'redux';
import { DateState } from './../../helpers/reducersState';
import { CHANGE_DATE } from "../actionTypes";
import { updateState } from "../actions/actionHelpers";
import { schemaDashboard } from "../../components/utils/Schemas";
import { formatAndConvertToDate } from "../../helpers";

const initState = {
  data: {
    from: formatAndConvertToDate(new Date()),
    to: formatAndConvertToDate(new Date())
  },
  errors: {
    from: '',
    to: ''
  },
}


const dateReducer: Reducer = (state: DateState = initState, action): DateState => {
  switch (action.type) {
    case CHANGE_DATE:
      return updateState(state, action.payload, schemaDashboard);
    default:
      return state;
  }
}


export default dateReducer;