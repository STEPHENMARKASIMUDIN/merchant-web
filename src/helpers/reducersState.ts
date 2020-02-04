import { MerchantData } from './merchantTypes';

export interface LoginState {
  data: {
    email: string
    password: string
  },
  errors: {
    email: string
    password: string
  }
  showPassword: boolean,
  isDisabled?: boolean
}

export interface AuthState {
  loginErr: {
    hasError: boolean,
    message: string
  },
  isAuth: boolean
}


export interface AddProductState {
  data: {
    product_name: string
    product_type: string
    description: string
    product_tags: string
    weight: string
    price: string
    comp_at_price: string
    compare_at_price?: string
    product_id?: number
    sku: string
    barcode: string
    quantity: string
    optionValue0?: string
    optionValue1?: string
    optionValue2?: string
  },
  errors: {
    product_name: string
    product_type: string
    description: string
    product_tags: string
    weight: string
    price: string
    comp_at_price: string
    compare_at_price?: string
    product_id?: number
    sku: string
    barcode: string
    quantity: string
    optionValue0?: string
    optionValue1?: string
    optionValue2?: string
  },
  isDisabled?: boolean,
  labelWidth?: number
}


export interface DashboardState {
  Recent_Orders: any[],
  Order_Earnings: number
};


export interface DateState {
  data: {
    from: string
    to: string
  },
  errors: {
    from: string
    to: string
  }
}

export interface ImageState {
  bannerPath: string
  profilePath: string
}

export interface MerchantDataState {
  merchantData: MerchantData
}


export interface MyAccountState {
  data: {
    seller_name: string
    zipcode: string
    city: string
    country: string
    contact_number: string
    store_address: string
    store_description: string
    store_details: string
    store_policies: string
  },
  errors: {
    seller_name: string
    store_address: string
    city: string
    country: string
    contact_number: string
    store_description: string
    store_details: string
    store_policies: string
    zipcode: string
  },
  isDisabled?: boolean
}


export interface ToggleComponentState {
  showEditInfo: boolean
  showDrawer: boolean
  isAppMounted: boolean
  isDarkTheme : boolean
}


export interface SignupData {
  seller_name: string
  shop_name: string
  email: string
  password: string
  store_address: string
  city: string
  zipcode: string
  country: string
  contact_number: string
  store_description: string
}


export interface FileInputLabel {
  label: string
  ext: string
}


export interface ReportsState {
  monthlySales: any[],
  dailySales: any[],
  daily: any[],
  monthly: any[],
  data: {
    monthlysalesdate: Date
    dailysalesdate: Date
    daily: Date
    monthly: Date
  }
}

export interface SignupState {
  data: SignupData
  errors: SignupData
  showPassword: boolean
  isDisabled?: boolean
  fileInputLabels: {
    business_permit: FileInputLabel
    brgy_clearance: FileInputLabel
    police_clearance: FileInputLabel
    valid_id: FileInputLabel
  }
  files: {
    business_permit: File | null,
    brgy_clearance: File | null,
    police_clearance: File | null,
    valid_id: File | null
  }
}


export interface PopUpsState {
  showModal: boolean
  showAlert: boolean
  showPopUpLogout: boolean
  showNavUp: boolean
  showVariantModal: boolean
  showAddImageModal: boolean
  snackBarProps: {
    message: string
    variant: string
    open: boolean
  }
}


export interface ProductsState extends Pagination {
  prodDetails: {
    Product_Details: ProductDetails
    Product_Variant: ProductVariant[]
  },
  currentProductVariant: {
    data: ProductVariant
    errors: ProductVariant
    isDisabled: boolean
  }
}

export interface ProductDetailsImages {
  imagePath: string
  id: number
  image: string
}



export interface ProductDetails {
  image_id: any[]
  product_id: string
  product_name: string
  product_type: string
  product_tags: string
  description: string
  status: string
  images: any[]
  imagesDetails: ProductDetailsImages[]
}

export interface ProductVariant {
  variant_id: string
  images: string
  variant_title: string
  sku: string
  barcode: string
  compare_at_price: number | string
  price: number | string
  weight: number | string
  quantity: number | string
  requires_shipping: number | string
  taxable: number | string
}



export interface PaymentDetailsData {
  bank_name: string
  account_number: string
  cardholder_name: string
  sort_code: string
  other_info: string
  payment_method: string
}

export interface PaymentDetailsState {
  data: PaymentDetailsData
  errors: PaymentDetailsData
  isDisabled?: boolean,
  showPaymentDetailsForm: boolean,
  labelWidth: Number
}



export interface ChangePasswordData {
  current_password?: string
  new_password?: string
  confirm_password?: string
}

export interface ResetPasswordData {
  email: string
  contact_number: string
}


export interface ChangePasswordState {
  current_password?: boolean
  new_password?: boolean
  confirm_password?: boolean
  data: ChangePasswordData
  errors: ChangePasswordData
  isDisabled?: boolean
  showCPModal?: boolean
}

export interface ResetPasswordState {
  data: ResetPasswordData
  errors: ResetPasswordData
  isDisabled?: boolean
}


export interface PasswordState {
  changePassword: ChangePasswordState
  resetPassword: ResetPasswordState
  isFocus: boolean
}


export interface Pagination {
  data: any[]
  paginationData: any[]
  page: number
  rowsPerPage: number
  [propName: string]: any
}

export interface LineItems {
  id: string
  variant_id: string
  title: string
  quantity: number
  price: number
  sku: string
  variant_title: string
  vendor: string
  fulfillment_service: string
  product_id: string
  requires_shipping: number
  taxable: number
  gift_card: number
  name: string
  variant_inventory_management: null,
  product_exists: number
  fulfillable_quantity: null,
  grams: number
  total_discount: number
  fulfillment_status: string
}



export interface OrdersState {
  orders: Pagination
  orderEarnings: Pagination
  orderInvoiceData: OrderInvoiceData
  orderDetails: OrderDetailsData
}


export interface OrderInvoiceData {
  invoice_number: string
  order_id: string
  orderno: string
  product_number: number
  product_name: string
  quantity: number
  price: number
  sku: string
  delivery_method: string
  order_total: number
  line_items: LineItems[]
  fulfillments: any[],
  tags: string | null,
  total_price_usd: number
  subtotal_price: number
  total_line_items_price: number
  total_shipping: number
  total_price: number
  total_tax: number
  invoice_date: string
  customer_name: string
  customer_address: string
  email: string
  customer_phone: string
  shipping_city: string
  shipping_address: string
  shipping_lines: any[],
  shipping_postal_code: number
  shipping_company: string
  shipping_contact: string
  shipping_country: string
  shipping_province: string
  billing_city: string
  billing_address: string
  billing_postal_code: number
  billing_company: string
  billing_contact: string
  billing_country: null,
  billing_province: string
  payment_mode: string
  payment_status: string
  fulfillment_status: string
  created_at: string
  seller_address: string
  seller_contact: string
  seller_email: string
  shopName: string
}

export interface OrderDetailsData {
  invoice_number: string
  order_id: string
  orderno: string
  product_number: string
  product_name: string
  quantity: number
  price: number
  sku: string
  delivery_method: string
  order_total: number
  line_items: any[]
  tags: string
  total_price_usd: number
  total_shipping: number
  total_price: number
  total_tax: number
  invoice_date: string
  customer_name: string
  customer_address: string
  customer_phone: string
  email: string
  shipping_city: string
  shipping_address: string
  shipping_lines: any[]
  shipping_postal_code: number
  shipping_company: string
  shipping_contact: string
  shipping_country: string
  shipping_province: string
  billing_city: string
  billing_address: string
  billing_postal_code: number
  billing_company: string
  billing_country: string
  billing_province: string
  payment_mode: string
  payment_status: string
  fulfillment_status: string
  created_at: string
}



export type UpdateStateData
  = ResetPasswordState | ChangePasswordState | PaymentDetailsState | SignupState
  | AddProductState | LoginState


// export type MLShopMerchantState
//   = LoginState & AddProductState & DashboardState & DateState & ImageState
//   & MerchantDataState & MyAccountState & ToggleComponentState & SignupData
//   & ReportsState & SignupState & PopUpsState & ProductsState & PaymentDetailsState
//   & PasswordState & OrdersState


export interface MLShopMerchantState {
  login: LoginState
  signup: SignupState
  auth: AuthState
  date: DateState
  image: ImageState
  merchant_details: MerchantDataState
  toggle: ToggleComponentState
  popUps: PopUpsState
  pass: PasswordState
  orders: OrdersState
  products: ProductsState
  myAcc: MyAccountState
  paymentD: PaymentDetailsState
  dashB: DashboardState
  addProd: AddProductState
  reports: ReportsState
  editProd: AddProductState
}