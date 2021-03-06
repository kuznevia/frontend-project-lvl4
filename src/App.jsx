/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
import Registration from './components/Registration.jsx';
import NotFound from './components/NotFound.jsx';
import Nav from './components/NavBar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import routes from './routes.js';
import Modal from './components/modal/Modal.jsx';
import { selectModalType } from './selectors/selectors.js';

const App = () => {
  const toastAutoCloseTime = 5000;
  const currentModalType = useSelector(selectModalType);

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Nav />
        <Modal type={currentModalType} />
        <Routes>
          <Route
            path={routes.mainChatPage()}
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
              }
          />
          <Route
            path={routes.loginPage()}
            element={<Login />}
          />
          <Route
            path={routes.signupPage()}
            element={<Registration />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={toastAutoCloseTime}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    </Router>
  );
};

export default App;
