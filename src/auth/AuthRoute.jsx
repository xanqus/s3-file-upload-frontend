import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authenticatedState } from '../recoil/store';
import Login from '../routes/Login';

const AuthRoute = () => {
  const authenticated = useRecoilValue(authenticatedState);

  return authenticated ? <Outlet /> : <Login />;
};

export default AuthRoute;
