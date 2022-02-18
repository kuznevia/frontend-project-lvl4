/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
import Registration from './components/Registration.jsx';
import NotFound from './components/NotFound.jsx';
import Nav from './components/NavBar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import routes from './routes.js';

const App = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Nav />
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
        autoClose={t('toastCloseTime')}
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
