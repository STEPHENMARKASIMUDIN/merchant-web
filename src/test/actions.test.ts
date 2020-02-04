import * as types from '../store/actionTypes';
import * as actionHelpers from '../store/actions/actionHelpers';
import * as addProductAC from '../store/actions/add-product/addProductActions';
import * as dashboardAC from '../store/actions/dashboard/dashboardActions';
import * as datesAC from '../store/actions/dates/dateActions';
import * as editProductAC from '../store/actions/edit-product/editProductActions';
import * as loginAC from '../store/actions/login/loginActions';
import * as myAccAC from '../store/actions/my-account/myAccountActions';
import * as ordersAC from '../store/actions/orders/orderActions';
import * as paymentDetailsAC from '../store/actions/paymentDetails/paymentDetailsAction';
import * as productsAC from '../store/actions/products/productActions';
import * as registerAC from '../store/actions/registration/registrationActions';
import * as reportsAC from '../store/actions/reset-password';
import * as resetPassAC from '../store/actions/reset-password';



describe('Test Actions Creators', () => {


  describe('Test action Helpers AC\'s', () => {
    it(`should return an action when calling toggleLoadingModal AC`, () => {
      const expectedAction = {
        type: types.TOGGLE_LOADING_MODAL
      }
      expect(actionHelpers.toggleLoadingModal()).toEqual(expectedAction);
    });

    it(`should return an action when calling closeVariantModal AC`, () => {
      const expectedAction = {
        type: types.TOGGLE_VARIANT_MODAL
      };
      expect(actionHelpers.closeVariantModal()).toEqual(expectedAction);
    });


    it(`should return an action when calling updateOnChange AC `, () => {
      const expectedAction = {
        type: types.CHANGE_LOGIN_DATA,
        payload: {
          id: 'email',
          value: 'mac21macky@gmail.com'
        }
      };
      expect(actionHelpers.updateOnChange(types.CHANGE_LOGIN_DATA, 'email', 'mac21macky@gmail.com')).toEqual(expectedAction);
    });


    it('should return an action when calling toggleSnackBar AC', () => {
      const expectedAction = {
        type: types.TOGGLE_SNACKBAR,
        payload: {
          message: 'Hello World',
          variant: 'success'
        }
      };
      expect(actionHelpers.toggleSnackBar('success', 'Hello World')).toEqual(expectedAction);
    });


    it('should return an action when calling clearErrors AC', () => {
      const expectedAction = {
        type: types.CLEAR_ERRORS_ADD_PRODUCT
      };
      expect(actionHelpers.clearErrors(types.CLEAR_ERRORS_ADD_PRODUCT)).toEqual(expectedAction);
    });


    it('should return an action when calling updateTag AC', () => {
      const expectedAction = {
        type: "SOME_ACTION_TYPE",
        payload: "some payload"
      };
      expect(actionHelpers.updateTag("SOME_ACTION_TYPE", "some payload")).toEqual(expectedAction);
    });

    it('should return an action when calling updatePaginationData AC', () => {
      const expectedAction = {
        type: types.UPDATE_CURRENT_ORDERS,
        payload: {
          data: [],
          paginationData: [],
          page: 1
        }
      };

      expect(actionHelpers.updatePaginationData(types.UPDATE_CURRENT_ORDERS, [], [], 1)).toEqual(expectedAction);
    })

  });




  describe('Test addProducts AC\'s', () => {

    it('should return an action when calling changeAddProductData AC', () => {
      const expectedAction = {
        type: types.CHANGE_ADD_PRODUCT_DATA,
        payload: {
          id: 'title',
          value: 'New Title'
        }
      };

      expect(addProductAC.changeAddProductData('title', 'New Title')).toEqual(expectedAction);
    });


    it('should return an action when calling addTagAddProduct AC', () => {
      const expectedAction = {
        type: types.ADD_TAG_ADD_PRODUCT,
        payload: {
          data: 'my data',
          optionName: 'option1'
        }
      };

      expect(addProductAC.addTagAddProduct('my data', 'option1')).toEqual(expectedAction);
    });


    it('should return an action when calling deleteTagAddProduct AC', () => {
      const expectedAction = {
        type: types.DELETE_TAG_ADD_PRODUCT,
        payload: {
          data: 'my data',
          optionName: 'option1',
          i: 0
        }
      };

      expect(addProductAC.deleteTagAddProduct('my data', 0, 'option1')).toEqual(expectedAction);
    });


    it('should return an action when calling clearOptions AC', () => {
      const expectedAction = {
        type: types.CLEAR_OPTIONS
      };
      expect(addProductAC.clearOptions()).toEqual(expectedAction);
    });


    it('should return an action when calling clearErrorsAP AC', () => {
      const expectedAction = {
        type: types.CLEAR_ERRORS_ADD_PRODUCT
      };
      expect(addProductAC.clearErrorsAP()).toEqual(expectedAction);
    });


    it('should return an action when calling changeAddProductLabelWidth AC', () => {
      const expectedAction = {
        type: types.CHANGE_ADD_PRODUCT_SELECT_LABELWIDTH,
        payload: {
          width: 5
        }
      };
      expect(addProductAC.changeAddProductLabelWidth(5)).toEqual(expectedAction);
    });



  });



  describe('Test dashboard AC\'s', () => {

    it('should return an action when calling updateDashboardData AC', () => {
      const expectedAction = {
        type: types.UPDATE_DASHBOARD_DATA,
        payload: {
          someData: {}
        }
      };
      expect(dashboardAC.updateDashboardData({ someData: {} })).toEqual(expectedAction);
    });

  });


  describe('Test dateAction AC\'s', () => {

    it('should return an action when calling updateDate AC', () => {
      const d = new Date();
      const expectedAction = {
        type: types.CHANGE_DATE,
        payload: {
          id: 'from_date',
          value: d
        }
      };
      expect(datesAC.updateDate('from_date', d)).toEqual(expectedAction);
    });

    it('should return an action when calling receivedTotalSale AC', () => {
      const expectedAction = {
        type: types.UPDATE_ORDER_EARNINGS,
        payload: {
          new_order_earnings: 1
        }
      };
      expect(datesAC.receivedTotalSale(1)).toEqual(expectedAction);
    })

  });


  describe('Test editProduct AC\'s', () => {

    it('should return an action when calling changeEditProductData AC', () => {
      const expectedAction = {
        type: types.CHANGE_EDIT_PRODUCT_DATA,
        payload: {
          id: 'title',
          value: 'New Title'
        }
      };

      expect(editProductAC.changeEditProductData('title', 'New Title')).toEqual(expectedAction);
    });

    it('should return an action when calling changeEditProductLabelWidth AC', () => {
      const expectedAction = {
        type: types.CHANGE_EDIT_PRODUCT_SELECT_LABELWIDTH,
        payload: {
          width: 5
        }
      };

      expect(editProductAC.changeEditProductLabelWidth(5)).toEqual(expectedAction);
    });

    it('should return an action when calling updateEditProductDetails AC', () => {
      const expectedAction = {
        type: types.UPDATE_CURRENT_EDIT_PRODUCT_DETAILS,
        payload: {
          firstname: 'Bruce',
          lastname: 'Wayne'
        }
      };

      expect(editProductAC.updateEditProductDetails({ firstname: 'Bruce', lastname: 'Wayne' })).toEqual(expectedAction);
    });

    it('should return an action when calling clearErrorsEP AC', () => {

      expect(editProductAC.clearErrorsEP()).toEqual({ type: types.CLEAR_ERRORS_EDIT_PRODUCT });

    });

    it('should return an action when calling addTagEditProduct AC', () => {
      const expectedAction = {
        type: types.ADD_TAG_EDIT_PRODUCT,
        payload: {
          someDataFromAPI: 'dataaaa'
        }
      };

      expect(editProductAC.addTagEditProduct({ someDataFromAPI: 'dataaaa' })).toEqual(expectedAction);
    });


    it('should return an action when calling deleteTagEditProduct AC', () => {
      const expectedAction = {
        type: types.DELETE_TAG_EDIT_PRODUCT,
        payload: {
          data: 'dataaaa',
          i: 5
        }
      };

      expect(editProductAC.deleteTagEditProduct('dataaaa', 5)).toEqual(expectedAction);
    });

  });


  describe('Test login AC\'s', () => {

    it('should return an action when calling toggleShowPassword AC', () => {
      const expectedAction = {
        type: types.TOGGLE_SHOW_PASSWORD_LOGIN
      };
      expect(loginAC.toggleShowPassword()).toEqual(expectedAction);
    });


    it('should return an action when calling auth_login AC', () => {
      const expectedAction = {
        type: types.LOGIN_SUCCESS,
        payload: {
          username: 'marko',
          password: 'polo'
        }
      };
      expect(loginAC.auth_login({ username: 'marko', password: 'polo' })).toEqual(expectedAction);
    });


    it('should return an action when calling changeLoginData AC', () => {
      const expectedAction = {
        type: types.CHANGE_LOGIN_DATA,
        payload: {
          id: 'email',
          value: 'mac21macky@gmail.com'
        }
      };
      expect(loginAC.changeLoginData('email', 'mac21macky@gmail.com')).toEqual(expectedAction);
    });

  });


  describe('Test myAcc AC\'s', () => {

    it('should return an action when calling changeMyAccountData AC', () => {
      const expectedAction = {
        type: types.CHANGE_MYACCOUNT_DATA,
        payload: {
          id: 'contact_number',
          value: '09123455621'
        }
      };
      expect(myAccAC.changeMyAccountData('contact_number', '09123455621')).toEqual(expectedAction);
    });


    it('should return an action when calling initializeMyAccData AC', () => {
      const expectedAction = {
        type: types.INITIALIZE_MYACCOUNT_DATA,
        payload: {
          path_1: 'path_1',
          path_2: 'path_2',
        }
      };

      expect(myAccAC.initializeMyAccData({ path_1: 'path_1', path_2: 'path_2' })).toEqual(expectedAction);
    });


    it('should return an action when calling updateMyAccountData AC', () => {
      const expectedAction = {
        type: types.UPDATE_MERCHANT_DATA,
        payload: {
          some_prop: 'some_data',
          nested_obj: {
            another_nested_obj: {
              my_prop_name: 'some_data'
            }
          }
        }
      };
      expect(myAccAC.updateMyAccountData({
        some_prop: 'some_data',
        nested_obj: {
          another_nested_obj: {
            my_prop_name: 'some_data'
          }
        }
      })).toEqual(expectedAction);

    });


    it('should return an action when calling updateImage AC', () => {
      const expectedAction = {
        type: types.UPDATE_BANNER,
        payload: {
          newPath: 'what/the/path'
        }
      };

      expect(myAccAC.updateImage(types.UPDATE_BANNER, 'what/the/path')).toEqual(expectedAction);
    });


    it('should return an action when calling initializeImagesPath AC', () => {
      const expectedAction = {
        type: types.INITIALIZE_IMAGES_PATHS,
        payload: {
          path_1: 'path/to/wtf',
          path_2: 'path/to/shit'
        }
      };
      expect(myAccAC.initializeImagesPath({ path_1: 'path/to/wtf', path_2: 'path/to/shit' })).toEqual(expectedAction);
    });



  })


  describe('Test orders AC\'s', () => {


    it('should return an action when calling updateCurrentOrders AC', () => {

      const expectedAction = {
        type: types.UPDATE_CURRENT_ORDERS,
        payload: {
          data: [],
          paginationData: [],
          page: 1
        }
      };

      expect(ordersAC.updateCurrentOrders([], [], 1)).toEqual(expectedAction);
    });


    it('should return an action when calling updateCurrentOrderEarnings AC', () => {
      const expectedAction = {
        type: types.UPDATE_CURRENT_ORDER_EARNINGS,
        payload: {
          data: [],
          paginationData: [],
          page: 1
        }
      };

      expect(ordersAC.updateCurrentOrderEarnings([], [], 1)).toEqual(expectedAction);
    });


    it('should return an action when calling updateOrderDetails AC', () => {
      const expectedAction = {
        type: types.UPDATE_ORDER_DETAILS,
        payload: { some_data: '' }
      };

      expect(ordersAC.updateOrderDetails({ some_data: '' })).toEqual(expectedAction);
    });


    it('should return an action when calling updateOrderInvoiceData AC', () => {
      const expectedAction = {
        type: types.UPDATE_ORDER_INVOICE_DATA,
        payload: { some_data: '', some_data_again: '' }
      };

      expect(ordersAC.updateOrderInvoiceData({ some_data: '', some_data_again: '' })).toEqual(expectedAction);
    });



  });



  describe('Test paymentDetails AC\'s', () => {


    it('should return the right action when calling changePaymentDetailsData AC', () => {
      const expectedAction = {
        type: types.CHANGE_PAYMENTDETAILS_DATA,
        payload: {
          id: 'bank_name', value: 'banko_de_oro'
        }
      };
      expect(paymentDetailsAC.changePaymentDetailsData('bank_name', 'banko_de_oro')).toEqual(expectedAction);
    });


    it('should return the right action when calling changePaymentDLabelWidth AC', () => {
      const expectedAction = {
        type: types.CHANGE_PAYMENTD_SELECT_LABELWIDTH,
        payload: {
          width: 100
        }
      };
      expect(paymentDetailsAC.changePaymentDLabelWidth(100)).toEqual(expectedAction);
    });

    it('should return the right action when calling togglePaymentDetailsForm AC', () => {
      const expectedAction = {
        type: types.TOGGLE_PAYMENT_DETAILS_FORM,
        payload: {
          id: "amawa", value: "anioi"
        }
      };
      expect(paymentDetailsAC.togglePaymentDetailsForm("amawa", "anioi")).toEqual(expectedAction);
    });

  });


  describe('Test resetPassAC AC\'s', () => {

    it('should return the right action when calling updatePassword AC', () => {
      const expectedAction = {
        type: types.UPDATE_PASSWORD,
        payload: {
          p: '123456'
        }
      };

      expect(resetPassAC.updatePassword('123456')).toEqual(expectedAction);
    });


    it('should return the right action when calling toggleCPModal AC', () => {
      const expectedAction = {
        type: types.TOGGLE_CHANGEPASS_MODAL,
      };

      expect(resetPassAC.toggleCPModal()).toEqual(expectedAction);
    });


    it('should return the right action when calling toggleShowPasswordPass AC', () => {
      const expectedAction = {
        type: types.TOGGLE_PASS_PASSWORD,
        payload: {
          id: 'new_password'
        }
      };

      expect(resetPassAC.toggleShowPasswordPass('new_password')).toEqual(expectedAction);
    });


    it('should return the right action when calling changePassData AC', () => {
      const expectedAction = {
        type: types.CHANGE_PASSWORD,
        payload: {
          id: 'new_password',
          value: '123456'
        }
      };

      expect(resetPassAC.changePassData(types.CHANGE_PASSWORD, 'new_password', '123456')).toEqual(expectedAction);
    });

  })

});