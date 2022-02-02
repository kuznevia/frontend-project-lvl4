// @ts-check
import React from 'react';
import i18next from 'i18next';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './slices/index.js';
import resources from './resources/index.js';

export default async (socket) => {
  await i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  return (
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  );
};
