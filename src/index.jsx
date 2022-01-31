// @ts-check
import React from 'react';
import i18next from 'i18next';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './slices/index.js';
import resources from './resources/index.js';

export default async () => {
  await i18next.init({
    lng: 'ru',
    debug: true,
    resources,
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
