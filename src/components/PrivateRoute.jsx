import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const { authentificated } = useContext(AuthContext);

  return authentificated ? children : <Navigate to={routes.loginPage()} />;
};

export default PrivateRoute;
