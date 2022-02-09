import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider.jsx';

const Registration = () => {
  const { login } = useContext(AuthContext);
  const { t } = useTranslation();

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
        .min(3, `${t('numberOfSymbols')}`)
        .max(20, `${t('numberOfSymbols')}`),
      password: Yup.string()
        .required('Required')
        .min(6, `${t('minimumNumberOfSymbols')}`),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], `${t('passwordsShouldBeEqual')}`),
    }),
    onSubmit: async ({ username, password }, actions) => {
      try {
        const response = await axios.post('api/v1/signup', {
          username,
          password,
        });
        login(response.data);
      } catch (e) {
        console.log(e);
        actions.setStatus('Такой пользователь уже существует');
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
                <h1 className="text-center mb-4">{t('registration')}</h1>
                <div className="form-floating mb-3 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="form-control"
                    required
                    name="username"
                    id="username"
                    placeholder={t('nickName')}
                  />
                  <label htmlFor="username" hidden>{t('nickName')}</label>
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-danger">{formik.errors.username}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    className="form-control"
                    required
                    name="password"
                    id="password"
                    placeholder={t('password')}
                  />
                  <label htmlFor="password" hidden>{t('password')}</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    type="password"
                    className="form-control"
                    required
                    name="passwordConfirm"
                    id="passwordConfirm"
                    placeholder={t('passwordCornfirmation')}
                  />
                  <label htmlFor="passwordConfirm" hidden>{t('passwordCornfirmation')}</label>
                  {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div className="text-danger">{formik.errors.passwordConfirm}</div>
                  ) : null}
                  <div className="text-danger">{formik.status}</div>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100">{t('registr')}</button>
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
