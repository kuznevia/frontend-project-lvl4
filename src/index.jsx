// @ts-check
import React from 'react';
import i18next from 'i18next';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App.jsx';
import store from './slices/index.js';
import resources from './resources/index.js';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

export default async () => {
  await i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  ReactDOM.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>,
    document.getElementById('chat'),
  );
};
