import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider.jsx';

const PrivateRoute = ({ children, value }) => {
  const { authentificated } = useContext(AuthContext);
  const path = {
    chat: authentificated ? children : <Navigate to="/login" />,
    loginAndSignUp: authentificated ? <Navigate to="/" /> : children,
  };

  return path[value];
};

export default PrivateRoute;
