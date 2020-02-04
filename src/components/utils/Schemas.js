import Joi from 'joi';


function e(errors) {
  return {
    type: 'Not Valid',
    message: `Please provide a valid ${this._flags.label}`
  }
}



const email = Joi.string().email({ minDomainAtoms: 2 }).required().label('Email').error(e);
const contact_number = Joi.string().regex(/^\d{11}$/, { name: 'Contact Number' }).length(11).required().label('Contact Number').error(e);
const password = Joi.string().required().label('Password').error(e);
const zipcode = Joi.string().regex(/^\d{4,5}$/, { name: 'Zipcode' }).required().label('Zipcode').error(e);


export const schemaResetPassword = {
  email,
  contact_number
}


export const schemaLogin = {
  email,
  password
}




export const schemaPaymentDetails = {
  bank_name: Joi.string().min(3).required().label('Bank Name').error(e),
  account_number: Joi.string().alphanum().required().label('Account Number').error(e),
  cardholder_name: Joi.string().min(6).max(30).required().label('Cardholder Name').error(e),
  sort_code: Joi.string().required().label('Sort Code').error(e),
  payment_method: Joi.string().required().label('Payment Method').error(e),
  other_info: Joi.string().optional().label('Other Informations').allow([''])
}

export const schemaSignup = {
  seller_name: Joi.string().min(6).max(35).required().label('Seller Name').error(e),
  shop_name: Joi.string().min(6).max(35).required().label('Shop Name').error(e),
  email,
  password,
  store_address: Joi.string().max(200)
    .required().label('Store Address').error(e),
  city: Joi.string().required().label('City').error(e),
  zipcode,
  country: Joi.string().required().label('Country').error(e),
  contact_number,
  store_description: Joi.string().max(200).required().label('Short Store Description').error(e)
}

export const schemaChangePassword = {
  current_password: Joi.string().required().label('Current Password').error(e),
  new_password: Joi.string().required().label('New Password').error(e),
  confirm_password: Joi.string().required().label('New Password').error(e)
}

//



export const schemaDashboard = {
  from: Joi.date().example('2019-01-21').required().label('From'),
  to: Joi.date().example('2019-01-22').required().label('To'),
}

export const schemaEditInfo = {
  seller_name: Joi.string().required().label('Your Name').error(e),
  store_address: Joi.string().required().label('Store Address').error(e),
  city: Joi.string().required().label('City').error(e),
  country: Joi.string().required().label('Country').error(e),
  contact_number,
  store_description: Joi.string().optional().label('Store Description').allow(['', null]).error(e),
  store_details: Joi.string().optional().label('Detailed Store Description').allow(['', null]).error(e),
  store_policies: Joi.string().optional().label('Store Policies').allow(['', null]).error(e),
  zipcode
};



export const schemaVariant = {
  variant_title: Joi.string().required().label('Title').error(e),
  sku: Joi.string().required().label('SKU').error(e),
  barcode: Joi.string().required().label('Barcode').error(e),
  price: Joi.number().required().label('Price').error(e),
  compare_at_price: Joi.number().required().label('Compare at Price').error(e),
  weight: Joi.number().required().label('Weight').error(e),
  quantity: Joi.number().required().label('Quantity').error(e),
  requires_shipping: Joi.number().allow([0, 1]),
  taxable: Joi.number().allow([0, 1]),
  images: Joi.string().required().label('Images').allow([null, '']),
  variant_id: Joi.string().required().label('Variant ID').allow([null, ''])
}

export const schemaAddProduct = {
  product_name: Joi.string().required().label('Product Name').error(e),
  product_type: Joi.string().required().label('Product Type'),
  description: Joi.string().optional().label('Product Description').error(e),
  product_tags: Joi.string().required().label('Product Tags').error(e),
  weight: Joi.string().required().label('Weight').error(e),
  price: Joi.string().required().label('Price').error(e),
  comp_at_price: Joi.string().required().label('Compare at Price').error(e),
  sku: Joi.string().required().label('SKU').error(e),
  barcode: Joi.string().required().label('Barcode').error(e),
  quantity: Joi.string().required().label('Quantity').error(e)
};



