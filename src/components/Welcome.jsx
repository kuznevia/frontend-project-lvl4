import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Welcome = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post('http://localhost:5000/api/v1/login', {
          username,
          password,
        });
        console.log(response);
      } catch (e) {
        alert(e.response.data.message);
      }
      window.location.replace('/');
    },
  });
  return (
    <div>
      <h1>Войти</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input onChange={formik.handleChange} value={formik.values.name} className="form-control" name="username" id="username" placeholder="Имя пользователя" />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-danger">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input onChange={formik.handleChange} value={formik.values.password} type="password" className="form-control" name="password" id="password" placeholder="Пароль" />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary w-100">Войти</button>
      </form>
      <p className="bg-light bg-gradient text-center p-3">
        Нет аккаунта?
        <Link to="/registration"> Регистрация</Link>
      </p>
    </div>
  );
};

export default Welcome;
