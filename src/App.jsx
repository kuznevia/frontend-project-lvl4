/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { sendNewMessages, deleteMessages } from './slices/messagesSlice.js';
import {
  addNewChannel,
  setCurrentChannel,
  deleteChannel,
  channelRename,
} from './slices/channelsSlice.js';
import Login from './components/Login.jsx';
import { setActiveModal } from './slices/modalSlice.js';
import Chat from './components/Chat.jsx';
import Registration from './components/Registration.jsx';
import NotFound from './components/NotFound.jsx';
import Nav from './components/NavBar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import routes from './routes.js';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  socket.on('connect', () => {
    console.log(socket.id);
  });

  socket.on('newMessage', (message) => {
    dispatch(sendNewMessages({ message }));
  });

  socket.on('newChannel', (channel) => {
    const { id } = channel;
    dispatch(addNewChannel({ channel }));
    dispatch(setCurrentChannel(id));
    dispatch(setActiveModal({ activeModal: 'none', show: false, channelId: null }));
  });

  socket.on('removeChannel', (id) => {
    dispatch(deleteChannel(id));
    dispatch(deleteMessages(id));
    dispatch(setCurrentChannel(1));
  });

  socket.on('renameChannel', (id, name) => {
    dispatch(channelRename(id, name));
  });

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
        autoClose={5000}
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
