import { Reducer } from 'redux';
import { OrdersState } from '../../helpers/reducersState';
import { UPDATE_CURRENT_ORDERS, UPDATE_CURRENT_ORDER_EARNINGS, UPDATE_ORDER_DETAILS, UPDATE_ORDER_INVOICE_DATA, LOGOUT_USER } from '../actionTypes';


const initState = {
  orders: {
    data: [],
    paginationData: [],
    page: 0,
    rowsPerPage: 15,
    ordersCount: 0,
  },
  orderEarnings: {
    data: [],
    paginationData: [],
    page: 0,
    rowsPerPage: 15,
    orderEarningsCount: 0,
  },
  orderInvoiceData: {
    "invoice_number": "",
    "order_id": "",
    "orderno": "",
    "product_number": 0,
    "product_name": "",
    "quantity": 0,
    "price": 0,
    "sku": "",
    "delivery_method": "",
    "order_total": 0,
    "line_items": [
      {
        "id": "",
        "variant_id": "",
        "title": "",
        "quantity": 1,
        "price": 1,
        "sku": "",
        "variant_title": "",
        "vendor": "",
        "fulfillment_service": "",
        "product_id": "",
        "requires_shipping": 0,
        "taxable": 0,
        "gift_card": 0,
        "name": "",
        "variant_inventory_management": null,
        "product_exists": 0,
        "fulfillable_quantity": null,
        "grams": 0,
        "total_discount": 0,
        "fulfillment_status": ""
      }
    ],
    "fulfillments": [],
    "tags": null,
    "total_price_usd": 0,
    "subtotal_price": 0,
    "total_line_items_price": 0,
    "total_shipping": 0,
    "total_price": 0,
    "total_tax": 0,
    "invoice_date": "",
    "customer_name": "",
    "customer_address": "",
    "email": "",
    "customer_phone": "",
    "shipping_city": "",
    "shipping_address": "",
    "shipping_lines": [],
    "shipping_postal_code": 0,
    "shipping_company": "",
    "shipping_contact": "",
    "shipping_country": "",
    "shipping_province": "",
    "billing_city": "",
    "billing_address": "",
    "billing_postal_code": 0,
    "billing_company": "",
    "billing_contact": "",
    "billing_country": null,
    "billing_province": "",
    "payment_mode": "",
    "payment_status": "",
    "fulfillment_status": "",
    "created_at": "",
    "seller_address": "",
    "seller_contact": "",
    "seller_email": "",
    "shopName": ""
  },
  orderDetails: {
    invoice_number: "",
    order_id: "",
    orderno: "",
    product_number: "",
    product_name: "",
    quantity: 0,
    price: 0,
    sku: "",
    delivery_method: "",
    order_total: 0,
    line_items: [],
    tags: "",
    total_price_usd: 0,
    total_shipping: 0,
    total_price: 0,
    total_tax: 0,
    invoice_date: "",
    customer_name: "",
    customer_address: "",
    customer_phone: "",
    email: "",
    shipping_city: "",
    shipping_address: "",
    shipping_lines: [],
    shipping_postal_code: 0,
    shipping_company: "",
    shipping_contact: "",
    shipping_country: "",
    shipping_province: "",
    billing_city: "",
    billing_address: "",
    billing_postal_code: 0,
    billing_company: "",
    billing_country: "",
    billing_province: "",
    payment_mode: "",
    payment_status: "",
    fulfillment_status: "",
    created_at: ""
  }
}


const ordersReducer: Reducer = (state: OrdersState = initState, action): OrdersState => {

  switch (action.type) {
    case UPDATE_CURRENT_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          data: action.payload.data,
          paginationData: action.payload.paginationData,
          productsCount: action.payload.data.length,
          page: action.payload.page
        }
      }
    case UPDATE_CURRENT_ORDER_EARNINGS:
      return {
        ...state,
        orderEarnings: {
          ...state.orderEarnings,
          data: action.payload.data,
          paginationData: action.payload.paginationData,
          productsCount: action.payload.data.length,
          page: action.payload.page
        }
      }
    case UPDATE_ORDER_INVOICE_DATA:
      return {
        ...state,
        orderInvoiceData: {
          ...action.payload
        }
      }
    case UPDATE_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: {
          ...action.payload
        }
      }
    case LOGOUT_USER:
      return {
        ...initState,
      }
    default:
      return state;
  }
}

export default ordersReducer;