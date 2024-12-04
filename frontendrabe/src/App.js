import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa las páginas
import Login from './pages/login';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
  