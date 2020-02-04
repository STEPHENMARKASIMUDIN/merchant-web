import { Reducer } from 'redux';
import { ToggleComponentState } from './../../helpers/reducersState';
import { SHOW_EDIT, TOGGLE_DRAWER, TOGGLE_IS_APP_MOUNTED, TOGGLE_UI_THEME } from '../actionTypes';

const initState = {
  showEditInfo: false,
  showDrawer: false,
  isAppMounted: false,
  isDarkTheme: false
}


const toggleComponentReducer: Reducer = (state: ToggleComponentState = initState, action): ToggleComponentState => {
  switch (action.type) {
    case SHOW_EDIT:
      return {
        ...state,
        showEditInfo: !state.showEditInfo
      }
    case TOGGLE_DRAWER:
      if (action.payload) {
        return {
          ...state,
          showDrawer: false
        }
      }
      return {
        ...state,
        showDrawer: !state.showDrawer
      }
    case TOGGLE_IS_APP_MOUNTED:
      return {
        ...state,
        isAppMounted: !state.isAppMounted
      }
    case TOGGLE_UI_THEME:
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme
      }
    default:
      return state;
  }
}


export default toggleComponentReducer;