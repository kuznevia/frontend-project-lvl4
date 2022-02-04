import React, { useState } from 'react';
import AuthContext from '../AuthContext';

const AuthProvider = ({ children }) => {
  const authToken = localStorage.getItem('token');
  const [authentificated, setAuthentificated] = useState(!!authToken);

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setAuthentificated(false);
  };

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setAuthentificated(true);
  };

  return (
    <AuthContext.Provider value={{ authentificated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
