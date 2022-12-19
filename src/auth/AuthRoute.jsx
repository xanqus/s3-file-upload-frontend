import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authenticatedState } from '../recoil/store';
import Login from '../routes/Login';

const AuthRoute = () => {
  const location = useLocation();
  const authenticated = useRecoilValue(authenticatedState);

  return authenticated ? <Outlet /> : <Login to={location.pathname} />;
};

export default AuthRoute;
