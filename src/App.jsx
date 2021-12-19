import React from 'react';

const Welcome = () => (
  <div>
    <h1>Войти</h1>
    <form>
      <div className="form-group">
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ваш ник" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Пароль" />
      </div>
      <button type="submit" className="btn btn-primary w-100">Войти</button>
    </form>
    <p className="bg-light bg-gradient text-center p-3">
      Нет аккаунта?
      <a href="#"> Регистрация</a>
    </p>
  </div>
);

export default Welcome;
