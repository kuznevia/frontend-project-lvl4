import React from 'react';
import { useDispatch } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
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
  const rollbar = useRollbar();
  const { t } = useTranslation();

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

  const sendMessage = async ({ text, user, channelId }) => {
    if (socket.connected) {
      try {
        await socket.emit('newMessage', { text, user, channelId });
      } catch (e) {
        rollbar.error(t(e.message));
        toast.error(t('errors.connectionFailed'));
      }
    } else {
      rollbar.error(t('errors.connectionFailed'));
      toast.error(t('errors.connectionFailed'));
    }
  };

  const addChannel = async ({ name }) => {
    if (socket.connected) {
      try {
        await socket.emit('newChannel', { name }, (response) => {
          const { id } = response.data;
          dispatch(setCurrentChannel(id));
        });
      } catch (e) {
        rollbar.error(t(e.message));
        toast.error(t('errors.connectionFailed'));
      }
    } else {
      rollbar.error(t('errors.connectionFailed'));
      toast.error(t('errors.connectionFailed'));
    }
  };

  const removeChannel = async ({ id }) => {
    if (socket.connected) {
      try {
        await socket.emit('removeChannel', { id });
      } catch (e) {
        rollbar.error(t(e.message));
        toast.error(t('errors.connectionFailed'));
      }
    } else {
      rollbar.error(t('errors.connectionFailed'));
      toast.error(t('errors.connectionFailed'));
    }
  };

  const renameChannel = async ({ id, name }) => {
    if (socket.connected) {
      try {
        await socket.emit('renameChannel', { id, name });
      } catch (e) {
        rollbar.error(t(e.message));
        toast.error(t('errors.connectionFailed'));
      }
    } else {
      rollbar.error(t('errors.connectionFailed'));
      toast.error(t('errors.connectionFailed'));
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
