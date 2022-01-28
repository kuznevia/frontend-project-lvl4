import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

const Nav = () => {
  const { authentificated, logout } = useContext(AuthContext);
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white mb-5">
      <div className="container">
        <div className="btn navbar-brand" href="/">
          <Link className="text-dark text-decoration-none" to="/"> Hexlet Chat</Link>
        </div>
        {authentificated && <button className="btn btn-primary" onClick={logout} type="button">Выйти</button>}
      </div>
    </nav>
  );
};

export default Nav;
