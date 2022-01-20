import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';
import NotFound from './components/NotFound.jsx';
import Nav from './components/NavBar.jsx';
import AuthContext from './AuthContext.js';

const App = () => {
  const authToken = localStorage.getItem('slack-chat');
  const [authentificated, setAuthentificated] = useState(!!authToken);

  const logout = () => {
    localStorage.removeItem('slack-chat');
    setAuthentificated(false);
  };

  return (
    <AuthContext.Provider value={{ authentificated, logout }}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat sendMessage={ sendMessage } />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
