/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';
import cn from 'classnames';
import { AuthContext } from '../contexts/AuthProvider.jsx';
import routes from '../routes.js';

const Login = () => {
  const [inputValid, setInputValid] = useState(true);
  const inputClassnames = cn('form-control', {
    'is-invalid': !inputValid,
  });
  const { login } = useContext(AuthContext);
  const rollbar = useRollbar();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      response: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async ({ username, password }, actions) => {
      try {
        const response = await axios.post('api/v1/login', {
          username,
          password,
        });
        login(response.data);
        navigate(routes.mainChatPage());
      } catch (e) {
        if (e.message === 'Network Error') {
          rollbar.error(e.message);
          toast.error(t('errors.connectionFailed'));
          return;
        }
        if (e.response.status === 401) {
          rollbar.warning(t('errors.notCorrectNameOrPassword'));
          actions.setStatus(t('errors.notCorrectNameOrPassword'));
          setInputValid(false);
          return;
        }
        rollbar.error(e);
        toast.error(t('errors.connectionFailed'));
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <form className="col-12 col-md-6" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }}>
                <h2 className="text-center mb-4">{t('loginLabels.login')}</h2>
                <div className="form-floating mb-3 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className={inputClassnames}
                    autoComplete="username"
                    required
                    name="username"
                    id="username"
                    placeholder={t('loginLabels.yourNick')}
                  />
                  <label htmlFor="username" hidden>{t('loginLabels.yourNick')}</label>
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    className={inputClassnames}
                    autoComplete="current-password"
                    required
                    name="password"
                    id="password"
                    placeholder={t('loginLabels.password')}
                  />
                  <label htmlFor="password" hidden>{t('loginLabels.password')}</label>
                  <div className="text-danger">{formik.status}</div>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100">{t('loginLabels.login')}</button>
              </form>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src="https://i.ibb.co/s3LZHBB/login.jpg" alt="Войти" />
              </div>
            </div>
            <div className="card-footer w-100 p-4">
              <div className="text-center">
                <span>{t('loginLabels.noAccount')}</span>
                <Link to="/signup">{t('loginLabels.registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
