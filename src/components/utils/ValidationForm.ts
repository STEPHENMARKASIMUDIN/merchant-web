import axios, { AxiosStatic, CancelTokenSource, AxiosRequestConfig } from 'axios';
import { dispatch } from '../../store';
import { Component } from 'react';
import { toggleSnackBar } from '../../store/actions/actionHelpers';
import { validate, SchemaLike } from 'joi';
import { IsFileAllowedResult, A } from '../../helpers/merchantTypes';
import { RouteComponentProps, match } from 'react-router';
import { ChangePasswordState, ChangePasswordData, Pagination, ProductsState } from '../../helpers/reducersState';
import { isFileAllowed, axiosConfig, shortenedFilename, isFileSizeValid, error, SnackBMsg } from '../../helpers';


interface MatchPropsMerchant extends match {
  params: {
    product_number: number
  }
}

type FuncWithRequest = (req: AxiosStatic) => A
type FuncWithRequestAndOpts = (req: AxiosStatic, opts: AxiosRequestConfig) => A
type HandleChangeOrders = (e: any, sp: number, req: AxiosStatic) => A
type Omit<T, K extends keyof T> = { [P in Exclude<keyof T, K>]: T[P] }

export interface ValidationFormProps extends RouteComponentProps, Omit<ProductsState, 'data'> {
  login: Function
  value: string | number
  clearErrorsLogin: Function
  togglePMForm: () => A
  showPMForm: boolean
  data?: object | ChangePasswordData | any[]
  state: ChangePasswordState
  showCPModal: boolean
  isDisabled: boolean
  bannerPath: string
  shopName: string
  labelWidth: number
  errors: any
  isDrawerOpen: boolean
  deleteCB: (request: AxiosStatic, prod_id: number, image: string) => A
  orders: Pagination
  orderEarnings: Pagination
  match: MatchPropsMerchant
  handleToggleModal: () => A
  clearErrorsEP: () => A
  clearErrorsPaymentDetails: () => A
  handleChange: (event: any, value: string) => A
  changeSelectLabelWidth: (width: number) => A
  requestProducts: FuncWithRequest
  paymentDSubmit: FuncWithRequestAndOpts
  handleSubmit: FuncWithRequest
  requestOrders: FuncWithRequest
  requestOrderEarnings: FuncWithRequest
  requestToEditProduct: FuncWithRequest
  handleChangePageOrders: HandleChangeOrders
  handleChangePageOrderE: HandleChangeOrders
  cpSubmitCallback: (request: AxiosStatic, data: ChangePasswordData) => A
  requestProductDetails: (request: AxiosStatic, product_number: number, shopName: string) => A
  [rest: string]: any
}





export interface ValidationFormState {
  snackBarProps?: any
  showModal?: boolean
  value?: number
  ordersData?: any[]
  ordersEarningsData?: any[]
  data?: any
  errors?: any
  fileInputLabels?: any
  files?: any

}



class ValidationForm extends Component<ValidationFormProps, ValidationFormState> {

  _isMounted: boolean = false;
  request: AxiosStatic = axios;
  cancelToken: CancelTokenSource = this.request.CancelToken.source();


  callApiForData?: Function
  executeSomeFunc?: Function
  unMountFunc?: Function
  schema?: SchemaLike

  componentDidMount(): void {
    this._isMounted = true;
    this.request = axiosConfig(this, dispatch);
    this.cancelToken = this.request.CancelToken.source();
    if (typeof this.callApiForData === 'function') {
      this.callApiForData();
    }
    if (typeof this.executeSomeFunc === 'function') {
      this.executeSomeFunc();
    }
  }



  componentWillUnmount(): void {
    this.cancelToken.cancel("canceled");
    //clearTimeout(this.delayModal);
    if (typeof this.unMountFunc === 'function') {
      this.unMountFunc()
    }
    this._isMounted = false;
  }







  handleCloseSnackBar = (): void => {
    this.setState(state => ({
      ...state,
      snackBarProps: {
        ...this.state.snackBarProps,
        open: false,
      }
    }))
  }


  setSnackbarProps = (message: string, variant: string): void => {
    this.setState(state => ({
      ...state,
      snackBarProps: {
        open: true,
        variant,
        message
      }
    }))
  }

  handleChangeModal = (callback: () => { return }) => {
    if (callback) {
      this.setState(state => ({ showModal: !state.showModal }), callback)
    } else {
      this.setState({ showModal: !this.state.showModal })
    }
  }


  handleValidation = (): boolean => {
    const errors = {};
    const { error } = validate(this.state.data, this.schema, { abortEarly: false })
    if (error) {
      for (const e of error.details) {
        errors[e.path[0]] = e.message;
      }
    }
    return Object.keys(errors).length ? true : false;
  }

  validateInput = (id: string, value: string) => {
    const schema = { [id]: value };
    const { error } = validate(schema, { [id]: this.schema[id] })
    return error ? error.details[0].message : '';
  }

  handleStateChange = (id: string, value: string, error: string) => {

    this.setState(state => ({
      ...state,
      data: {
        ...state.data,
        [id]: value
      },
      errors: {
        ...state.errors,
        [id]: error
      }
    }))

  }


  handleChange = ({ target: { value, id, name } }, val?: number | string) => {
    const hasId = id ? id : name;
    const error = this.validateInput(hasId, value);
    this.handleStateChange(hasId, value, error);
  }


  handleFileChange = ({ target: { files, id } }) => {

    if (files && files[0]) {
      const { isAllowed, name } = <IsFileAllowedResult>isFileAllowed(files);
      if (isAllowed) {
        if (isFileSizeValid(files[0].size)) {
          this.setState(state => ({
            ...state,
            fileInputLabels: {
              ...this.state.fileInputLabels,
              [id]: shortenedFilename(name)
            },
            files: {
              ...this.state.files,
              [id]: files[0]
            }
          }))
        } else {
          dispatch(toggleSnackBar(error, SnackBMsg(12)));
        }
      } else {
        dispatch(toggleSnackBar(error, SnackBMsg(5)));
      }
    }
  }


}



export default ValidationForm;