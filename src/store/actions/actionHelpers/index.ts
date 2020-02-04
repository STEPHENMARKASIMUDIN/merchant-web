import { slice } from 'lodash';
import { Limits } from './../../../helpers/merchantTypes';
import { A, T, S } from '../../../helpers/merchantTypes';
import { ThunkAction } from 'redux-thunk';
import { MLShopMerchantState } from '../../../helpers/reducersState';
import { validate, SchemaLike } from 'joi';
import { AxiosStatic, AxiosRequestConfig } from 'axios';
import { reqOptions, requestCatchHandler } from '../../../helpers';
import { Action, ActionCreator, AnyAction } from 'redux';
import { TOGGLE_SNACKBAR, TOGGLE_LOADING_MODAL, TOGGLE_VARIANT_MODAL, TOGGLE_UI_THEME } from '../../actionTypes';


const validateInput = (id: string, value: string, mainSchema: SchemaLike): string => {
  const schema = { [id]: value };
  const { error } = validate(schema, { [id]: mainSchema[id] })
  return error ? error.details[0].message : '';
}


const validateData = (data: any, mainSchema: SchemaLike): boolean => {
  const errors = {};
  const { error } = validate(data, mainSchema, { abortEarly: false });
  if (error) {
    for (const e of error.details) {
      errors[e.path[0]] = e.message;
    }
  }
  return Object.keys(errors).length ? true : false;
};


const togglePopUp: ActionCreator<A> = (type: string): Action => ({
  type
});


const toggleLoadingModal: ActionCreator<A> = (): Action => togglePopUp(TOGGLE_LOADING_MODAL);


const closeVariantModal: ActionCreator<A> = (): Action => togglePopUp(TOGGLE_VARIANT_MODAL);


const openVariantModal: ActionCreator<A> = (d: any): AnyAction => ({
  ...togglePopUp(TOGGLE_VARIANT_MODAL),
  payload: { ...d }
});




const updateOnChange: ActionCreator<A> = (type: string, id: string, value: string): AnyAction => {
  return {
    type,
    payload: {
      id,
      value
    }
  }
}

const toggleSnackBar: ActionCreator<A> = (variant: string, message: string): AnyAction => {
  return {
    type: TOGGLE_SNACKBAR,
    payload: {
      message,
      variant
    }
  }
}

const updateState = (currentState: any, payload: any, schema: SchemaLike, hasButtonSubmit = true) => {
  const { id, value } = payload;
  const error = validateInput(id, value, schema);

  const nS = {
    ...currentState,
    data: {
      ...currentState.data,
      [id]: value
    },
    errors: {
      ...currentState.errors,
      [id]: error
    },
  }


  if (hasButtonSubmit) {
    const isDisabled = validateData(nS.data, schema);
    return { ...nS, isDisabled }
  } else {
    return { ...nS }
  }

}

const clearErrors: ActionCreator<A> = (type: string): Action => togglePopUp(type);


const updateTag: ActionCreator<A> = (type: string, payload): AnyAction => {
  return {
    type,
    payload
  }
}


const resetErrors = (errors, data) => {
  for (const e in errors) {
    if (errors.hasOwnProperty(e)) {
      errors[e] = '';
    }
  }
  for (const d in data) {
    if (data.hasOwnProperty(d)) {
      data[d] = '';
    }
  }

  return { errors, data };
};




const getLimits2 = (page = 0): Limits => {
  const limits: Limits = {
    from: 0,
    to: 16
  };
  if (page === 0) {
    return limits;
  } else {
    return {
      to: (limits.to * (page + 1)) - 1,
      from: limits.to * page - 1
    }
  }
};


const updatePaginationData: ActionCreator<A> = (type: string, data: any, paginationData: any[], page: number): AnyAction => ({
  type,
  payload: {
    data,
    paginationData,
    page
  }
});

const getLimits3 = (page: number = 0, maxRows: number = 15): Limits => {
  const limits: Limits = {
    from: 0,
    to: maxRows
  };
  if (page === 0) {
    return limits;
  } else {
    return {
      from: (maxRows * page) + 1,
      to: (maxRows * (page + 1))
    }
  }

}


const requestPaginationData = (request: AxiosStatic, path: string, updateFunc: Function, selectedPage = 0): ThunkAction<T, MLShopMerchantState, S, A> => {
  return async (dispatch, getState) => {
    try {
      const { merchant_details } = getState();
      const { shop_name } = merchant_details.merchantData;
      const opts: AxiosRequestConfig = reqOptions(path, 'get', { shopName: shop_name, ...getLimits2(selectedPage) });
      const resp = await request(opts);
      switch (resp.data.ResponseCode) {
        case 200:
          const { data } = resp.data;
          let paginationData = slice(data, 0, 15);
          dispatch(updateFunc(data, paginationData, selectedPage));
          break;
        default:
          //dispatch(toggleSnackBar(error, resp.data.ResponseMessage));
          break;
      };
    } catch (e) {
      requestCatchHandler(request, e, dispatch, updateFunc.name)
    }
  }
};


const toggleUITheme: ActionCreator<A> = () => togglePopUp(TOGGLE_UI_THEME);







export {
  updateTag,
  getLimits2,
  getLimits3,
  updateState,
  clearErrors,
  resetErrors,
  togglePopUp,
  validateData,
  validateInput,
  toggleUITheme,
  updateOnChange,
  toggleSnackBar,
  openVariantModal,
  closeVariantModal,
  toggleLoadingModal,
  updatePaginationData,
  requestPaginationData
}