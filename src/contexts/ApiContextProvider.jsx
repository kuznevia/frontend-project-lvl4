import React from 'react';
import { useDispatch } from 'react-redux';
import { sendNewMessages, deleteMessages } from '../slices/messagesSlice.js';
import {
  addNewChannel,
  setCurrentChannel,
  deleteChannel,
  channelRename,
} from '../slices/channelsSlice.js';

export const ApiContext = React.createContext(null);

export const ApiContextProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('connect', () => {
    console.log(socket.id);
  });

  socket.on('newMessage', (message) => {
    dispatch(sendNewMessages({ message }));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addNewChannel({ channel }));
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
      socket.emit('newChannel', { name }, (response) => {
        const { id } = response.data;
        dispatch(setCurrentChannel(id));
      });
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
    <ApiContext.Provider value={{
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
};
