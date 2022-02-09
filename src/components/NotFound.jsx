import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('fourzerofour')}</h1>
      <Link to="/">{t('home')}</Link>
    </div>
  );
};

export default NotFound;
