/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import i18next from 'i18next';
import * as Yup from 'yup';
import axios from 'axios';
import cn from 'classnames';

const Login = () => {
  const [inputValid, setInputValid] = useState(true);
  const inputClassnames = cn('form-control', {
    'is-invalid': !inputValid,
  });
  const navigate = useNavigate();

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
        navigate('/', { replace: true });
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
        setInputValid(false);
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
                <h1 className="text-center mb-4">{i18next.t('login')}</h1>
                <div className="form-floating mb-3 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className={inputClassnames}
                    autoComplete="username"
                    required
                    name="username"
                    id="username"
                    placeholder={i18next.t('yourNick')}
                  />
                  <label htmlFor="username" hidden>{i18next.t('yourNick')}</label>
                </div>
                <div className="form-floating mb-4 form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    className={inputClassnames}
                    required
                    name="password"
                    id="password"
                    placeholder={i18next.t('password')}
                  />
                  <label htmlFor="password" hidden>{i18next.t('password')}</label>
                  <div className="text-danger">{formik.status}</div>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100">{i18next.t('login')}</button>
              </form>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src="https://i.ibb.co/s3LZHBB/login.jpg" alt="Войти" />
              </div>
            </div>
            <div className="card-footer w-100 p-4">
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
