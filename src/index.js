import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import io from 'socket.io-client';
import { render } from 'react-dom';
import init from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const socket = io();
  const App = await init(socket);
  render(App, document.getElementById('chat'));
};

runApp();
