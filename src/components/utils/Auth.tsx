import React, { Component, useState, useReducer, useEffect, Reducer, ReducerAction } from 'react';
import * as decode from 'jwt-decode';
import { AxiosStatic } from 'axios';
import { Redirect } from 'react-router-dom';
import { R, S, A, AuthHOCState } from '../../helpers/merchantTypes';

const initState = {
  isExpired: false,
  timeout: 0,
  token: null,
  isAuthenticated: false
};

const SET_EXPIRED = "SET_EXPIRED";
const SET_NOT_EXPIRED = "SET_NOT_EXPIRED";
const SET_TOKEN = "SET_TOKEN";

const reducer: Reducer<AuthHOCState, A> = (state = initState, action) => {
  switch (action.type) {
    case SET_EXPIRED:
      return { ...state, isExpired: true };
    case SET_NOT_EXPIRED:
      return { ...state, isExpired: false };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      break;
  }
  return state;
}

const AuthComponent = (Comp: new () => Component<R, S>, request: AxiosStatic): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (state.isExpired) {
      //call api
    }
  }, [state.isExpired])

  if (!state.isAuthenticated) {
    return <Redirect to="/" />
  } else {
    return <Comp />;
  }
};


export default AuthComponent;
