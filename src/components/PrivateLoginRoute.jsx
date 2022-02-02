import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const PrivateLoginRoute = ({ children }) => {
  const { authentificated } = useContext(AuthContext);

  return authentificated ? <Navigate to="/" /> : children;
};

export default PrivateLoginRoute;
