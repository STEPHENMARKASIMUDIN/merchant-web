import currency from 'currency.js';
import { auth_login } from '../store/actions/login/loginActions';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';
import { format, getDaysInMonth } from 'date-fns';
import { toggleLoadingModal, toggleSnackBar } from '../store/actions/actionHelpers';
import { AddProductState, MLShopMerchantState } from './reducersState';
import axios, { CancelToken, AxiosRequestConfig, AxiosStatic } from 'axios';
import { Context, IsFileAllowedResult, AddOptionsData, AddOptionsState, GetNewOptionsType, GetNewOptionsOpts, Limits, S, A, MLShopMerchantApiResponse } from './merchantTypes';


const success = 'success';
const error = 'error';
const warning = 'warning';
const info = 'info';
const defaultSnackB = 'default';
const pathsWithoutToken = ['register', 'login', 'resetpassword'];
const infoMessages: string[] = ['Waiting for ML Shop Admin approval', 'No Orders found.'];
const API_URL = 'http://192.168.12.4:6001/mlshopmerchant/route/';

/**
 * Dispatches an Action that Toggles the Modal if the Component is Mounted.
 * @param context the value of "this" inside a Component
 * @param dispatch function that dispatches an action to the store
 */
const ifMountedToggleLoading = (context: Context, dispatch: Dispatch) => {
  if (context._isMounted) {
    dispatch(toggleLoadingModal())
  }
}



const axiosConfig = (context: Context, dispatch: Dispatch): AxiosStatic => {
  axios.interceptors.request.use((config) => {
    if (!pathsWithoutToken.includes(config.url.toLowerCase())) {
      config = { ...config, headers: { ...config.headers, Authorization: `Bearer ${localStorage.getItem('token')}` } }
    }
    console.log(config);
    console.log(config.url);
    return ifMountedToggleLoading(context, dispatch), config;
  }, (e) => {
    return ifMountedToggleLoading(context, dispatch), Promise.reject(e);
  });
  axios.interceptors.response.use((resp) => {
    return ifMountedToggleLoading(context, dispatch), resp;
  }, (e) => {
    //log error to api
    return ifMountedToggleLoading(context, dispatch), Promise.reject(e);
  });
  //axios.defaults.baseURL = 'http://192.168.17.7:6001/mlshopmerchant/route/'
  axios.defaults.baseURL = API_URL;
  //axios.defaults.baseURL = 'http://mlpartnersapipv.mlhuillier1.com:6001/mlshopmerchant/route/';
  return axios;
}







const reqOptions = (path: string, type: string, data: any, cancelToken?: CancelToken, headers?: any): AxiosRequestConfig => {
  let d;
  if (data.__proto__.toString() === '[object FormData]') {
    d = data;
  } else {
    d = { ...data }
  }
  return {
    url: path,
    method: type,
    [type.toLowerCase() === 'get' ? 'params' : 'data']: d,
    headers: headers ? headers : null,
    cancelToken: cancelToken ? cancelToken : null
  }
}



const request = (options: AxiosRequestConfig) => axios(options);

const ls = window.localStorage;

const numTestRegex = (e: any, char: string, pattern: RegExp = /[0-9]/): boolean => {
  const isValid = pattern.test(char);
  if (isValid) {
    return true;
  } else {
    e.preventDefault();;
  }
}

const onlyAllowDigits = (e: any): boolean => {
  let char = '';
  if (e.key) {
    char = e.key;
  } else if (e.charCode) {
    char = String.fromCharCode(e.charCode);
  }
  return numTestRegex(e, char);
};

const onlyMoney = (e: any): boolean => {
  let char = e.key, value: string = e.target.value;
  if (char == '.' && value.includes('.')) {
    return e.preventDefault();
  } else {
    return numTestRegex(e, char, /[0-9.]/);
  }
}


const disableCopyP = (e: any): boolean => {
  let text = e.clipboardData.getData('text/plain');
  if (/[0-9]/.test(text)) {
    return true;
  } else {
    e.preventDefault();
  }
};



/**
 * Shortens a string by adding "..." if the length is greater than 20.
 * 
 * @example 
 * 
 * shortenedFilename("some_file_name") -> "some_file_name";
 * 
 * shortenedFilename("some_file_longer_name") -> "some_file_longe..";
 * 
 * shortenedFilename() -> "Unknown file name";
 * 
 * 
 * @param fileName 
 */
const shortenedFilename = (fileName: string): string => {
  if (!fileName) {
    return "Unknown file name";
  }
  else if (isLengthValid(fileName, 20)) {
    return fileName;
  } else {
    return fileName.substring(0, 15) + '...';
  }
}





const isFileAllowed = (files: File[] | FileList): IsFileAllowedResult | boolean => {
  const exts = ['jpg', 'jpeg', 'png', 'pdf', 'docx'];
  if (!files) {
    return false;
  } else {
    const { name } = files[0];
    const i = name.lastIndexOf('.');
    const filename = name.substring(0, i);
    const ext = name.substring(i + 1);
    if (exts.includes(ext)) {
      return { isAllowed: true, name: filename, ext }
    } else {
      return { isAllowed: false, name: '' }
    }
  }
};



/**
 * Tests if the filesize in bytes is valid or not.
 * 
 * 
 * @example
 * 
 * isFileSizeValid(900) -> true
 * 
 * isFileSizeValid(5008) -> false
 * 
 * isFileSizeValid(1024) -> true
 * 
 * @param bytes value of bytes to be calculated.
 */
const isFileSizeValid = (bytes: number): boolean => {
  const sizeToKB = bytes / 1024;
  if (sizeToKB > 1024) {
    return false;
  } else {
    return true;
  }
}

const isItemAvailable = <T>(item: T, addIcon?: boolean): any => {
  return item ? (addIcon ? `${addIcon} ${item}` : item) : 'N/A';
}



const toCurrency = (item: any, withSymbol = true): string => {
  return isItemAvailable(item) === 'N/A' ? `${!withSymbol ? '' : '₱'}${currency('0').toString()}` :
    `${!withSymbol ? '' : '₱'}${currency(item, { decimal: '2' }).toString()}`;
}



/**
 * Tests if the length of the product_name is valid base on the length argument.
 * 
 * 
 * @example
 * 
 * isLengthValid("some_product_name") -> false
 * 
 * isLengthValid("some_product_name", 20) -> true
 * 
 * isLengthValid() -> true
 * 
 * @param product_name name of the product
 * @param length compares the length of the product_name to this - defaults to 10
 * 
 */
const isLengthValid = (product_name: string, length = 10): boolean => {
  if (!product_name) {
    return true;
  } else {
    if (typeof product_name == 'string') {
      if (product_name.length > length) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}





const countries: string[] = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia",
  "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "British Virgin Islands", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Cape Verde",
  "Cayman Islands", "Chad", "Chile", "China",
  "Colombia", "Congo", "Cook Islands", "Costa Rica",
  "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia",
  "Falkland Islands", "Faroe Islands", "Fiji", "Finland",
  "France", "French Polynesia", "French West Indies",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Gibraltar", "Greece", "Greenland", "Grenada",
  "Guam", "Guatemala", "Guernsey", "Guinea",
  "Guinea Bissau", "Guyana", "Haiti", "Honduras",
  "Hong Kong", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland",
  "Isle of Man", "Israel", "Italy", "Jamaica",
  "Japan", "Jersey", "Jordan", "Kazakhstan",
  "Kenya", "Kuwait", "Kyrgyz Republic", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg",
  "Macau", "Macedonia", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta",
  "Mauritania", "Mauritius", "Mexico", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Montserrat",
  "Morocco", "Mozambique", "Namibia",
  "Nepal", "Netherlands", "Netherlands Antilles",
  "New Caledonia", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "Norway",
  "Oman", "Pakistan", "Palestine", "Panama",
  "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal",
  "Puerto Rico", "Qatar", "Reunion",
  "Romania", "Russia", "Rwanda",
  "Saint Pierre and Miquelon",
  "Samoa", "San Marino",
  "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia",
  "South Africa", "South Korea", "Spain",
  "Sri Lanka", "St Kitts and Nevis",
  "St Lucia", "St Vincent", "St. Lucia",
  "Sudan", "Suriname", "Swaziland", "Sweden",
  "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand",
  "Timor L'Este", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Turks and Caicos",
  "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam", "Virgin Islands (US)",
  "Yemen", "Zambia", "Zimbabwe"];

const formatAndConvertToDate = (dateTime: string | number | Date, dateFormat = 'YYYY-MM-dd'): string => {
  if (!dateTime) {
    return 'N/A';
  }
  return format(dateTime, dateFormat, { awareOfUnicodeTokens: true });
};


const getDateAndTime = (getCovered = false): string => {
  const d = new Date();
  if (!getCovered) {
    return formatAndConvertToDate(d, 'LLLL dd, YYYY');
  } else {
    return formatAndConvertToDate(d, `LLLL 01 - ${getDaysInMonth(d)}, YYYY`)
  }
}


/**
 * 
 * @param {*} num 
 * Snackbar Messages
 * 
 * 0 - The system encountered some technical problem. Sorry for the inconvenience.
 * 
 * 
 * 1 - The network connection is lost.
 * 
 * 
 * 3 - Invalid Date.
 * 
 * 
 * 4- File size is too big. File Size limit is 1MB.
 * 
 * 
 * 5 - Invalid File Extension.
 * 
 * 
 * 6 - "From" Date must be before or equal to "To" Date
 * 
 * 
 * 7 - "To" Date must be after or equal to "From" Date
 * 
 * 
 * 8 - Success. Email Sent with new Password.
 * 
 * 
 * 9 - Payment Details Successfully Saved.
 * 
 * 
 * 10 - Successfully Edited Account Information.
 * 
 * 
 * 11 - Please Choose an Image to Upload.
 * 
 * 
 * 12 - File size is too big. File Size limit is 1MB.
 * 
 * 
 * 13 - Successfully Updated Profile Image.
 * 
 * 
 * 14 - Successfully Updated Profile Banner.
 * 
 * 
 * 15 - The system encountered some technical problem. Sorry for the inconvenience.
 * 
 * 
 * 16 - Product Successfully Deleted.
 * 
 * 
 * 17 - Please Provide your Current Password.
 * 
 * 
 * 18 - New Password and Confirm Password does not match.
 * 
 * 
 * 19 - New Password length must be at least 5 characters.
 * 
 * 
 * 20 - Password Successfully Changed.
 * 
 * 
 * 21 - Successfully Edited Variant.
 * 
 * 
 * 22 - Compare Price must be greater than Price!
 * 
 * 
 * 23 - Added New Variant Image(s).
 * 
 * 
 * 24 - Variant Image Successfully Deleted.
 * 
 * 
 * 25 - Product Successfully Updated.
 * 
 * 
 * 26 - Please upload main image first.
 * 
 * 
 * 27 - Please choose a valid option first.
 * 
 * 
 * 28 - Successfully Added New Product.
 */

const SnackBMsg = (num: number): string => {

  const messages = {
    0: 'The system encountered some technical problem. Sorry for the inconvenience.',
    1: 'The network connection is lost.',
    3: 'Invalid Date.',
    4: 'File size is too big. File Size limit is 1MB.',
    5: 'Invalid File Extension.',
    6: '"From" Date must be before or equal to "To" Date',
    7: '"To" Date must be after or equal to "From" Date',
    8: 'Success. Email Sent with new Password.',
    9: 'Payment Details Successfully Saved.',
    10: 'Successfully Edited Account Information.',
    11: 'Please Choose an Image to Upload.',
    12: 'File size is too big. File Size limit is 1MB.',
    13: 'Successfully Updated Profile Image.',
    14: 'Successfully Updated Profile Banner.',
    15: 'The system encountered some technical problem. Sorry for the inconvenience.',
    16: 'Product Successfully Deleted.',
    17: 'Please Provide your Current Password.',
    18: 'New Password and Confirm Password does not match.',
    19: 'New Password length must be at least 5 characters.',
    20: 'Password Successfully Changed.',
    21: 'Successfully Edited Variant.',
    22: 'Compare Price must be greater than Price!',
    23: 'Added New Variant Image(s).',
    24: 'Variant Image Successfully Deleted.',
    25: 'Product Successfully Updated.',
    26: 'Please upload main image first.',
    27: 'Please choose a valid option first.',
    28: 'Successfully Added New Product.'
  }

  return messages[num] ? messages[num] : messages[15];
};


const getLimits = (page: number): Limits => {
  const defaultLimit = {
    from: 0,
    to: 15
  };
  if (page === 1 || page === 0) {
    return defaultLimit;
  } else {

    const newTo = page * defaultLimit.to;
    const newFrom = newTo - 15;
    return {
      from: newFrom,
      to: newTo
    }

  }
};


const dispatchCode = (ResCode: number) => ResCode === 200 ? 200 : defaultSnackB


const filterTags = (product_tags: string, action: AnyAction): string => {
  return product_tags.split(',').filter((tag, index) => {
    if (action.payload.i !== index) {
      return tag;
    }
  }).join(',');
}


const addNewProductTags = (state: AddProductState, action: AnyAction): string => {
  switch (action.payload.optionName) {
    case 'optionValue0':
      return [...state.data.optionValue0.split(','), action.payload.data].filter(item => item).join(',');
    case 'optionValue1':
      return [...state.data.optionValue1.split(','), action.payload.data].filter(item => item).join(',');
    default:
      return [...state.data.optionValue2.split(','), action.payload.data].filter(item => item).join(',');
  }
}



const calcClassAddBtn = (uploadBtns: any[]): string => {
  let classAddBtn = '';
  if (uploadBtns.length === 4) {
    classAddBtn = 'd-none';
  }
  return classAddBtn;
};


const getNewOptions = (state: AddOptionsState, type: GetNewOptionsType, options: GetNewOptionsOpts): AddOptionsData[][] => {
  let opts1: AddOptionsData[] = [...state.opts1], opts2: AddOptionsData[] = [...state.opts2], value: string = '';
  switch (type) {
    case "ADD_ANOTHER_OPTION":
      if (options.otherOptions.length === 1) {
        opts1 = filterOptions(state, 'opts1');
      } else {
        opts2 = filterOptions(state, 'opts2'); opts1 = [...state.opts1];
      }
      return [opts1, opts2]
    case "ADD_OPTION_ON_SELECT_CHANGE":
      value = options.action.payload.value;
      switch (options.action.payload.name) {
        case "selectValue":
          //opts2 = filterOptions(state, 'opts2', value);
          opts2 = [...state.opts2],
            opts1 = filterOptions(state, 'opts1', value);
          break;
        case "selectValue1":
          opts2 = filterOptions(state, 'opts2', value), opts1 = [...state.opts1];
          break;
        default:
          opts2 = [...state.opts2], opts1 = [...state.opts1];
          break;
      }
      return [opts1, opts2]
    default:
      return [opts1, opts2];
  }
}


const filterOptions = (state: AddOptionsState, type: 'opts1' | 'opts2', value?: string): AddOptionsData[] => {
  let valuee = value ? value : state.selectValue;
  switch (type) {
    case "opts1":
      return state.opts.filter((val, i) => val.value !== valuee);
    case "opts2":
      return state.opts.filter((val, i) => val.value !== state.selectValue1 && val.value !== valuee);
    default:
      return state.opts;
  }
};


const enhancedLog = (logLabel: string, ...args: any[]): void => {
  console.group(logLabel);
  for (const item of args) {
    console.dir(item);
  }
  console.groupEnd();
}


const getSnackBVariant = (message: string): 'error' | 'info' => {
  return infoMessages.includes(message) ? info : error;
};


const requestCatchHandler = async (request: AxiosStatic, e: Error, dispatch: ThunkDispatch<MLShopMerchantState, S, A>, messageOccurred: string) => {
  try {
    if (e.message === 'Network Error') {
      dispatch(toggleSnackBar(error, SnackBMsg(1)))
      return;
    }
    dispatch(toggleSnackBar(error, SnackBMsg(0)));
    const opts: AxiosRequestConfig = reqOptions('loggerUI', 'post', { messageOccurred, reason: e.message, info: e.stack });
    const { data }: MLShopMerchantApiResponse = await request(opts);
    switch (data.ResponseCode) {
      case 200:
        console.log(`Successfully log error to service.`);
        break;
      default:
        console.log(`Cant log error to service. Something went wrong.`);
        break;
    }
  } catch (err) {
    console.log(err);
    console.log(`Cant log error to service. Something went wrong.`);
  }
}


const requestUserData = async (request: AxiosStatic, routeProps: RouteComponentProps, callback: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        routeProps.history.push('/');
      } else {
        const opts: AxiosRequestConfig = reqOptions('getUserData', 'get', {}, null, {
          Authorization: `Bearer ${token}`
        })
        const { data }: MLShopMerchantApiResponse = await request(opts)
        switch (data.ResponseCode) {
          case 200:
            dispatch(auth_login(data.merchant_details));
            callback();
            break;
          default:
            dispatch(toggleSnackBar(getSnackBVariant(data.ResponseMessage), data.ResponseMessage));
            setTimeout(() => {
              routeProps.history.push('/');
            }, 1500);
            break;
        }
      }
    } catch (e) {
      console.log(`${e.message} at requestUserData()`);
      dispatch(toggleSnackBar('error', `${SnackBMsg(15).substring(0, 46)} Please Login Again.`));
      routeProps.history.push('/');
    }
  }
}


/**
 * Saves the current path or location of a component to the localStorage
 * @param routeProps 
 */
const setLocation = (routeProps: RouteComponentProps) => {
  let path: string = "";
  try {
    path = routeProps.match.url !== '/' ? routeProps.match.url : '/';
    localStorage.setItem('loc', path);
  } catch (e) {
    console.log(e);
    localStorage.setItem('loc', "/");
  }
}

export {
  ls,
  info,
  error,
  API_URL,
  warning,
  success,
  request,
  countries,
  getLimits,
  SnackBMsg,
  onlyMoney,
  toCurrency,
  filterTags,
  reqOptions,
  setLocation,
  enhancedLog,
  axiosConfig,
  dispatchCode,
  disableCopyP,
  isLengthValid,
  getNewOptions,
  isFileAllowed,
  defaultSnackB,
  getDateAndTime,
  isFileSizeValid,
  isItemAvailable,
  onlyAllowDigits,
  calcClassAddBtn,
  requestUserData,
  getSnackBVariant,
  shortenedFilename,
  addNewProductTags,
  requestCatchHandler,
  formatAndConvertToDate,
}