import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Welcome from './components/Welcome.jsx';
import NotFound from './components/NotFound.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Welcome />} />
      <Route path="/" element={<Welcome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
