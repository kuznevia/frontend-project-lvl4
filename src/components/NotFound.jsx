import React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>{i18next.t('fourzerofour')}</h1>
    <Link to="/">{i18next.t('home')}</Link>
  </div>
);

export default NotFound;
