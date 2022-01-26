import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { sendNewMessages } from './slices/messagesSlice.js';
import { addNewChannel, setCurrentChannel } from './slices/channelsSlice.js';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
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

  const sendMessage = ({ message, activeUser, activeChannelId }) => {
    if (socket.connected) {
      socket.emit('newMessage', { message, activeUser, activeChannelId });
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

  return (
    <AuthContext.Provider value={{ authentificated, logout }}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat sendMessage={sendMessage} addChannel={addChannel} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
