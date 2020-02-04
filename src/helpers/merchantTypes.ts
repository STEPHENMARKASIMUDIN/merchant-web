import { AnyAction } from "redux";
import { AxiosStatic } from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export interface MLShopMerchantApiResponse {
  data: {
    ResponseCode: number
    ResponseMessage: string
    data?: any
    merchant_details?: any
  }
}


export interface Limits {
  from: number
  to: number
}



export interface R {

}
export interface S {

}

export interface A {
  type: string
  [propname: string]: any
}

export interface T {

}


export interface AuthHOCState {
  isExpired: boolean
  timeout: number
  token: string | null
  isAuthenticated: boolean
}




export type InputVariant = "outlined" | "filled" | "standard";
export type Size = "large" | "small";


export interface InputFormMoneyProps {
  label: string
  value: string | number
  size?: Size
  withSymbol?: boolean
  isDisabled?: boolean
  isAutoFocus?: boolean
  InputPropsClasses?: string
  name?: string
  errors?: object
  formatValue?: boolean
  [propName: string]: any
}

export interface MerchantFormFieldProps {
  label?: string
  name?: string
  handleChange?: any
  Icon?: any
  isEmail?: boolean
  IconProps?: any
  InputProps?: {
    inputPropsClasses?: string
    maxLength?: number
    minLength?: number
    inputPropsStyle?: object
  },
  error: any
  IsPassword?: boolean
  passwordProps?: {
    showPassword: boolean
    handleShowPassword: any
  },
  isText?: boolean
  isSmall?: boolean
  isShrink?: boolean
  isNormal?: boolean
  allowDigitsOnly?: boolean
  disableCopyPaste?: boolean
  allowMoneyFormat?: boolean
  classes?: string
  variant?: any
  disabled?: boolean
  convertToMoney?: boolean
  value?: string | number
  [propName: string]: any;
}




export interface Context {
  _isMounted: boolean
}

export interface IsFileAllowedResult {
  isAllowed: boolean
  name: string
  ext?: string
}


export interface AddOptionsState {
  opts: AddOptionsData[]
  selectValue: string
  selectValue1: string
  selectValue2: string
  otherOptions: any[]
  opts1: AddOptionsData[]
  opts2: AddOptionsData[]
  addOptionClasses: string
}

export interface AddOptionsData {
  label: string
  value: string
}


export interface OptsData {
  opt_name: string
  opt_value: string
}



export interface MerchantFormProps {
  isOutlined?: boolean
  isRequired?: boolean
  isSmall?: boolean
  name: string
  label?: string
  value: string
  onChange: any
  classes?: string
  error: object
}


export interface MerchantData {
  merchant_id: number
  seller_name: string
  city: string
  contact_number: string | number
  country: string
  orders: number
  products: number
  email: string
  shop_name: string
  status: string
  zipcode: string | number
  store_address: string
  store_description: string
  store_details: string
  store_policies: string
  password: string
  current_password: string
}


export type GetNewOptionsType = 'ADD_OPTION_ON_SELECT_CHANGE' | 'ADD_ANOTHER_OPTION';

export type ReportType = 'GET_DAILY_SALES_REPORT_DATA' | 'GET_MONTHLY_SALES_REPORT_DATA' | 'GET_PRODUCT_INVENTORY_REPORT_DATA' | 'GET_MONTHLY_REPORT_DATA';

export type RequestReportsDataOpts = {
  type: ReportType
  request: AxiosStatic
  dispatch: ThunkDispatch<S, R, A>
  url: string
  props: any
  path: string
  params: any
}
export interface GetNewOptionsOpts {
  otherOptions?: number[]
  action?: AnyAction
}

export interface AddProductFiles {
  inputID: string
  file: File[]
}