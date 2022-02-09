import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../contexts/AuthProvider.jsx';

const Nav = () => {
  const { authentificated, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="btn navbar-brand" href="/">
          <Link className="text-dark text-decoration-none" to="/">{t('hexletChat')}</Link>
        </div>
        {
          authentificated
          && <button className="btn btn-primary" onClick={logout} type="button">{t('logout')}</button>
        }
      </div>
    </nav>
  );
};

export default Nav;
