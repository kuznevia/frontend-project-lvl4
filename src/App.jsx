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
import AuthProvider from './components/AuthProvider.jsx';
import { sendNewMessages, deleteMessages } from './slices/messagesSlice.js';
import {
  addNewChannel,
  setCurrentChannel,
  deleteChannel,
  channelRename,
} from './slices/channelsSlice.js';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
import Registration from './components/Registration.jsx';
import NotFound from './components/NotFound.jsx';
import Nav from './components/NavBar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

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
  });

  socket.on('removeChannel', (id) => {
    dispatch(deleteChannel(id));
    dispatch(deleteMessages(id));
    dispatch(setCurrentChannel(1));
  });

  socket.on('renameChannel', (id, name) => {
    dispatch(channelRename(id, name));
  });

  const sendMessage = ({ text, user, channelId }) => {
    if (socket.connected) {
      socket.emit('newMessage', { text, user, channelId });
    } else {
      console.log('no connection');
    }
  };

  const addChannel = ({ name }) => {
    if (socket.connected) {
      socket.emit('newChannel', { name });
    } else {
      console.log('no connection');
    }
  };

  const removeChannel = ({ id }) => {
    if (socket.connected) {
      socket.emit('removeChannel', { id });
    } else {
      console.log('no connection');
    }
  };

  const renameChannel = ({ id, name }) => {
    if (socket.connected) {
      socket.emit('renameChannel', { id, name });
    } else {
      console.log('no connection');
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute value="chat">
                  <Chat
                    sendMessage={sendMessage}
                    addChannel={addChannel}
                    removeChannel={removeChannel}
                    renameChannel={renameChannel} />
                </PrivateRoute>
                }
            />
            <Route
              path="/login"
              element={
                <PrivateRoute value="loginAndSignUp">
                  <Login />
                </PrivateRoute>
                }
            />
            <Route
              path="/signup"
              element={
                <PrivateRoute value="loginAndSignUp">
                  <Registration />
                </PrivateRoute>
                }
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
    </AuthProvider>
  );
};

export default App;
