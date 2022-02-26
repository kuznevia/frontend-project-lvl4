import React, { useState } from 'react';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const getAuthToken = () => {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  };

  const [authentificated, setAuthentificated] = useState(getAuthToken);

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
