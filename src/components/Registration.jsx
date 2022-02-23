import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import cn from 'classnames';
import { AuthContext } from '../contexts/AuthProvider.jsx';
import routes from '../routes.js';

const Registration = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [inputValid, setInputValid] = useState(true);
  const inputClassnames = cn('form-control', {
    'is-invalid': !inputValid,
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      response: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required')
        .min(3, `${t('errors.numberOfSymbols')}`)
        .max(20, `${t('errors.numberOfSymbols')}`),
      password: Yup.string()
        .required('Required')
        .min(6, `${t('errors.minimumNumberOfSymbols')}`),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], `${t('errors.passwordsShouldBeEqual')}`),
    }),
    onSubmit: async ({ username, password }, actions) => {
      try {
        const response = await axios.post('api/v1/signup', {
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
        if (e.response.status === 409) {
          rollbar.warning(t('errors.userExists'));
          actions.setStatus(t('errors.userExists'));
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
                <h2 className="text-center mb-4">{t('registrationLabels.registration')}</h2>
                <div className="form-floating mb-3 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className={inputClassnames}
                    required
                    name="username"
                    id="username"
                    placeholder={t('registrationLabels.nickName')}
                  />
                  <label htmlFor="username" hidden>{t('registrationLabels.nickName')}</label>
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-danger">{formik.errors.username}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    className={inputClassnames}
                    required
                    name="password"
                    id="password"
                    placeholder={t('registrationLabels.password')}
                  />
                  <label htmlFor="password" hidden>{t('registrationLabels.password')}</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    type="password"
                    className={inputClassnames}
                    required
                    name="passwordConfirm"
                    id="passwordConfirm"
                    placeholder={t('registrationLabels.passwordCornfirmation')}
                  />
                  <label htmlFor="passwordConfirm" hidden>{t('registrationLabels.passwordCornfirmation')}</label>
                  {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div className="text-danger">{formik.errors.passwordConfirm}</div>
                  ) : null}
                  <div className="text-danger">{formik.status}</div>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100">{t('actions.registr')}</button>
              </form>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src="https://i.ibb.co/G3ytQCC/image.jpg" alt="Войти" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
