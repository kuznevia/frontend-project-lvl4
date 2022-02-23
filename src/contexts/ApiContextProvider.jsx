import React from 'react';
import { useDispatch } from 'react-redux';
import { sendNewMessages } from '../slices/messagesSlice.js';
import {
  addNewChannel,
  deleteChannel,
  channelRename,
} from '../slices/channelsSlice.js';

export const ApiContext = React.createContext(null);

export const ApiContextProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(sendNewMessages({ message }));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addNewChannel({ channel }));
  });

  socket.on('removeChannel', (id) => {
    dispatch(deleteChannel(id));
  });

  socket.on('renameChannel', (id, name) => {
    dispatch(channelRename(id, name));
  });

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/no-let
    let state = 'pending';
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }

      reject();
    });
  });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
    addChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};
