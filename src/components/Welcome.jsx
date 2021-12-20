import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Welcome = () => {
  const formik = useFormik({
    initialValues: {
      nickName: '',
      password: '',
    },
    validationSchema: Yup.object({
      nickName: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <h1>Войти</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input onChange={formik.handleChange} value={formik.values.name} className="form-control" name="nickName" id="nickName" placeholder="Имя пользователя" />
          {formik.touched.nickName && formik.errors.nickName ? (
            <div className="text-danger">{formik.errors.nickName}</div>
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
