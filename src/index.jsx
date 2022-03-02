// @ts-check
import React from 'react';
import i18n from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { ApiContextProvider } from './contexts/ApiContextProvider.jsx';
import App from './App.jsx';
import store from './slices/index.js';
import resources from './resources/index.js';
import { sendNewMessages } from './slices/messagesSlice.js';
import {
  addNewChannel,
  deleteChannel,
  channelRename,
} from './slices/channelsSlice.js';

export default async (socket) => {
  const i18nextInstance = i18n.createInstance();

  await i18nextInstance.use(initReactI18next).init({
    lng: 'ru',
    debug: true,
    resources,
  });

  filter.loadDictionary('en');

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === 'production',
    captureUnhandledRejections: true,
    captureUncaught: true,
  };

  socket.on('newMessage', (message) => {
    store.dispatch(sendNewMessages({ message }));
  });

  socket.on('newChannel', ({ name, removable, id }) => {
    store.dispatch(addNewChannel({ name, removable, id }));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel({ id }));
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelRename({ id, name }));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <AuthProvider>
              <ApiContextProvider socket={socket}>
                <App />
              </ApiContextProvider>
            </AuthProvider>
          </I18nextProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
