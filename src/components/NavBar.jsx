import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import AuthContext from '../AuthContext';

const Nav = () => {
  const { authentificated, logout } = useContext(AuthContext);
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="btn navbar-brand" href="/">
          <Link className="text-dark text-decoration-none" to="/">{i18next.t('hexletChat')}</Link>
        </div>
        {
          authentificated
          && <button className="btn btn-primary" onClick={logout} type="button">{i18next.t('logout')}</button>
        }
      </div>
    </nav>
  );
};

export default Nav;
