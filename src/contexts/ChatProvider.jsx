import React from 'react';

export const ChatContext = React.createContext(null);

export const ChatProvider = ({ children, socket }) => {
  console.log(socket);
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
    <ChatContext.Provider value={{
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </ChatContext.Provider>
  );
};
