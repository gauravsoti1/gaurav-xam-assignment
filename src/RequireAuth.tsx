import React from 'react';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from './features/authentication/authenticationSlice';
import { useAppSelector } from './redux/hooks';

interface Props {
  redirectTo: string;
  children: JSX.Element;
}

const RequireAuth = ({ redirectTo, children }: Props): JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
