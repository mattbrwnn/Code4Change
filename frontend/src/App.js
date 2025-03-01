import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import Dashboard from './pages/Dashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route 
        path="/dashboard" 
        element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
