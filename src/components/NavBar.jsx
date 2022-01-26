import React, { useContext } from 'react';
import AuthContext from '../AuthContext';

const Nav = () => {
  const { authentificated, logout } = useContext(AuthContext);
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white mb-5">
      <div className="container">
        <div className="navbar-brand">Kuznevia Chat</div>
        {authentificated && <button className="btn btn-primary" onClick={logout} type="button">Logout</button>}
      </div>
    </nav>
  );
};

export default Nav;
