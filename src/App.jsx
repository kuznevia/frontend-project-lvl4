/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
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
import AuthContext from './AuthContext.js';

const App = () => {
  const authToken = localStorage.getItem('token');
  const [authentificated, setAuthentificated] = useState(!!authToken);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    setAuthentificated(false);
  };

  const socket = io();

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

  const sendMessage = ({ message, user, channelId }) => {
    if (socket.connected) {
      socket.emit('newMessage', { message, user, channelId });
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
    <AuthContext.Provider value={{ authentificated, logout }}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Chat
              sendMessage={sendMessage}
              addChannel={addChannel}
              removeChannel={removeChannel}
              renameChannel={renameChannel} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
