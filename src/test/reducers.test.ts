import * as types from '../store/actionTypes';
import dashboard from "../store/reducers/dashboardReducer";
import authReducer from '../store/reducers/authReducer';
import loginReducer from "../store/reducers/loginReducer";
import imageReducer from "../store/reducers/imageReducer";
import popUpsReducer from '../store/reducers/popUpsReducer';
import { updateDashboardData } from '../store/actions/dashboard/dashboardActions';
import { DashboardState, PopUpsState, AuthState, ImageState } from './../helpers/reducersState';



const SOME_INVALID_ACTION_TYPE = 'SOME_INVALID_ACTION_TYPE';


describe('Test Reducers', () => {
  const txt = 'should return the updated state when sending an action with type';
  const txt2 = 'should return the current state if the action.type is invalid';

  describe('Test dashboard Reducer', () => {
    let state: DashboardState;
    beforeAll(() => {
      state = {
        Order_Earnings: 0,
        Recent_Orders: []
      }
    });


    it('should return the correct updated state', () => {


      expect(dashboard(state, updateDashboardData({
        Order_Earnings: 5,
        Recent_Orders: [{ order: 1 }, { order: 2 }]
      }))).toEqual({
        Order_Earnings: 5,
        Recent_Orders: [{ order: 1 }, { order: 2 }]
      });


    });


    it(`${txt2}`, () => {

      expect(dashboard(state, { type: SOME_INVALID_ACTION_TYPE })).toEqual(state);

    });


    it('should return the correct updated state', () => {

      expect(dashboard(state, { type: types.UPDATE_ORDER_EARNINGS, payload: { new_order_earnings: 15 } })).toEqual({
        Recent_Orders: [],
        Order_Earnings: 15
      });

    });


    it('should return the correct updated state', () => {

      expect(dashboard(state, { type: types.LOGOUT_USER })).toEqual(state);

    });

  });


  describe('Test popUps Reducer', () => {

    let state: PopUpsState;


    beforeAll(() => {
      state = {
        showModal: false,
        showAlert: false,
        showPopUpLogout: false,
        showNavUp: false,
        showVariantModal: false,
        showAddImageModal: false,
        snackBarProps: {
          message: '',
          open: false,
          variant: 'success'
        }
      }
    });



    it(`${txt2}`, () => {
      expect(popUpsReducer(state, { type: SOME_INVALID_ACTION_TYPE })).toEqual(state);
    });


    it(`${txt} ${types.TOGGLE_NAVUP}`, () => {
      expect(popUpsReducer(state, { type: types.TOGGLE_NAVUP })).toEqual({
        ...state,
        showNavUp: true
      });
    });


    it(`${txt} ${types.TOGGLE_ALERT}`, () => {
      expect(popUpsReducer(state, { type: types.TOGGLE_ALERT })).toEqual({
        ...state,
        showAlert: true
      });
    });


    it(`${txt} ${types.TOGGLE_LOADING_MODAL}`, () => {

      state = popUpsReducer(state, { type: types.TOGGLE_LOADING_MODAL });
      expect(state).toEqual({
        ...state,
        showModal: true
      });

    });


    it(`${txt} ${types.TOGGLE_LOADING_MODAL}`, () => {

      state = popUpsReducer(state, { type: types.TOGGLE_LOADING_MODAL });
      expect(state).toEqual({
        ...state,
        showModal: false
      });

    });


    it(`${txt} ${types.TOGGLE_VARIANT_MODAL}`, () => {

      state = popUpsReducer(state, { type: types.TOGGLE_VARIANT_MODAL });
      expect(state).toEqual({
        ...state,
        showVariantModal: true
      });

    });


    it(`${txt} ${types.TOGGLE_VARIANT_MODAL}`, () => {

      state = popUpsReducer(state, { type: types.TOGGLE_VARIANT_MODAL });
      expect(state).toEqual({
        ...state,
        showVariantModal: false
      });

    });


    it(`${txt} ${types.TOGGLE_SNACKBAR}`, () => {

      state = popUpsReducer(state, { type: types.TOGGLE_SNACKBAR, payload: {} });
      expect(state).toEqual({
        ...state,
        snackBarProps: {
          open: true,
          message: '',
          variant: 'success'
        }
      });

    });


    it(`${txt} ${types.TOGGLE_SNACKBAR}`, () => {

      state = popUpsReducer(state, { type: types.TOGGLE_SNACKBAR, payload: {} });
      expect(state).toEqual({
        ...state,
        snackBarProps: {
          open: false,
          message: '',
          variant: 'success'
        }
      });

    });



    it(`${txt} ${types.TOGGLE_SNACKBAR}`, () => {

      state = popUpsReducer(state, { type: types.TOGGLE_SNACKBAR, payload: { variant: "error", message: "Something went wrong" } });
      expect(state).toEqual({
        ...state,
        snackBarProps: {
          open: true,
          message: 'Something went wrong',
          variant: 'error'
        }
      });

    });



  });


  describe('Test auth Reducer', () => {
    let state: AuthState;

    beforeAll(() => {
      state = {
        isAuth: false,
        loginErr: {
          hasError: false,
          message: null
        }
      }
    });


    it(`${txt} ${types.LOGIN_SUCCESS}`, () => {
      state = authReducer(state, { type: types.LOGIN_SUCCESS })
      expect(state).toEqual({
        ...state,
        isAuth: true
      });
    });

    it(`should return the current state if the action.type is invalid`, () => {
      expect(authReducer(state, { type: SOME_INVALID_ACTION_TYPE })).toEqual({
        ...state,
        isAuth: true
      });
    });



    it(`${txt} ${types.LOGOUT_USER}`, () => {
      expect(authReducer(state, { type: types.LOGOUT_USER })).toEqual({
        ...state,
        isAuth: false
      });
    });


  });


  describe('Test image Reducer', () => {
    let state: ImageState;

    beforeAll(() => {
      state = {
        bannerPath: '/defaults/default_banner.jpg',
        profilePath: '/defaults/default_profile.jpg'
      }
    });


    it(`${txt2}`, () => {

      expect(imageReducer(state, { type: SOME_INVALID_ACTION_TYPE })).toEqual(state);
    });

    it(`${txt} ${types.LOGOUT_USER}`, () => {
      expect(imageReducer(state, { type: types.LOGOUT_USER })).toEqual(state);
    });



    it(`${txt} ${types.UPDATE_BANNER}`, () => {
      expect(imageReducer(state, {
        type: types.UPDATE_BANNER, payload: {
          newPath: '/new/path/to/banner'
        }
      })).toEqual({
        ...state,
        bannerPath: '/new/path/to/banner'
      });
    });


    it(`${txt} ${types.INITIALIZE_IMAGES_PATHS}`, () => {
      expect(imageReducer(state, {
        type: types.INITIALIZE_IMAGES_PATHS, payload: {
          bannerPath: '/new/path/to/banner2',
          profilePath: '/new/path/to/profile2'
        }
      })).toEqual({
        bannerPath: '/new/path/to/banner2',
        profilePath: '/new/path/to/profile2'
      });
    });


  });





});