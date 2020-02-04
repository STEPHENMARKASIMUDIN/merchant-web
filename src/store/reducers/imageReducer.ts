import { Reducer } from 'redux';
import { ImageState } from './../../helpers/reducersState';
import { UPDATE_BANNER, UPDATE_PROFILE, INITIALIZE_IMAGES_PATHS, LOGOUT_USER } from '../actionTypes';


const initState = {
  bannerPath: '/defaults/default_banner.jpg',
  profilePath: '/defaults/default_profile.jpg'
}

const imageReducer: Reducer = (state: ImageState = initState, action): ImageState => {
  switch (action.type) {
    case UPDATE_BANNER:
      return {
        ...state,
        bannerPath: action.payload.newPath
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        profilePath: action.payload.newPath
      }
    case INITIALIZE_IMAGES_PATHS:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT_USER:
      return {
        ...initState
      }
    default:
      return state;

  }
}

export default imageReducer;