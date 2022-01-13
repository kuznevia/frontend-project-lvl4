import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Welcome from './components/Welcome.jsx';
import Main from './components/Main.jsx';
import NotFound from './components/NotFound.jsx';
import AuthContext from './AuthContext.js';

const isAuthenticated = localStorage.getItem('slack-chat');

const App = () => (
  <AuthContext.Provider value={isAuthenticated}>
    <Router>
      <Routes>
        <Route path="/login" element={<Welcome />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </AuthContext.Provider>
);

export default App;
