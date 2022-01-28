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
        .min(3, 'Минимум 3 симовла')
        .max(20, 'Максимум 20 символов'),
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
      <div className="container-lg">
        <h1>{i18next.t('registr')}</h1>
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }}>
          <div className="form-group">
            <input
              onChange={formik.handleChange}
              value={formik.values.username}
              className="form-control"
              name="username"
              id="username"
              placeholder="Имя пользователя"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Пароль"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
              type="password"
              className="form-control"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Подтверждение пароля"
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div className="text-danger">{formik.errors.passwordConfirm}</div>
            ) : null}
          </div>
          <div className="text-danger">{formik.status}</div>
          <button type="submit" className="btn btn-primary w-100">{i18next.t('registr')}</button>
        </form>
      </div>
    </>
  );
};

export default Registration;
