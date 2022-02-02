import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import axios from 'axios';
import AuthContext from '../AuthContext';

const Registration = () => {
  const { authentificated } = useContext(AuthContext);

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
        .min(3, 'Не менее 3 символов')
        .max(20, 'Не более 20 символов'),
      password: Yup.string()
        .required('Required')
        .min(6, 'Минимум 6 симолов'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
    }),
    onSubmit: async ({ username, password }, actions) => {
      try {
        const response = await axios.post('api/v1/signup', {
          username,
          password,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        window.location.replace('/');
        actions.resetForm({
          values: {
            // the type of `values` inferred to be Blog
            username: '',
            password: '',
          },
          // you can also set the other form states here
        });
      } catch (e) {
        console.log(e);
        actions.setStatus('Такой пользователь уже существует');
      }
    },
  });

  return (
    <>
      {authentificated && window.location.replace('/')}
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <form className="col-12 col-md-6" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }}>
                  <h1 className="text-center mb-4">{i18next.t('registration')}</h1>
                  <div className="form-floating mb-3 form-group">
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      className="form-control"
                      required
                      name="username"
                      id="username"
                      placeholder={i18next.t('nickName')}
                    />
                    <label htmlFor="username" hidden>{i18next.t('nickName')}</label>
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
                      placeholder={i18next.t('password')}
                    />
                    <label htmlFor="password" hidden>{i18next.t('password')}</label>
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
                      placeholder={i18next.t('passwordCornfirmation')}
                    />
                    <label htmlFor="passwordConfirm" hidden>{i18next.t('passwordCornfirmation')}</label>
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                      <div className="text-danger">{formik.errors.passwordConfirm}</div>
                    ) : null}
                    <div className="text-danger">{formik.status}</div>
                  </div>
                  <button type="submit" className="btn btn-outline-primary w-100">{i18next.t('registr')}</button>
                </form>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img className="rounded-circle" src="https://i.ibb.co/G3ytQCC/image.jpg" alt="Войти" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
