import React from 'react';

export const ApiContext = React.createContext(null);

export const ApiContextProvider = ({ children, socket }) => {
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
