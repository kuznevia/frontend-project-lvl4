import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
import NotFound from './components/NotFound.jsx';
import AuthContext from './AuthContext.js';

const authToken = localStorage.getItem('slack-chat');

const App = () => (
  <AuthContext.Provider value={{ authToken }}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </AuthContext.Provider>
);

export default App;
