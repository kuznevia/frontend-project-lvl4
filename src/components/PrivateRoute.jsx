import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const PrivateRoute = ({ children }) => {
  const { authentificated } = useContext(AuthContext);

  return authentificated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
