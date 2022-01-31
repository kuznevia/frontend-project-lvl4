import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import i18next from 'i18next';
import * as Yup from 'yup';
import axios from 'axios';

const Login = () => {
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
        actions.setStatus(i18next.t('notCorrectNameOrPassword'));
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row">
              <form className="col-12" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e); }}>
                <h1>{i18next.t('login')}</h1>
                <div className="form-group w-25">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder={i18next.t('yourNick')}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-danger">{formik.errors.username}</div>
                  ) : null}
                </div>
                <div className="form-group w-25">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder={i18next.t('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="text-danger">{formik.status}</div>
                <button type="submit" className="btn btn-primary w-25">{i18next.t('login')}</button>
              </form>
            </div>
            <div className="card-footer w-100">
              <div className="text-center">
                <span>{i18next.t('noAccount')}</span>
                <Link to="/registration">{i18next.t('registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
