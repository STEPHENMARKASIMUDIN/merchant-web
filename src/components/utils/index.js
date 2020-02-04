import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ isAuth, Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => (
        isAuth ?
          <Component {...props} /> : <Redirect to="/" />
      )} />
  )
}

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  Component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  path: PropTypes.string.isRequired,
  rest: PropTypes.object
}





export const UnProtectedRoute = ({ isAuth, Component,
  currentPath,
  path, ...rest }) => {
  const normalRoutes = ['/mlshopmerchant/forgotPassword', '/mlshopmerchant/registration', '/mlshopmerchant'];
  if (!isAuth && !normalRoutes.includes(currentPath)) {
    return <Redirect to="/mlshopmerchant" />
  } else {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => (
          normalRoutes.includes(path) ?
            <Component {...props} /> : <Redirect to="/mlshopmerchant" />
        )}
      />
    )
  }

}