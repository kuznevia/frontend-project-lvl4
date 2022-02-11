// @ts-check
import React from 'react';
import i18n from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import { ApiContextProvider } from './contexts/ApiContextProvider.jsx';

import App from './App.jsx';
import store from './slices/index.js';
import resources from './resources/index.js';

export default async (socket) => {
  const i18nextInstance = i18n.createInstance();

  await i18nextInstance.use(initReactI18next).init({
    lng: 'ru',
    debug: true,
    resources,
  });

  const rollbarConfig = {
    accessToken: 'e219ab426aae4ba8a61815208e2e61af',
    environment: process.env.NODE_ENV,
    enabled: process.env.NODE_ENV === 'production',
    captureUnhandledRejections: true,
    captureUncaught: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <AuthProvider>
              <ApiContextProvider socket={socket}>
                <App socket={socket} />
              </ApiContextProvider>
            </AuthProvider>
          </I18nextProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
