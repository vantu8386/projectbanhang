// src/utils/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


interface PrivateRouteProps {
  component: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, path }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} element={component} />
  ) : (
    <Navigate to="/not-found" />
  );
};

export default PrivateRoute;
