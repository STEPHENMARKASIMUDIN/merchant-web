import React, { lazy, Suspense } from 'react';
import LoadingModal from '../utils/LoadingModal';
import { connect } from 'react-redux';
import { UnProtectedRoute } from '../utils';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import { formatAndConvertToDate } from '../../helpers';


const Login = lazy(() => import('../login/Login'));
const Registration = lazy(() => import('../registration'));
const ResetPassword = lazy(() => import('../reset-password'));
const normalRoutes = ['/mlshopmerchant/forgotPassword', '/mlshopmerchant/registration', '/mlshopmerchant'];
const Components = [ResetPassword, Registration, Login];
const currentYear = formatAndConvertToDate(new Date(), 'YYYY');


const UnGuardedRoutes = ({ isAuth, history }) => {
  let loc = localStorage.getItem('token');
  loc = loc ? loc : null;
  if (!isAuth && !normalRoutes.includes(history.location.pathname)) {
    return <Redirect to="/mlshopmerchant" />
  } else {
    return (
      <Suspense fallback={<LoadingModal open />}>
        <Switch>
          {!loc ? <>
            {normalRoutes.map((route, i) => (
              <UnProtectedRoute
                isAuth={isAuth}
                currentPath={history.location.pathname}
                path={route}
                exact
                Component={Components[i]}
              />
            ))}
          </> : null}
        </Switch>
        <footer style={{ display: 'none' }}>
          © {currentYear} MLhuillier, Inc. Philippines. All Rights Reserved.
                   </footer>
      </Suspense>
    )
  }

}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
  }
};

export default withRouter(connect(mapStateToProps)(UnGuardedRoutes));


